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

test("initial map markup contains the opt-in control but no Google request", () => {
  const html = renderToStaticMarkup(
    <LazyGoogleMap center={center} pins={pins} title="Casa Zii map" />,
  );

  assert.match(html, /Ver mapa interactivo/);
  assert.match(html, /El mapa interactivo es opcional/);
  assert.doesNotMatch(html, /maps\.googleapis\.com\/maps\/api\/js/);
});

test("an observable loader failure reaches the custom error UI", async () => {
  const actGlobal = globalThis as typeof globalThis & {
    IS_REACT_ACT_ENVIRONMENT?: boolean;
  };
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const previousApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const previousActEnvironment = actGlobal.IS_REACT_ACT_ENVIRONMENT;
  actGlobal.IS_REACT_ACT_ENVIRONMENT = true;
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {},
    writable: true,
  });
  delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  try {
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
    const mountedRenderer = renderer;

    const button = mountedRenderer.root.findByType("button");
    await act(async () => {
      await button.props.onClick();
    });

    const alert = mountedRenderer.root.findByProps({ role: "alert" });
    assert.match(
      alert.children.join(""),
      /El mapa no está disponible en este momento/,
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

    if (previousApiKey === undefined) {
      delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    } else {
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = previousApiKey;
    }
    actGlobal.IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
  }
});
