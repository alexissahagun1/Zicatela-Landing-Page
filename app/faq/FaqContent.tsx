"use client";

import LegalPage, { type LegalContent } from "../components/LegalPage";

// Figma 2017:748 — Spanish copy is the design source; English is a translation of it.

const contact = {
  es: [
    <>
      <span className="font-bold">Contacto Casa Zii:</span>
      <br />
      <a href="tel:+5219541309434" className="hover:opacity-70">+52 1 954 130 9434</a>
    </>,
    <>
      <span className="font-bold">WhatsApp:</span>
      <br />
      Guadalupe Sabina Vasquez
    </>,
  ],
  en: [
    <>
      <span className="font-bold">Casa Zii contact:</span>
      <br />
      <a href="tel:+5219541309434" className="hover:opacity-70">+52 1 954 130 9434</a>
    </>,
    <>
      <span className="font-bold">WhatsApp:</span>
      <br />
      Guadalupe Sabina Vasquez
    </>,
  ],
};

const es: LegalContent = {
  intro: (
    <>
      <h1 className="text-[22px] font-bold leading-[26px] md:text-[24px]">Bienvenido a Casa Zii.</h1>
      <p className="mt-[16px]">
        Queremos que disfrutes plenamente de tu estancia y que la casa se conserve en las mejores condiciones para quienes nos visitan después de ti.
      </p>
      <p className="mt-[64px] text-[18px] font-bold md:text-[20px]">FAQS</p>
    </>
  ),
  sections: [
    { lines: ["¿Cuáles son las reglas de la casa?"] },
    {
      heading: "CHECK-IN",
      lines: [
        "15:00 h",
        "Las instrucciones de llegada y acceso serán enviadas antes de tu estancia.",
        "Puedes coordinar previamente con nosotros si necesitas dejar tu equipaje antes del check-in.",
      ],
    },
    {
      heading: "CHECK-OUT",
      lines: [
        "11:00 h",
        "Por favor, respeta el horario de salida para permitirnos preparar la casa para los siguientes huéspedes.",
        "Late check-out está sujeto a disponibilidad y autorización previa.",
      ],
    },
    {
      heading: "CAPACIDAD",
      lines: [
        "Cada casa está preparada para un máximo estándar de 4 huéspedes.",
        "Cuenta con: 2 habitaciones · 2 camas King Size",
        "No contamos con camas adicionales.",
        "Cualquier huésped adicional deberá ser autorizado previamente y podrá generar un cargo adicional.",
      ],
    },
    {
      heading: "MASCOTAS",
      lines: [
        "Máximo 2 mascotas por reservación.",
        "Cargo: $950 MXN por mascota, por reservación.",
        "Debes informarnos previamente que viajarás con mascotas.",
        "Tu mascota deberá permanecer bajo tu supervisión.",
        "Cualquier daño o limpieza extraordinaria será responsabilidad del huésped.",
      ],
    },
    {
      heading: "NIÑOS",
      lines: [
        "Por seguridad, los menores deberán estar siempre bajo la supervisión de un adulto, especialmente en la alberca y áreas exteriores.",
      ],
    },
    {
      heading: "ALBERCA",
      lines: [
        "La alberca es privada y de uso exclusivo de la casa. Disfrútala responsablemente y supervisa permanentemente a los menores. Casa Zii no cuenta con personal permanente dentro de la propiedad.",
      ],
    },
    {
      heading: "FIESTAS Y EVENTOS",
      lines: [
        "No están permitidas fiestas, eventos ni reuniones. Casa Zii es un espacio para descansar, disfrutar y compartir tranquilamente.",
      ],
    },
    { heading: "FUMAR", lines: ["No está permitido fumar dentro de la casa."] },
    {
      heading: "CUIDADO DE LA CASA",
      lines: [
        "El huésped es responsable de los daños ocasionados por él, sus acompañantes, visitantes o mascotas. Si algo se rompe o se daña, por favor avísanos cuanto antes. Preferimos solucionarlo juntos antes que descubrirlo después de tu salida.",
      ],
    },
    { heading: "LIMPIEZA", lines: ["La limpieza está incluida después de la cuarta noche de estancia."] },
    {
      heading: "INTERNET",
      lines: [
        "La casa cuenta con Wi-Fi mediante Starlink. La calidad y disponibilidad del servicio pueden depender de factores técnicos o externos.",
      ],
    },
    {
      heading: "VISITAS",
      lines: [
        "Se permite un número limitado de huéspedes y visitantes. Por favor, respete las horas de silencio por consideración a los vecinos.",
      ],
    },
    { heading: "OBJETOS OLVIDADOS", lines: ["Si olvidaste algo en Casa Zii, escríbenos lo antes posible."] },
    {
      heading: "SEGURIDAD",
      lines: [
        "Casa Zii no cuenta con cámaras de seguridad en exteriores ni con personal permanente dentro de la propiedad. Si tienes una emergencia, comunícate inmediatamente con los servicios de emergencia correspondientes y después informa a Casa Zii.",
      ],
    },
    { lines: contact.es },
    {
      heading: "RESPETO AL ENTORNO",
      lines: [
        "Casa Zii forma parte de un entorno residencial. Te pedimos evitar ruidos excesivos y cualquier comportamiento que pueda afectar la tranquilidad de vecinos o de otras personas.",
      ],
    },
    { lines: ["Que disfrutes tu estancia. ♡"] },
    { lines: ["● CASA Zii CAMPECHE  ▲ CASA Zii PALMAS", "ZICATELA HOSPITALITY GROUP, S.A. DE C.V."] },
  ],
  closing: "Casa Zii es el refugio ideal para olvidar la ciudad, reconectar con la naturaleza y vivir intensamente cada instante.",
};

