export type LatLng = {
  lat: number;
  lng: number;
};

export type MapPin = {
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

type GoogleMapInstance = object;

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
  __casaZiiGoogleMapsReady?: () => void;
  gm_authFailure?: () => void;
};

let googleMapsPromise: Promise<GoogleMapsApi> | null = null;
let googleMapsAuthFailure: Error | null = null;

function loadGoogleMaps(): Promise<GoogleMapsApi> {
  const browserWindow = window as GoogleMapsWindow;

  if (googleMapsAuthFailure) {
    return Promise.reject(googleMapsAuthFailure);
  }

  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  if (browserWindow.google?.maps) {
    return Promise.resolve(browserWindow.google);
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return Promise.reject(new Error("Google Maps API key is not configured."));
  }

  document
    .querySelector<HTMLScriptElement>("script[data-casa-zii-google-maps]")
    ?.remove();

  const script = document.createElement("script");

  googleMapsPromise = new Promise<GoogleMapsApi>((resolve, reject) => {
    const previousAuthFailure = browserWindow.gm_authFailure;
    let settled = false;

    const cleanup = () => {
      script.removeEventListener("error", handleScriptError);

      if (browserWindow.__casaZiiGoogleMapsReady === handleReady) {
        delete browserWindow.__casaZiiGoogleMapsReady;
      }

      if (browserWindow.gm_authFailure === handleAuthFailure) {
        if (previousAuthFailure) {
          browserWindow.gm_authFailure = previousAuthFailure;
        } else {
          delete browserWindow.gm_authFailure;
        }
      }
    };

    const rejectLoad = (error: Error) => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      script.remove();
      reject(error);
    };

    function handleReady() {
      if (settled) {
        return;
      }

      const loadedGoogle = browserWindow.google;
      if (loadedGoogle?.maps) {
        settled = true;
        cleanup();
        resolve(loadedGoogle);
      } else {
        rejectLoad(
          new Error("Google Maps loaded without its maps namespace."),
        );
      }
    }

    function handleAuthFailure() {
      const authError = new Error(
        "Google Maps authentication or billing authorization failed.",
      );
      googleMapsAuthFailure = authError;
      rejectLoad(authError);
      previousAuthFailure?.();
    }

    function handleScriptError() {
      rejectLoad(new Error("Google Maps failed to load."));
    }

    browserWindow.__casaZiiGoogleMapsReady = handleReady;
    browserWindow.gm_authFailure = handleAuthFailure;
    script.dataset.casaZiiGoogleMaps = "true";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly&loading=async&callback=__casaZiiGoogleMapsReady`;
    script.async = true;
    script.defer = true;
    script.addEventListener("error", handleScriptError, { once: true });
    document.head.appendChild(script);
  }).catch((error: unknown) => {
    googleMapsPromise = null;
    throw error;
  });

  return googleMapsPromise;
}

export async function renderGoogleMap(
  element: HTMLElement,
  center: LatLng,
  pins: MapPin[],
): Promise<void> {
  const google = await loadGoogleMaps();

  if (!element.isConnected) {
    throw new Error("Google Maps container is no longer connected.");
  }

  const map = new google.maps.Map(element, {
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
}
