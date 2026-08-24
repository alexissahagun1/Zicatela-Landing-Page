"use client";

import { useRef, useState } from "react";

import type { LatLng, MapPin } from "./GoogleMapsRuntime";

type LazyGoogleMapProps = {
  center: LatLng;
  pins: MapPin[];
  title: string;
};

type MapStatus = "waiting" | "loading" | "ready" | "error";

export default function LazyGoogleMap({
  center,
  pins,
  title,
}: LazyGoogleMapProps) {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);
  const [status, setStatus] = useState<MapStatus>("waiting");

  const activateMap = async () => {
    const mapElement = mapElementRef.current;
    if (!mapElement || hasInitializedRef.current || status === "loading") {
      return;
    }

    hasInitializedRef.current = true;
    setStatus("loading");

    try {
      const { renderGoogleMap } = await import("./GoogleMapsRuntime");
      await renderGoogleMap(mapElement, center, pins);
      if (mapElementRef.current === mapElement && mapElement.isConnected) {
        setStatus("ready");
      }
    } catch {
      if (mapElementRef.current === mapElement && mapElement.isConnected) {
        hasInitializedRef.current = false;
        setStatus("error");
      }
    }
  };

  return (
    <div className="relative h-[333px] min-h-[333px] w-full bg-[#E8E1D7]">
      <div
        ref={mapElementRef}
        className="h-full w-full"
        role={status === "ready" ? "application" : undefined}
        aria-label={status === "ready" ? title : undefined}
        aria-hidden={status === "ready" ? undefined : true}
      />

      {status === "waiting" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#E8E1D7] px-8 text-center font-[family-name:var(--font-courier)]">
          <p className="max-w-md text-xs leading-5 text-[#222222]/70">
            El mapa interactivo es opcional y solo se carga al pulsar el botón.
          </p>
          <button
            type="button"
            onClick={activateMap}
            className="border border-[#222222] px-6 py-3 text-xs uppercase tracking-[0.16em] text-[#222222] transition-colors hover:bg-[#222222] hover:text-[#E8E1D7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#222222]"
          >
            Ver mapa interactivo
          </button>
        </div>
      )}

      {status === "loading" && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#E8E1D7]/80 font-[family-name:var(--font-courier)] text-xs uppercase tracking-[0.16em] text-[#222222]/60"
          role="status"
          aria-live="polite"
        >
          Cargando mapa
        </div>
      )}

      {status === "error" && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-[#E8E1D7] px-8 text-center font-[family-name:var(--font-courier)] text-xs leading-5 text-[#222222]/70"
          role="alert"
        >
          El mapa no está disponible en este momento. Usa los enlaces visibles de
          Google Maps para abrir cada ubicación.
        </div>
      )}
    </div>
  );
}
