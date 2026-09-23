"use client";

import LegalPage, { legalTitleClass, type LegalContent } from "../components/LegalPage";

// Figma eNHBCVNfWSH0nXswrrvnuS 2020:901 (Frame 6) — Spanish copy is the design source; English is a translation of it.

const EMAIL = (
  <a href="mailto:zicatela.hospitality@gmail.com" className="underline hover:opacity-70">
    zicatela.hospitality@gmail.com
  </a>
);

const es: LegalContent = {
  intro: (
    <>
      <h1 className={legalTitleClass}>Aviso de Privacidad</h1>
      <p className="mt-[40px] md:mt-[calc(var(--f)*92.7)] md:text-[max(12px,calc(var(--f)*16))] md:leading-normal">● CASA Zii CAMPECHE  ▲ CASA Zii PALMAS</p>
      <p className="mt-[64px] md:mt-[calc(var(--f)*172)] md:text-[max(12px,calc(var(--f)*16))] md:leading-normal">Última actualización: 1 de septiembre de 2026</p>
    </>
  ),
  sections: [
    {
      lines: [
        "ZICATELA HOSPITALITY GROUP, S.A. DE C.V., en adelante “Casa Zii”, con domicilio en Avenida Cuauhtémoc número 55, interior 304, Colonia Roma Norte, Alcaldía Cuauhtémoc, Ciudad de México, C.P. 06700, es responsable del tratamiento de los datos personales que recaba de sus huéspedes y usuarios. Para cualquier asunto relacionado con el tratamiento de datos personales puedes contactarnos en:",
        <>
          Correo: {EMAIL}
          <br />
          Teléfono: 33 1432 4309
        </>,
      ],
    },
    {
      heading: "1. Datos personales que recabamos",
      lines: [
        "Dependiendo de la relación que tengas con Casa Zii, podemos recabar:",
        "· Nombre y datos de identificación.",
        "· Correo electrónico y número telefónico.",
        "· Información necesaria para gestionar tu reservación y estancia, incluyendo fechas, número de huéspedes, acompañantes y solicitudes relacionadas con el alojamiento.",
        "· Información necesaria para verificar tu identidad cuando resulte aplicable.",
        "· Datos de facturación cuando solicites factura.",
        "· Información relacionada con pagos, la cual es procesada mediante proveedores especializados.",
        "· Comunicaciones, solicitudes o incidencias relacionadas con tu reservación o estancia.",
        "Cuando te suscribas voluntariamente para recibir comunicaciones de Casa Zii, utilizaremos tu correo electrónico para enviarte ocasionalmente información sobre promociones, novedades, experiencias y otros contenidos relacionados con Casa Zii. Casa Zii procura recabar únicamente los datos necesarios para prestar sus servicios y, en su caso, para las finalidades que hayas autorizado.",
      ],
    },
    {
      heading: "2. Finalidades",
      lines: [
        "Tus datos personales serán utilizados para:",
        "· Gestionar y confirmar reservaciones.",
        "· Administrar tu estancia, incluyendo check-in y check-out.",
        "· Proporcionar información e instrucciones de acceso.",
        "· Comunicarnos contigo y atender solicitudes.",
        "· Procesar pagos y, cuando corresponda, emitir facturas.",
        "· Gestionar cancelaciones, cambios, depósitos y posibles daños a la propiedad.",
        "· Atender incidencias y reclamaciones.",
        "· Verificar identidad cuando sea necesario.",
        "· Cumplir obligaciones legales, fiscales y administrativas.",
        "· Prevenir fraudes y proteger la seguridad de huéspedes, personas, instalaciones y bienes.",
        "Finalidades secundarias:",
        "Si voluntariamente proporcionas tu correo electrónico para suscribirte a las comunicaciones de Casa Zii, podremos utilizarlo para enviarte, ocasionalmente, promociones, novedades, experiencias, beneficios y otras comunicaciones relacionadas con Casa Zii. Esta finalidad es opcional y no condiciona la prestación de los servicios de hospedaje. Puedes solicitar dejar de recibir estas comunicaciones en cualquier momento.",
      ],
    },
    {
      heading: "3. Proveedores y transferencia de datos",
      lines: [
        "Para prestar nuestros servicios podemos compartir o permitir el acceso a datos personales a proveedores que intervienen en la operación, incluyendo plataformas de reservaciones, procesamiento de pagos, tecnología y, cuando corresponda, verificación de identidad. Casa Zii utiliza Guesty para la gestión de reservaciones y operaciones relacionadas con el alojamiento, y Stripe para el procesamiento de pagos. Los datos únicamente serán compartidos en la medida necesaria para cumplir las finalidades señaladas y las obligaciones legales aplicables.",
      ],
    },
    {
      heading: "4. Conservación y seguridad",
      lines: [
        "Casa Zii conservará los datos personales durante el tiempo necesario para cumplir las finalidades de este Aviso y las obligaciones legales, fiscales, contables o contractuales aplicables. Se implementan medidas administrativas, técnicas y físicas razonables para proteger los datos personales contra pérdida, alteración, acceso o tratamiento no autorizado.",
      ],
    },
    {
      heading: "5. Derechos ARCO",
      lines: [
        "Puedes ejercer tus derechos de Acceso, Rectificación, Cancelación u Oposición (ARCO) respecto de tus datos personales.",
        <>La solicitud deberá enviarse a: {EMAIL}</>,
        "Deberá incluir tu nombre, acreditar tu identidad y señalar claramente los datos respecto de los cuales deseas ejercer algún derecho. Casa Zii atenderá las solicitudes conforme a los plazos y requisitos establecidos por la legislación aplicable.",
      ],
    },
    {
      heading: "6. Revocación y limitación del uso",
      lines: [
        <>
          Cuando el tratamiento se base en tu consentimiento, puedes solicitar su revocación enviando una solicitud a {EMAIL}. También puedes solicitar, cuando legalmente corresponda, la limitación del uso o divulgación de tus datos personales. Para dejar de recibir comunicaciones promocionales de Casa Zii, puedes hacerlo en cualquier momento utilizando el mecanismo de cancelación disponible en dichas comunicaciones.
        </>,
      ],
    },
    {
      heading: "7. Cookies",
      lines: [
        "El sitio web de Casa Zii utiliza únicamente cookies técnicas y necesarias para su funcionamiento, la gestión de las reservaciones y la correcta prestación de los servicios. Estas cookies no se utilizan con fines de publicidad, marketing o seguimiento de la actividad del usuario. El usuario puede configurar o deshabilitar las cookies desde las opciones de su navegador. Sin embargo, hacerlo podría afectar el funcionamiento del sitio o de determinadas funcionalidades de reservación.",
      ],
    },
    {
      heading: "8. Datos de menores",
      lines: [
        "Cuando sea necesario para la prestación del servicio, seguridad o registro del alojamiento, Casa Zii podrá solicitar información limitada sobre menores, procurando recabar únicamente los datos estrictamente necesarios.",
      ],
    },
    {
      heading: "9. Cambios al Aviso de Privacidad",
      lines: [
        "Casa Zii podrá modificar este Aviso cuando existan cambios en sus servicios, procesos, proveedores, tecnologías o legislación aplicable. La versión vigente estará disponible en el sitio web de Casa Zii.",
      ],
    },
    {
      heading: "10. Contacto",
      lines: [
        <>
          ZICATELA HOSPITALITY GROUP, S.A. DE C.V.
          <br />
          Avenida Cuauhtémoc 55, interior 304
          <br />
          Colonia Roma Norte, Alcaldía Cuauhtémoc
          <br />
          Ciudad de México, C.P. 06700
        </>,
        <>
          Correo: {EMAIL}
          <br />
          Teléfono: 33 1432 4309
        </>,
      ],
    },
  ],
  closing: "Casa Zii es el refugio ideal para olvidar la ciudad, reconectar con la naturaleza y vivir intensamente cada instante.",
};

