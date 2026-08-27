import LazyGoogleMap from "./LazyGoogleMap";

const PALMAS_COORDINATES = "15.831041,-97.040609";
const CAMPECHE_COORDINATES = "15.8315562,-97.0404726";

const MAP_CENTER = { lat: 15.8313, lng: -97.04054 };

function parseCoordinates(coordinates: string) {
  const [lat, lng] = coordinates.split(",").map(Number);
  return { lat, lng };
}

const MAP_PINS = [
  {
    position: parseCoordinates(PALMAS_COORDINATES),
    title: "Casa Palmas",
    label: "CASA PALMAS",
  },
  {
    position: parseCoordinates(CAMPECHE_COORDINATES),
    title: "Casa Campeche",
    label: "CASA CAMPECHE",
  },
];

export default function MapSection() {
  return (
    <section className="bg-white px-4 py-14 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-[640px] overflow-hidden border border-[#222222]/10 bg-white">
        <LazyGoogleMap
          title="Mapa de Casa Zii en Zicatela con las ubicaciones de Casa Palmas y Casa Campeche"
          center={MAP_CENTER}
          pins={MAP_PINS}
        />
      </div>
    </section>
  );
}
