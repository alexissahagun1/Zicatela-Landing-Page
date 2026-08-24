import assert from "node:assert/strict";
import test from "node:test";
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

test("initial map markup is neutral and contains no Google request or CTA", () => {
  const html = renderToStaticMarkup(
    <LazyGoogleMap center={center} pins={pins} title="Casa Zii map" />,
  );

  assert.match(html, /bg-\[#E8E1D7\]/);
  assert.match(html, /aria-hidden="true"/);
  assert.doesNotMatch(html, /maps\.googleapis\.com\/maps\/api\/js/);
  assert.doesNotMatch(html, /<button|Ver mapa interactivo|opcional|Cargando mapa/);
});

test("an observed loader error keeps the neutral surface without blocking UI", async () => {
  const actGlobal = globalThis as typeof globalThis & {
    IS_REACT_ACT_ENVIRONMENT?: boolean;
  };
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const previousIntersectionObserver = Object.getOwnPropertyDescriptor(
    globalThis,
    "IntersectionObserver",
  );
  const previousApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const previousActEnvironment = actGlobal.IS_REACT_ACT_ENVIRONMENT;
  const observers: MockIntersectionObserver[] = [];
  actGlobal.IS_REACT_ACT_ENVIRONMENT = true;
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {},
    writable: true,
  });
  Object.defineProperty(globalThis, "IntersectionObserver", {
    configurable: true,
    value: MockIntersectionObserver,
    writable: true,
  });
  delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  try {
    MockIntersectionObserver.instances = observers;
    let renderer: ReactTestRenderer | undefined;
    await act(async () => {
      renderer = create(
        <LazyGoogleMap center={center} pins={pins} title="Casa Zii map" />,
        {
          createNodeMock(element) {
            return element.type === "div" ? { isConnected: true } : null;
          },
        },
      );
    });

    assert.ok(renderer);
    assert.equal(observers.length, 1);

    await act(async () => {
      observers[0].trigger();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const mountedRenderer = renderer;
    assert.equal(mountedRenderer.root.findAllByType("button").length, 0);
    assert.equal(mountedRenderer.root.findAllByProps({ role: "alert" }).length, 0);
    assert.equal(mountedRenderer.root.findAllByProps({ role: "status" }).length, 0);
    assert.equal(
      mountedRenderer.root.findAllByProps({ "aria-hidden": true }).length,
      1,
    );

    await act(async () => {
      mountedRenderer.unmount();
    });
  } finally {
    if (previousWindow) {
      Object.defineProperty(globalThis, "window", previousWindow);
    } else {
      Reflect.deleteProperty(globalThis, "window");
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
    actGlobal.IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
  }
});

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  constructor(private readonly callback: IntersectionObserverCallback) {
    MockIntersectionObserver.instances.push(this);
  }

  disconnect() {}

  observe() {}

  trigger() {
    this.callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
}
