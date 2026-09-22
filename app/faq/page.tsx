import type { Metadata } from "next";
import FaqContent from "./FaqContent";

export const metadata: Metadata = {
  title: "FAQs - Casa Zii",
  description: "Reglas de la casa y preguntas frecuentes de Casa Zii Campeche y Casa Zii Palmas.",
};

export default function FaqPage() {
  return <FaqContent />;
}
