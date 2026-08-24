import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import ts from "typescript";

const runtimePath = resolve(
  import.meta.dirname,
  "../app/components/GoogleMapsRuntime.ts",
);
const runtimeSource = readFileSync(runtimePath, "utf8");
const transpiledRuntime = ts.transpileModule(runtimeSource, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
  fileName: runtimePath,
}).outputText;

let importSequence = 0;

async function importFreshRuntime() {
  const encodedRuntime = Buffer.from(transpiledRuntime).toString("base64");
  importSequence += 1;
  return import(`data:text/javascript;base64,${encodedRuntime}#${importSequence}`);
}

function createGoogleDouble() {
  const maps = [];
  const markers = [];
  const idleListeners = [];

  class MapDouble {
    constructor(element, options) {
      this.element = element;
      this.options = options;
      maps.push(this);
    }
  }

  class MarkerDouble {
    constructor(options) {
      this.options = options;
      markers.push(this);
    }
  }

  const google = {
    maps: {
      Map: MapDouble,
      Marker: MarkerDouble,
      event: {
        addListenerOnce(map, eventName, handler) {
          assert.equal(eventName, "idle");
          const listener = { map, handler, removed: false };
          idleListeners.push(listener);
          return {
            remove() {
              listener.removed = true;
            },
          };
        },
      },
    },
  };

  return {
    google,
    maps,
    markers,
    triggerIdle() {
      for (const listener of idleListeners) {
        if (!listener.removed) {
          listener.handler();
        }
      }
    },
  };
}

function createBrowserHarness() {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const previousDocument = Object.getOwnPropertyDescriptor(
    globalThis,
    "document",
  );
  const previousApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const scripts = [];
  const browserWindow = {};

  const documentDouble = {
    head: {
      appendChild(script) {
        scripts.push(script);
        return script;
      },
    },
    createElement(tagName) {
      assert.equal(tagName, "script");
      const listeners = new Map();
      return {
        async: false,
        dataset: {},
        defer: false,
        removed: false,
        src: "",
        addEventListener(eventName, handler) {
          listeners.set(eventName, handler);
        },
        dispatch(eventName) {
          listeners.get(eventName)?.();
        },
        removeEventListener(eventName, handler) {
          if (listeners.get(eventName) === handler) {
            listeners.delete(eventName);
          }
        },
        remove() {
          this.removed = true;
        },
      };
    },
    querySelector(selector) {
      assert.equal(selector, "script[data-casa-zii-google-maps]");
      return scripts.findLast((script) => !script.removed) ?? null;
    },
  };

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: browserWindow,
    writable: true,
  });
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: documentDouble,
    writable: true,
  });
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = "test-restricted-key";

  return {
    browserWindow,
    scripts,
    restore() {
      if (previousWindow) {
        Object.defineProperty(globalThis, "window", previousWindow);
      } else {
        delete globalThis.window;
      }

      if (previousDocument) {
        Object.defineProperty(globalThis, "document", previousDocument);
      } else {
        delete globalThis.document;
      }

      if (previousApiKey === undefined) {
        delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      } else {
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = previousApiKey;
      }
    },
  };
}

const center = { lat: 15.8313, lng: -97.0405 };
const exactPins = [
  {
    position: { lat: 15.831041, lng: -97.040609 },
    title: "Casa Palmas",
    label: "Casa Palmas",
  },
  {
    position: { lat: 15.8315562, lng: -97.0404726 },
    title: "Casa Campeche",
    label: "Casa Campeche",
  },
];

test("importing the runtime does not inject the Google Maps script", async () => {
  const harness = createBrowserHarness();
  try {
    await importFreshRuntime();
    assert.equal(harness.scripts.length, 0);
    assert.equal(harness.browserWindow.__casaZiiGoogleMapsReady, undefined);
  } finally {
    harness.restore();
  }
});

test("concurrent activations share one Google Maps script", async () => {
  const harness = createBrowserHarness();
  try {
    const runtime = await importFreshRuntime();
    const googleDouble = createGoogleDouble();
    const firstRender = runtime.renderGoogleMap(
      { isConnected: true },
      center,
      exactPins,
    );
    const secondRender = runtime.renderGoogleMap(
      { isConnected: true },
      center,
      exactPins,
    );

    assert.equal(harness.scripts.length, 1);
    harness.browserWindow.google = googleDouble.google;
    harness.browserWindow.__casaZiiGoogleMapsReady();
    await Promise.resolve();
    await Promise.resolve();
    assert.equal(googleDouble.maps.length, 2);

    googleDouble.triggerIdle();
    await Promise.all([firstRender, secondRender]);
  } finally {
    harness.restore();
  }
});

