import type { Metadata } from "next";
import TerminosContent from "./TerminosContent";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos y condiciones de reservación y hospedaje de Casa Zii Campeche y Casa Zii Palmas.",
};

export default function TerminosPage() {
  return <TerminosContent />;
}
