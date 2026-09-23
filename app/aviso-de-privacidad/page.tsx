import type { Metadata } from "next";
import AvisoContent from "./AvisoContent";

export const metadata: Metadata = {
  title: "Aviso de Privacidad - Casa Zii",
  description: "Aviso de privacidad de Casa Zii Campeche y Casa Zii Palmas.",
};

export default function AvisoDePrivacidadPage() {
  return <AvisoContent />;
}
