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

type GoogleMapsEventListener = {
  remove(): void;
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

type GoogleMapsApi = {
  maps: {
    Map: new (
      element: HTMLElement,
      options: GoogleMapOptions,
    ) => GoogleMapInstance;
    Marker: new (options: GoogleMarkerOptions) => object;
    event: {
      addListenerOnce: (
        map: GoogleMapInstance,
        eventName: "idle",
        handler: () => void,
      ) => GoogleMapsEventListener;
    };
  };
};

type GoogleMapsWindow = Window & {
  google?: GoogleMapsApi;
  __casaZiiGoogleMapsReady?: () => void;
  gm_authFailure?: () => void;
};

const MAP_READY_TIMEOUT_MS = 15_000;

let googleMapsPromise: Promise<GoogleMapsApi> | null = null;
let authFailureError: Error | null = null;
const authFailureSubscribers = new Set<(error: Error) => void>();
let rejectInFlightGoogleMapsLoad: ((error: Error) => void) | null = null;
let previousAuthFailure: (() => void) | undefined;

function handleGoogleMapsAuthFailure() {
  const error =
    authFailureError ??
    new Error("Google Maps authentication or billing authorization failed.");
  authFailureError = error;

  rejectInFlightGoogleMapsLoad?.(error);
  authFailureSubscribers.forEach((subscriber) => {
    try {
      subscriber(error);
    } catch {
      // One subscriber must not prevent the remaining failure notifications.
    }
  });

  try {
    previousAuthFailure?.call(window);
  } catch {
    // A pre-existing handler must not interrupt Casa Zii's failure lifecycle.
  }
}

function installAuthFailureHandler(browserWindow: GoogleMapsWindow) {
  if (browserWindow.gm_authFailure === handleGoogleMapsAuthFailure) {
    return;
  }

  previousAuthFailure = browserWindow.gm_authFailure;
  browserWindow.gm_authFailure = handleGoogleMapsAuthFailure;
}

function loadGoogleMaps(): Promise<GoogleMapsApi> {
  const browserWindow = window as GoogleMapsWindow;
  installAuthFailureHandler(browserWindow);

  if (authFailureError) {
    return Promise.reject(authFailureError);
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
    let settled = false;

    const cleanup = () => {
      script.removeEventListener("error", handleScriptError);

      if (rejectInFlightGoogleMapsLoad === rejectLoad) {
        rejectInFlightGoogleMapsLoad = null;
      }

      if (browserWindow.__casaZiiGoogleMapsReady === handleReady) {
        delete browserWindow.__casaZiiGoogleMapsReady;
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

    function handleScriptError() {
      rejectLoad(new Error("Google Maps failed to load."));
    }

    rejectInFlightGoogleMapsLoad = rejectLoad;
    browserWindow.__casaZiiGoogleMapsReady = handleReady;
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

function waitForMapReady(
  google: GoogleMapsApi,
  map: GoogleMapInstance,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    let settled = false;
    let idleListener: GoogleMapsEventListener | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const cleanup = () => {
      authFailureSubscribers.delete(handleAuthFailure);
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      if (idleListener) {
        idleListener.remove();
        idleListener = null;
      }
    };

    const rejectReadiness = (error: Error) => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      reject(error);
    };

    function handleAuthFailure(error: Error) {
      rejectReadiness(error);
    }

    function handleIdle() {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      resolve();
    }

    authFailureSubscribers.add(handleAuthFailure);
    if (authFailureError) {
      rejectReadiness(authFailureError);
      return;
    }

    idleListener = google.maps.event.addListenerOnce(map, "idle", handleIdle);
    timeoutId = setTimeout(() => {
      rejectReadiness(
        new Error("Google Maps did not become ready within 15 seconds."),
      );
    }, MAP_READY_TIMEOUT_MS);
  });
}

export async function renderGoogleMap(
  element: HTMLElement,
  center: LatLng,
  pins: MapPin[],
): Promise<void> {
  const google = await loadGoogleMaps();

  if (authFailureError) {
    throw authFailureError;
  }

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
  element.dataset.casaZiiMapConstructed = "true";

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

  await waitForMapReady(google, map);
}
