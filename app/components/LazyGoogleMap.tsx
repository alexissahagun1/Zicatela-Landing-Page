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

    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((entry) => entry.isIntersecting);

        if (!isIntersecting) {
          isInViewportRef.current = false;
          return;
        }

        if (isInViewportRef.current || hasInitializedRef.current) {
          return;
        }

        isInViewportRef.current = true;
        hasInitializedRef.current = true;

        void import("./GoogleMapsRuntime")
          .then(({ renderGoogleMap }) => renderGoogleMap(mapElement, center, pins))
          .then(() => {
            if (mapElementRef.current === mapElement && mapElement.isConnected) {
              observer.disconnect();
              setStatus("ready");
            }
          })
          .catch(() => {
            if (mapElementRef.current === mapElement && mapElement.isConnected) {
              hasInitializedRef.current = false;
            }
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
