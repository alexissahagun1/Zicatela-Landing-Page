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
  mapId: string;
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

type GoogleAdvancedMarkerOptions = {
  map: GoogleMapInstance;
  position: LatLng;
  title: string;
  content: HTMLElement;
};

type GoogleMapsApi = {
  maps: {
    Map: new (
      element: HTMLElement,
      options: GoogleMapOptions,
    ) => GoogleMapInstance;
    marker: {
      AdvancedMarkerElement: new (options: GoogleAdvancedMarkerOptions) => object;
    };
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
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly&libraries=marker&loading=async&callback=__casaZiiGoogleMapsReady`;
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

function createAdvancedMarkerContent(label: string, index: number): HTMLElement {
  const content = document.createElement("div");
  content.style.cssText = [
    "display:flex",
    "flex-direction:column",
    "align-items:center",
    "gap:4px",
    "position:relative",
    "white-space:nowrap",
  ].join(";");

  const badge = document.createElement("span");
  badge.textContent = label;
  badge.style.cssText = [
    "border:1px solid rgba(34,34,34,0.18)",
    "border-radius:999px",
    "background:#ffffff",
    "box-shadow:0 8px 22px rgba(0,0,0,0.18)",
    "color:#222222",
    "font:600 11px/1.1 'Courier Prime','Courier New',monospace",
    "letter-spacing:0.02em",
    "padding:8px 10px",
    `transform:translateX(${index === 0 ? "-64px" : "64px"})`,
  ].join(";");

  const pin = document.createElement("span");
  pin.style.cssText = [
    "width:14px",
    "height:14px",
    "border:2px solid #ffffff",
    "border-radius:50%",
    `background:${index === 0 ? "#A04E39" : "#222222"}`,
    "box-shadow:0 3px 10px rgba(0,0,0,0.25)",
    "box-sizing:border-box",
  ].join(";");

  content.append(badge, pin);
  return content;
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

  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
  if (!mapId) {
    throw new Error("Google Maps Map ID is not configured.");
  }

  const map = new google.maps.Map(element, {
    center,
    mapId,
    zoom: 13,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    zoomControl: true,
    gestureHandling: "cooperative",
  });
  element.dataset.casaZiiMapConstructed = "true";

  pins.forEach((pin, index) => {
    new google.maps.marker.AdvancedMarkerElement({
      map,
      position: pin.position,
      title: pin.title,
      content: createAdvancedMarkerContent(pin.label, index),
    });
  });

  await waitForMapReady(google, map);
}