test("authentication failure rejects and stays sticky without another script", async () => {
  const harness = createBrowserHarness();
  try {
    const runtime = await importFreshRuntime();
    const firstRender = runtime.renderGoogleMap(
      { isConnected: true },
      center,
      exactPins,
    );
    const firstRejection = assert.rejects(
      firstRender,
      /authentication or billing authorization failed/,
    );

    assert.equal(harness.scripts.length, 1);
    harness.browserWindow.gm_authFailure();
    await firstRejection;

    await assert.rejects(
      runtime.renderGoogleMap({ isConnected: true }, center, exactPins),
      /authentication or billing authorization failed/,
    );
    assert.equal(harness.scripts.length, 1);
  } finally {
    harness.restore();
  }
});

test("a missing API key rejects before injecting a script", async () => {
  const harness = createBrowserHarness();
  try {
    delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const runtime = await importFreshRuntime();

    await assert.rejects(
      runtime.renderGoogleMap({ isConnected: true }, center, exactPins),
      /API key is not configured/,
    );
    assert.equal(harness.scripts.length, 0);
  } finally {
    harness.restore();
  }
});

test("a script network error rejects and permits a clean retry", async () => {
  const harness = createBrowserHarness();
  try {
    const runtime = await importFreshRuntime();
    const firstRender = runtime.renderGoogleMap(
      { isConnected: true },
      center,
      exactPins,
    );

    assert.equal(harness.scripts.length, 1);
    harness.scripts[0].dispatch("error");
    await assert.rejects(firstRender, /failed to load/);
    assert.equal(harness.scripts[0].removed, true);

    const retry = runtime.renderGoogleMap(
      { isConnected: true },
      center,
      exactPins,
    );
    assert.equal(harness.scripts.length, 2);

    const googleDouble = createGoogleDouble();
    harness.browserWindow.google = googleDouble.google;
    harness.browserWindow.__casaZiiGoogleMapsReady();
    await Promise.resolve();
    await Promise.resolve();
    googleDouble.triggerIdle();
    await retry;
  } finally {
    harness.restore();
  }
});

test("authentication failure after script readiness rejects while waiting for idle", async () => {
  const harness = createBrowserHarness();
  try {
    const runtime = await importFreshRuntime();
    const googleDouble = createGoogleDouble();
    const render = runtime.renderGoogleMap(
      { isConnected: true },
      center,
      exactPins,
    );

    harness.browserWindow.google = googleDouble.google;
    harness.browserWindow.__casaZiiGoogleMapsReady();
    await Promise.resolve();
    await Promise.resolve();
    assert.equal(googleDouble.maps.length, 1);

    harness.browserWindow.gm_authFailure();
    await assert.rejects(
      render,
      /authentication or billing authorization failed/,
    );
  } finally {
    harness.restore();
  }
});

test("the first-idle timeout rejects when Google never marks the map ready", async () => {
  const harness = createBrowserHarness();
  const previousSetTimeout = globalThis.setTimeout;
  const previousClearTimeout = globalThis.clearTimeout;
  let timeoutHandler;

  try {
    globalThis.setTimeout = (handler) => {
      timeoutHandler = handler;
      return 1;
    };
    globalThis.clearTimeout = () => {};

    const googleDouble = createGoogleDouble();
    harness.browserWindow.google = googleDouble.google;
    const runtime = await importFreshRuntime();
    const render = runtime.renderGoogleMap(
      { isConnected: true },
      center,
      exactPins,
    );

    await Promise.resolve();
    assert.equal(typeof timeoutHandler, "function");
    timeoutHandler();
    await assert.rejects(render, /did not become ready within 15 seconds/);
  } finally {
    globalThis.setTimeout = previousSetTimeout;
    globalThis.clearTimeout = previousClearTimeout;
    harness.restore();
  }
});

test("a disconnected element never creates a map", async () => {
  const harness = createBrowserHarness();
  try {
    const googleDouble = createGoogleDouble();
    harness.browserWindow.google = googleDouble.google;
    const runtime = await importFreshRuntime();

    await assert.rejects(
      runtime.renderGoogleMap({ isConnected: false }, center, exactPins),
      /container is no longer connected/,
    );
    assert.equal(googleDouble.maps.length, 0);
    assert.equal(googleDouble.markers.length, 0);
  } finally {
    harness.restore();
  }
});

test("a ready map creates both exact Casa Zii markers", async () => {
  const harness = createBrowserHarness();
  try {
    const googleDouble = createGoogleDouble();
    harness.browserWindow.google = googleDouble.google;
    const runtime = await importFreshRuntime();
    const render = runtime.renderGoogleMap(
      { isConnected: true },
      center,
      exactPins,
    );

    await Promise.resolve();
    assert.equal(googleDouble.maps.length, 1);
    assert.deepEqual(
      googleDouble.markers.map(({ options }) => ({
        label: options.label.text,
        position: options.position,
        title: options.title,
      })),
      exactPins.map((pin) => ({
        label: pin.label,
        position: pin.position,
        title: pin.title,
      })),
    );

    googleDouble.triggerIdle();
    await render;
  } finally {
    harness.restore();
  }
});
