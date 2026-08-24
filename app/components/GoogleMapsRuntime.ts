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
};

let googleMapsPromise: Promise<GoogleMapsApi> | null = null;

function loadGoogleMaps(): Promise<GoogleMapsApi> {
  const browserWindow = window as GoogleMapsWindow;

  if (browserWindow.google?.maps) {
    return Promise.resolve(browserWindow.google);
  }

  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return Promise.reject(new Error("Google Maps API key is not configured."));
  }

  googleMapsPromise = new Promise<GoogleMapsApi>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      "script[data-casa-zii-google-maps]",
    );
    const script = existingScript ?? document.createElement("script");

    const rejectLoad = (message: string) => {
      script.remove();
      reject(new Error(message));
    };

    const resolveWhenReady = () => {
      const loadedGoogle = (window as GoogleMapsWindow).google;
      if (loadedGoogle?.maps) {
        resolve(loadedGoogle);
      } else {
        rejectLoad("Google Maps loaded without its maps namespace.");
      }
    };

    script.addEventListener("load", resolveWhenReady, { once: true });
    script.addEventListener(
      "error",
      () => rejectLoad("Google Maps failed to load."),
      { once: true },
    );

    if (!existingScript) {
      script.dataset.casaZiiGoogleMaps = "true";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly&loading=async`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
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
