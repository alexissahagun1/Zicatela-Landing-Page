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
  const [status, setStatus] = useState<MapStatus>("waiting");

  useEffect(() => {
    const mapElement = mapElementRef.current;
    if (!mapElement || hasInitializedRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          !entries.some((entry) => entry.isIntersecting) ||
          hasInitializedRef.current
        ) {
          return;
        }

        hasInitializedRef.current = true;
        observer.disconnect();

        void import("./GoogleMapsRuntime")
          .then(({ renderGoogleMap }) => renderGoogleMap(mapElement, center, pins))
          .then(() => {
            if (mapElementRef.current === mapElement && mapElement.isConnected) {
              setStatus("ready");
            }
          })
          .catch(() => {
            // The neutral frame intentionally stays unobtrusive if Maps is unavailable.
          });
      },
      { rootMargin: "0px 0px 240px 0px" },
    );

    observer.observe(mapElement);
    return () => observer.disconnect();
  }, [center, pins]);

  return (
    <div className="aspect-[4/3] w-full bg-[#E8E1D7] md:aspect-[16/10]">
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
