import assert from "node:assert/strict";
import { describe, test } from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { act, create } from "react-test-renderer";
import type { ReactTestRenderer } from "react-test-renderer";

import LazyGoogleMap from "../app/components/LazyGoogleMap";

const center = { lat: 15.8313, lng: -97.0405 };
const pins = [
  {
    position: { lat: 15.831041, lng: -97.040609 },
    title: "Casa Palmas",
    label: "CASA PALMAS",
  },
  {
    position: { lat: 15.8315562, lng: -97.0404726 },
    title: "Casa Campeche",
    label: "CASA CAMPECHE",
  },
];

describe("LazyGoogleMap", { concurrency: 1 }, () => {
test("initial map markup is neutral and contains no Google request or CTA", () => {
  const html = renderToStaticMarkup(
    <LazyGoogleMap center={center} pins={pins} title="Casa Zii map" />,
  );

  assert.match(html, /bg-\[#E8E1D7\]/);
  assert.match(html, /aria-hidden="true"/);
  assert.doesNotMatch(html, /maps\.googleapis\.com\/maps\/api\/js/);
  assert.doesNotMatch(html, /<button|Ver mapa interactivo|opcional|Cargando mapa/);
});

test("a failed observed load retries only after leaving and re-entering, then disconnects on success", { concurrency: false }, async () => {
  const actGlobal = globalThis as typeof globalThis & {
    IS_REACT_ACT_ENVIRONMENT?: boolean;
  };
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  const previousIntersectionObserver = Object.getOwnPropertyDescriptor(
    globalThis,
    "IntersectionObserver",
  );
  const previousApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const previousMapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
  const previousActEnvironment = actGlobal.IS_REACT_ACT_ENVIRONMENT;
  const observers: MockIntersectionObserver[] = [];
  const browserWindow: { google?: object } = {};
  const documentDouble = {
    createElement(tagName: string) {
      assert.ok(tagName === "div" || tagName === "span");
      return {
        style: { cssText: "" },
        textContent: "",
        children: [] as Array<{ textContent: string }>,
        append(...children: Array<{ textContent: string }>) {
          this.children.push(...children);
          this.textContent = this.children
            .map((child) => child.textContent)
            .join("");
        },
      };
    },
  };
  let mapCreations = 0;
  actGlobal.IS_REACT_ACT_ENVIRONMENT = true;
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
  Object.defineProperty(globalThis, "IntersectionObserver", {
    configurable: true,
    value: MockIntersectionObserver,
    writable: true,
  });
  delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID = "test-map-id";

  try {
    MockIntersectionObserver.instances = observers;
    let renderer: ReactTestRenderer | undefined;
    await act(async () => {
      renderer = create(
        <LazyGoogleMap center={center} pins={pins} title="Casa Zii map" />,
        {
          createNodeMock(element) {
            return element.type === "div"
              ? { isConnected: true, dataset: {} }
              : null;
          },
        },
      );
    });

    assert.ok(renderer);
    assert.equal(observers.length, 1);

    await act(async () => {
      observers[0].trigger(true);
      await waitForAsyncWork();
    });

    const mountedRenderer = renderer;
    assert.equal(observers[0].disconnectCalls, 0);
    assert.equal(mountedRenderer.root.findAllByType("button").length, 0);
    assert.equal(mountedRenderer.root.findAllByProps({ role: "alert" }).length, 0);
    assert.equal(mountedRenderer.root.findAllByProps({ role: "status" }).length, 0);
    assert.equal(
      mountedRenderer.root.findAllByProps({ "aria-hidden": true }).length,
      1,
    );

    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = "test-key";
    browserWindow.google = {
      maps: {
        Map: class {
          constructor() {
            mapCreations += 1;
          }
        },
        marker: { AdvancedMarkerElement: class {} },
        event: {
          addListenerOnce(_map: object, _eventName: string, handler: () => void) {
            const timeoutId = setTimeout(handler, 0);
            return { remove: () => clearTimeout(timeoutId) };
          },
        },
      },
    };

    await act(async () => {
      observers[0].trigger(false);
      observers[0].trigger(true);
      await waitForAsyncWork();
    });

    assert.equal(mapCreations, 1);
    assert.equal(observers[0].disconnectCalls, 1);
    assert.equal(
      mountedRenderer.root.findAllByProps({ role: "application" }).length,
      1,
    );

    await act(async () => {
      observers[0].trigger(false);
      observers[0].trigger(true);
      await waitForAsyncWork();
    });

    assert.equal(mapCreations, 1);

    await act(async () => {
      mountedRenderer.unmount();
    });
  } finally {
    if (previousWindow) {
      Object.defineProperty(globalThis, "window", previousWindow);
    } else {
      Reflect.deleteProperty(globalThis, "window");
    }
    if (previousDocument) {
      Object.defineProperty(globalThis, "document", previousDocument);
    } else {
      Reflect.deleteProperty(globalThis, "document");
    }

    if (previousIntersectionObserver) {
      Object.defineProperty(
        globalThis,
        "IntersectionObserver",
        previousIntersectionObserver,
      );
    } else {
      Reflect.deleteProperty(globalThis, "IntersectionObserver");
    }

    if (previousApiKey === undefined) {
      delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    } else {
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = previousApiKey;
    }
    if (previousMapId === undefined) {
      delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
    } else {
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID = previousMapId;
    }
    actGlobal.IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
  }
});

test("a first-idle timeout after map construction never creates a second map", { concurrency: false }, async () => {
  const actGlobal = globalThis as typeof globalThis & {
    IS_REACT_ACT_ENVIRONMENT?: boolean;
  };
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  const previousIntersectionObserver = Object.getOwnPropertyDescriptor(
    globalThis,
    "IntersectionObserver",
  );
  const previousApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const previousMapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
  const previousSetTimeout = globalThis.setTimeout;
  const previousActEnvironment = actGlobal.IS_REACT_ACT_ENVIRONMENT;
  const observers: MockIntersectionObserver[] = [];
  const mapElement = { isConnected: true, dataset: {} as Record<string, string> };
  const documentDouble = {
    createElement(tagName: string) {
      assert.ok(tagName === "div" || tagName === "span");
      return {
        style: { cssText: "" },
        textContent: "",
        children: [] as Array<{ textContent: string }>,
        append(...children: Array<{ textContent: string }>) {
          this.children.push(...children);
          this.textContent = this.children
            .map((child) => child.textContent)
            .join("");
        },
      };
    },
  };
  let mapCreations = 0;
  let idleTimeout: (() => void) | undefined;
  actGlobal.IS_REACT_ACT_ENVIRONMENT = true;
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      google: {
        maps: {
          Map: class {
            constructor() {
              mapCreations += 1;
            }
          },
          marker: { AdvancedMarkerElement: class {} },
          event: {
            addListenerOnce() {
              return { remove() {} };
            },
          },
        },
      },
    },
    writable: true,
  });
  Object.defineProperty(globalThis, "IntersectionObserver", {
    configurable: true,
    value: MockIntersectionObserver,
    writable: true,
  });
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: documentDouble,
    writable: true,
  });
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = "test-key";
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID = "test-map-id";
  globalThis.setTimeout = ((handler: () => void, timeout?: number) => {
    if (timeout === 15_000) {
      idleTimeout = handler;
      return 1 as unknown as ReturnType<typeof setTimeout>;
    }

    return previousSetTimeout(handler, timeout);
  }) as typeof setTimeout;

  try {
    MockIntersectionObserver.instances = observers;
    let renderer: ReactTestRenderer | undefined;
    await act(async () => {
      renderer = create(
        <LazyGoogleMap center={center} pins={pins} title="Casa Zii map" />,
        {
          createNodeMock(element) {
            return element.type === "div" ? mapElement : null;
          },
        },
      );
    });

    if (!renderer) {
      throw new Error("LazyGoogleMap did not mount.");
    }
    const mountedRenderer = renderer;
    assert.equal(observers.length, 1);
    await act(async () => {
      observers[0].trigger(true);
      await waitForAsyncWork();
    });

    assert.equal(mapCreations, 1);
    assert.equal(mapElement.dataset.casaZiiMapConstructed, "true");
    assert.equal(typeof idleTimeout, "function");

    await act(async () => {
      idleTimeout?.();
      await waitForAsyncWork();
      observers[0].trigger(false);
      observers[0].trigger(true);
      await waitForAsyncWork();
    });

    assert.equal(mapCreations, 1);
    assert.equal(observers[0].disconnectCalls, 0);

    await act(async () => {
      mountedRenderer.unmount();
    });
  } finally {
    globalThis.setTimeout = previousSetTimeout;

    if (previousWindow) {
      Object.defineProperty(globalThis, "window", previousWindow);
    } else {
      Reflect.deleteProperty(globalThis, "window");
    }
    if (previousDocument) {
      Object.defineProperty(globalThis, "document", previousDocument);
    } else {
      Reflect.deleteProperty(globalThis, "document");
    }

    if (previousIntersectionObserver) {
      Object.defineProperty(
        globalThis,
        "IntersectionObserver",
        previousIntersectionObserver,
      );
    } else {
      Reflect.deleteProperty(globalThis, "IntersectionObserver");
    }

    if (previousApiKey === undefined) {
      delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    } else {
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = previousApiKey;
    }
    if (previousMapId === undefined) {
      delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
    } else {
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID = previousMapId;
    }
    actGlobal.IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
  }
});
});

async function waitForAsyncWork() {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    await new Promise((flush) => setTimeout(flush, 10));
    await new Promise<void>((flush) => setImmediate(flush));
  }
}

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  disconnectCalls = 0;
  private disconnected = false;

  constructor(private readonly callback: IntersectionObserverCallback) {
    MockIntersectionObserver.instances.push(this);
  }

  disconnect() {
    this.disconnectCalls += 1;
    this.disconnected = true;
  }

  observe() {}

  trigger(isIntersecting: boolean) {
    if (this.disconnected) {
      return;
    }

    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
}
