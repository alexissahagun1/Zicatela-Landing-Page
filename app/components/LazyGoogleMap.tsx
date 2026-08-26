"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";

import type { LatLng, MapPin } from "./GoogleMapsRuntime";

type LazyGoogleMapProps = {
  center: LatLng;
  pins: MapPin[];
  title: string;
};

type MapStatus = "waiting" | "ready";

export default function LazyGoogleMap({
  center,
  pins,
  title,
}: LazyGoogleMapProps) {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);
  const isInViewportRef = useRef(false);
  const [status, setStatus] = useState<MapStatus>("waiting");

  useEffect(() => {
    const mapElement = mapElementRef.current;
    if (!mapElement || hasInitializedRef.current) {
      return;
    }

    const observedMapElement = mapElement;

    const startLoading = () => {
      if (isInViewportRef.current || hasInitializedRef.current) {
        return;
      }

      isInViewportRef.current = true;
      hasInitializedRef.current = true;

      void import("./GoogleMapsRuntime")
        .then(({ renderGoogleMap }) => renderGoogleMap(observedMapElement, center, pins))
        .then(() => {
          if (
            mapElementRef.current === observedMapElement &&
            observedMapElement.isConnected
          ) {
            observer?.disconnect();
            window.removeEventListener?.("scroll", syncViewport);
            window.removeEventListener?.("resize", syncViewport);
            setStatus("ready");
          }
        })
        .catch(() => {
          if (
            mapElementRef.current === observedMapElement &&
            observedMapElement.isConnected &&
            observedMapElement.dataset.casaZiiMapConstructed !== "true"
          ) {
            isInViewportRef.current = false;
            hasInitializedRef.current = false;
          }
        });
    };

    function syncViewport() {
      const rect = observedMapElement.getBoundingClientRect?.();
      if (!rect) {
        return;
      }

      const viewportHeight =
        window.innerHeight || document.documentElement?.clientHeight || 0;
      if (!viewportHeight) {
        return;
      }
      const isNearViewport =
        rect.top < viewportHeight + 240 && rect.bottom > -240;

      if (!isNearViewport) {
        isInViewportRef.current = false;
        return;
      }

      startLoading();
    }

    const observer = typeof IntersectionObserver === "function"
      ? new IntersectionObserver(
          (entries) => {
            const isIntersecting = entries.some((entry) => entry.isIntersecting);

            if (!isIntersecting) {
              isInViewportRef.current = false;
              return;
            }

            startLoading();
          },
          { rootMargin: "0px 0px 240px 0px" },
        )
      : null;

    observer?.observe(observedMapElement);
    window.addEventListener?.("scroll", syncViewport, { passive: true });
    window.addEventListener?.("resize", syncViewport);
    syncViewport();

    return () => {
      observer?.disconnect();
      window.removeEventListener?.("scroll", syncViewport);
      window.removeEventListener?.("resize", syncViewport);
    };
  }, [center, pins]);

  return (
    <div className="aspect-[4/3] w-full bg-[#E8E1D7] md:aspect-[16/9]">
      <div
        ref={mapElementRef}
        className="h-full w-full"
        role={status === "ready" ? "application" : undefined}
        aria-label={status === "ready" ? title : undefined}
        aria-hidden={status === "ready" ? undefined : true}
      />
    </div>
  );
}