const en: LegalContent = {
  intro: (
    <>
      <h1 className="text-[22px] font-bold leading-[26px] md:text-[24px]">Welcome to Casa Zii.</h1>
      <p className="mt-[16px]">
        We want you to fully enjoy your stay and to keep the house in the best condition for those who visit after you.
      </p>
      <p className="mt-[64px] text-[18px] font-bold md:text-[20px]">FAQS</p>
    </>
  ),
  sections: [
    { lines: ["What are the house rules?"] },
    {
      heading: "CHECK-IN",
      lines: [
        "3:00 p.m.",
        "Arrival and access instructions will be sent before your stay.",
        "You can coordinate with us in advance if you need to drop off your luggage before check-in.",
      ],
    },
    {
      heading: "CHECK-OUT",
      lines: [
        "11:00 a.m.",
        "Please respect the departure time so we can prepare the house for the next guests.",
        "Late check-out is subject to availability and prior authorization.",
      ],
    },
    {
      heading: "CAPACITY",
      lines: [
        "Each house is prepared for a standard maximum of 4 guests.",
        "It has: 2 bedrooms · 2 King Size beds",
        "We do not have additional beds.",
        "Any additional guest must be authorized in advance and may incur an extra charge.",
      ],
    },
    {
      heading: "PETS",
      lines: [
        "Maximum 2 pets per reservation.",
        "Fee: $950 MXN per pet, per reservation.",
        "You must let us know in advance that you will be traveling with pets.",
        "Your pet must remain under your supervision.",
        "Any damage or extraordinary cleaning will be the guest's responsibility.",
      ],
    },
    {
      heading: "CHILDREN",
      lines: [
        "For safety, minors must always be supervised by an adult, especially in the pool and outdoor areas.",
      ],
    },
    {
      heading: "POOL",
      lines: [
        "The pool is private and for the exclusive use of the house. Enjoy it responsibly and supervise minors at all times. Casa Zii does not have permanent staff on the property.",
      ],
    },
    {
      heading: "PARTIES AND EVENTS",
      lines: [
        "Parties, events and gatherings are not allowed. Casa Zii is a place to rest, enjoy and share quietly.",
      ],
    },
    { heading: "SMOKING", lines: ["Smoking is not allowed inside the house."] },
    {
      heading: "CARE OF THE HOUSE",
      lines: [
        "The guest is responsible for damage caused by themselves, their companions, visitors or pets. If something breaks or gets damaged, please let us know as soon as possible. We would rather solve it together than discover it after you leave.",
      ],
    },
    { heading: "CLEANING", lines: ["Cleaning is included after the fourth night of your stay."] },
    {
      heading: "INTERNET",
      lines: [
        "The house has Wi-Fi via Starlink. Service quality and availability may depend on technical or external factors.",
      ],
    },
    {
      heading: "VISITORS",
      lines: [
        "A limited number of guests and visitors is allowed. Please respect quiet hours out of consideration for the neighbors.",
      ],
    },
    { heading: "LOST ITEMS", lines: ["If you left something at Casa Zii, write to us as soon as possible."] },
    {
      heading: "SAFETY",
      lines: [
        "Casa Zii does not have outdoor security cameras or permanent staff on the property. In an emergency, contact the appropriate emergency services immediately and then inform Casa Zii.",
      ],
    },
    { lines: contact.en },
    {
      heading: "RESPECT FOR THE SURROUNDINGS",
      lines: [
        "Casa Zii is part of a residential area. We ask you to avoid excessive noise and any behavior that may disturb the peace of neighbors or others.",
      ],
    },
    { lines: ["Enjoy your stay. ♡"] },
    { lines: ["● CASA Zii CAMPECHE  ▲ CASA Zii PALMAS", "ZICATELA HOSPITALITY GROUP, S.A. DE C.V."] },
  ],
  closing: "Casa Zii is the perfect retreat to leave the city behind, reconnect with nature, and fully embrace every moment.",
};

export default function FaqContent() {
  return <LegalPage photo={{ src: "/figma/latest/faq-photo.jpg", alt: "Casa Zii" }} content={{ es, en }} />;
}
