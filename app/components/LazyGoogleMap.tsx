"use client";

import { useEffect, useRef, useState } from "react";

type LatLng = {
  lat: number;
  lng: number;
};

type MapPin = {
  position: LatLng;
  title: string;
  label: string;
};

type GoogleMapOptions = {
  center: LatLng;
  zoom: number;
  mapTypeControl: boolean;
  streetViewControl: boolean;
  fullscreenControl: boolean;
  zoomControl: boolean;
  gestureHandling: "cooperative";
};

type GoogleMarkerOptions = {
  map: GoogleMapInstance;
  position: LatLng;
  title: string;
  label: {
    text: string;
    color: string;
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
  };
};

type GoogleMapInstance = object;

type GoogleMapsApi = {
  maps: {
    Map: new (
      element: HTMLElement,
      options: GoogleMapOptions,
    ) => GoogleMapInstance;
    Marker: new (options: GoogleMarkerOptions) => object;
  };
};

type GoogleMapsWindow = Window & {
  google?: GoogleMapsApi;
};

type LazyGoogleMapProps = {
  center: LatLng;
  pins: MapPin[];
  title: string;
};

let googleMapsPromise: Promise<GoogleMapsApi> | null = null;

function loadGoogleMaps(): Promise<GoogleMapsApi> {
  const browserWindow = window as GoogleMapsWindow;

  if (browserWindow.google?.maps) {
    return Promise.resolve(browserWindow.google);
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return Promise.reject(new Error("Google Maps API key is not configured."));
  }

  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  googleMapsPromise = new Promise<GoogleMapsApi>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      "script[data-casa-zii-google-maps]",
    );

    const resolveWhenReady = () => {
      const loadedGoogle = (window as GoogleMapsWindow).google;
      if (loadedGoogle?.maps) {
        resolve(loadedGoogle);
      } else {
        reject(new Error("Google Maps loaded without its maps namespace."));
      }
    };

    if (existingScript) {
      existingScript.addEventListener("load", resolveWhenReady, { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Google Maps failed to load.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.dataset.casaZiiGoogleMaps = "true";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly&loading=async`;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", resolveWhenReady, { once: true });
    script.addEventListener(
      "error",
      () => reject(new Error("Google Maps failed to load.")),
      { once: true },
    );
    document.head.appendChild(script);
  }).catch((error: unknown) => {
    googleMapsPromise = null;
    throw error;
  });

  return googleMapsPromise;
}

export default function LazyGoogleMap({
  center,
  pins,
  title,
}: LazyGoogleMapProps) {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);
  const [status, setStatus] = useState<"waiting" | "loading" | "ready" | "error">(
    "waiting",
  );

  useEffect(() => {
    const mapElement = mapElementRef.current;
    if (!mapElement || hasInitializedRef.current) {
      return;
    }

    let cancelled = false;

    const initializeMap = () => {
      if (cancelled || hasInitializedRef.current) {
        return;
      }

      hasInitializedRef.current = true;
      setStatus("loading");

      loadGoogleMaps()
        .then((api) => {
          if (cancelled) {
            return;
          }

          const google = api;
          const map = new google.maps.Map(mapElement, {
            center,
            zoom: 13,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true,
            gestureHandling: "cooperative",
          });

          pins.forEach((pin) => {
            new google.maps.Marker({
              map,
              position: pin.position,
              title: pin.title,
              label: {
                text: pin.label,
                color: "#222222",
                fontFamily: "Courier New, monospace",
                fontSize: "12px",
                fontWeight: "600",
              },
            });
          });

          setStatus("ready");
        })
        .catch(() => {
          hasInitializedRef.current = false;
          if (!cancelled) {
            setStatus("error");
          }
        });
    };

    if (!("IntersectionObserver" in window)) {
      initializeMap();
      return () => {
        cancelled = true;
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          initializeMap();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(mapElement);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [center, pins]);

  return (
    <div className="relative h-[333px] min-h-[333px] w-full bg-[#E8E1D7]">
      <div
        ref={mapElementRef}
        className="h-full w-full"
        role="application"
        aria-label={title}
      />

      {status === "waiting" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#E8E1D7] font-[family-name:var(--font-courier)] text-xs uppercase tracking-[0.16em] text-[#222222]/60">
          Mapa interactivo
        </div>
      )}

      {status === "loading" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#E8E1D7]/80 font-[family-name:var(--font-courier)] text-xs uppercase tracking-[0.16em] text-[#222222]/60">
          Cargando mapa
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#E8E1D7] px-8 text-center font-[family-name:var(--font-courier)] text-xs leading-5 text-[#222222]/70">
          El mapa no está disponible en este momento. Puedes abrir cada ubicación
          en Google Maps usando los enlaces.
        </div>
      )}
    </div>
  );
}