const en: LegalContent = {
  intro: (
    <>
      <h1 className={legalTitleClass}>Privacy Notice</h1>
      <p className="mt-[40px] md:mt-[calc(var(--f)*92.7)] md:text-[max(12px,calc(var(--f)*16))] md:leading-normal">● CASA Zii CAMPECHE  ▲ CASA Zii PALMAS</p>
      <p className="mt-[64px] md:mt-[calc(var(--f)*172)] md:text-[max(12px,calc(var(--f)*16))] md:leading-normal">Last updated: September 1, 2026</p>
    </>
  ),
  sections: [
    {
      lines: [
        "ZICATELA HOSPITALITY GROUP, S.A. DE C.V., hereinafter “Casa Zii”, with its address at Avenida Cuauhtémoc número 55, interior 304, Colonia Roma Norte, Alcaldía Cuauhtémoc, Ciudad de México, C.P. 06700, is responsible for processing the personal data it collects from its guests and users. For any matter related to the processing of personal data, you can contact us at:",
        <>
          Email: {EMAIL}
          <br />
          Phone: 33 1432 4309
        </>,
      ],
    },
    {
      heading: "1. Personal data we collect",
      lines: [
        "Depending on your relationship with Casa Zii, we may collect:",
        "· Name and identification data.",
        "· Email address and phone number.",
        "· Information needed to manage your reservation and stay, including dates, number of guests, companions and requests related to the accommodation.",
        "· Information needed to verify your identity when applicable.",
        "· Billing data when you request an invoice.",
        "· Payment-related information, which is processed through specialized providers.",
        "· Communications, requests or incidents related to your reservation or stay.",
        "When you voluntarily subscribe to receive communications from Casa Zii, we will use your email address to occasionally send you information about promotions, news, experiences and other content related to Casa Zii. Casa Zii seeks to collect only the data needed to provide its services and, where applicable, for the purposes you have authorized.",
      ],
    },
    {
      heading: "2. Purposes",
      lines: [
        "Your personal data will be used to:",
        "· Manage and confirm reservations.",
        "· Manage your stay, including check-in and check-out.",
        "· Provide access information and instructions.",
        "· Communicate with you and respond to requests.",
        "· Process payments and, where applicable, issue invoices.",
        "· Manage cancellations, changes, deposits and possible damage to the property.",
        "· Handle incidents and complaints.",
        "· Verify identity when necessary.",
        "· Comply with legal, tax and administrative obligations.",
        "· Prevent fraud and protect the safety of guests, people, facilities and property.",
        "Secondary purposes:",
        "If you voluntarily provide your email address to subscribe to Casa Zii communications, we may use it to occasionally send you promotions, news, experiences, benefits and other communications related to Casa Zii. This purpose is optional and does not condition the provision of accommodation services. You can ask to stop receiving these communications at any time.",
      ],
    },
    {
      heading: "3. Providers and data transfers",
      lines: [
        "To provide our services we may share personal data with, or allow access to, providers involved in the operation, including reservation platforms, payment processing, technology and, where applicable, identity verification. Casa Zii uses Guesty to manage reservations and accommodation-related operations, and Stripe to process payments. Data will only be shared to the extent necessary to fulfil the stated purposes and applicable legal obligations.",
      ],
    },
    {
      heading: "4. Retention and security",
      lines: [
        "Casa Zii will retain personal data for as long as necessary to fulfil the purposes of this Notice and the applicable legal, tax, accounting or contractual obligations. Reasonable administrative, technical and physical measures are in place to protect personal data against loss, alteration, and unauthorized access or processing.",
      ],
    },
    {
      heading: "5. ARCO rights",
      lines: [
        "You may exercise your rights of Access, Rectification, Cancellation or Opposition (ARCO) regarding your personal data.",
        <>Requests must be sent to: {EMAIL}</>,
        "They must include your name, proof of identity and a clear description of the data regarding which you wish to exercise a right. Casa Zii will handle requests within the timeframes and requirements set by applicable law.",
      ],
    },
    {
      heading: "6. Withdrawal of consent and limitation of use",
      lines: [
        <>
          When processing is based on your consent, you may withdraw it by sending a request to {EMAIL}. Where legally applicable, you may also request that the use or disclosure of your personal data be limited. To stop receiving promotional communications from Casa Zii, you can use the unsubscribe mechanism included in those communications at any time.
        </>,
      ],
    },
    {
      heading: "7. Cookies",
      lines: [
        "The Casa Zii website only uses technical cookies that are necessary for it to work, to manage reservations and to provide the services properly. These cookies are not used for advertising, marketing or tracking user activity. Users can configure or disable cookies in their browser settings; however, doing so may affect how the site or certain reservation features work.",
      ],
    },
    {
      heading: "8. Minors' data",
      lines: [
        "When necessary to provide the service, for security or for accommodation registration, Casa Zii may request limited information about minors, seeking to collect only strictly necessary data.",
      ],
    },
    {
      heading: "9. Changes to this Privacy Notice",
      lines: [
        "Casa Zii may amend this Notice when there are changes to its services, processes, providers, technologies or applicable law. The current version will be available on the Casa Zii website.",
      ],
    },
    {
      heading: "10. Contact",
      lines: [
        <>
          ZICATELA HOSPITALITY GROUP, S.A. DE C.V.
          <br />
          Avenida Cuauhtémoc 55, interior 304
          <br />
          Colonia Roma Norte, Alcaldía Cuauhtémoc
          <br />
          Ciudad de México, C.P. 06700
        </>,
        <>
          Email: {EMAIL}
          <br />
          Phone: 33 1432 4309
        </>,
      ],
    },
  ],
  closing: "Casa Zii is the perfect retreat to leave the city behind, reconnect with nature, and fully embrace every moment.",
};

export default function AvisoContent() {
  return <LegalPage photo={{ src: "/figma/latest/privacy-photo.jpg", alt: "Casa Zii" }} content={{ es, en }} bodyTop={963} />;
}
