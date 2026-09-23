"use client";

import Link from "next/link";
import LegalPage, { type LegalContent } from "../components/LegalPage";


// Figma 2020:851 — Spanish copy is the design source; English is a translation of it.

const EMAIL = (
  <a href="mailto:zicatela.hospitality@gmail.com" className="underline hover:opacity-70">
    zicatela.hospitality@gmail.com
  </a>
);

const es: LegalContent = {
  intro: (
    <>
      <h1 className="text-[22px] font-bold leading-[26px] md:text-[24px] md:leading-[30px]">
        Términos y Condiciones
        <br />
        de Reservación y Hospedaje
      </h1>
      <p className="mt-[40px]">● CASA Zii CAMPECHE  ▲ CASA Zii PALMAS</p>
      <p className="mt-[64px]">Última actualización: 1 de septiembre de 2026</p>
    </>
  ),
  sections: [
    {
      heading: "1. RESPONSABLE Y OBJETO",
      lines: [
        "Los servicios de alojamiento de Casa Zii Campeche y Casa Zii Palmas son proporcionados por ZICATELA HOSPITALITY GROUP, S.A. DE C.V., en adelante “Casa Zii”. Estos Términos y Condiciones regulan el proceso de reservación y contratación de los servicios de alojamiento temporal ofrecidos por Casa Zii. Al realizar una reservación, el huésped acepta estos Términos y Condiciones.",
        <>
          Domicilio: Avenida Cuauhtémoc 55, interior 304, Colonia Roma Norte, Alcaldía Cuauhtémoc, Ciudad de México, C.P. 06700.
          <br />
          Correo: {EMAIL}
          <br />
          Teléfono: 33 1432 4309
        </>,
      ],
    },
    {
      heading: "2. RESERVACIONES Y CAPACIDAD",
      lines: [
        "Las reservaciones se realizan mediante el sitio web y el sistema de reservaciones Guesty. Cada propiedad se renta completa y para uso exclusivo de los huéspedes registrados en la reservación. La capacidad estándar es de 4 personas, distribuidas en 2 habitaciones con una cama King Size cada una.",
        "Casa Zii podrá solicitar información adicional de los huéspedes y acompañantes por motivos de seguridad, control de acceso, registro y operación del alojamiento. Cuando sea necesario, Casa Zii podrá solicitar identificación oficial y otros elementos para verificar la identidad del huésped.",
      ],
    },
    {
      heading: "3. PRECIOS Y PAGOS",
      lines: [
        "El precio aplicable será el que aparezca en el motor de reservaciones al momento de contratar. Los pagos se procesan mediante Stripe, de acuerdo con las condiciones mostradas durante el proceso de reservación. Cualquier cargo adicional aplicable a la estancia deberá ser informado al huésped. Se debe pagar el 100% del total en el momento de realizar la reserva.",
      ],
    },
    {
      heading: "4. CANCELACIONES Y CAMBIOS",
      lines: [
        "Las reservaciones estarán sujetas a la política de cancelación indicada al momento de realizar la contratación. Los cambios de fecha estarán sujetos a disponibilidad y podrán generar diferencias de tarifa o cargos adicionales, cuando corresponda. En caso de no presentarse en la fecha de llegada, se aplicará la política de cancelación correspondiente a la reservación.",
      ],
    },
    {
      heading: "5. CHECK-IN Y CHECK-OUT",
      lines: [
        <>
          Check-in: 15:00 horas.
          <br />
          Check-out: 11:00 horas.
        </>,
        "El acceso anticipado y la salida posterior estarán sujetos a disponibilidad y autorización previa. Las instrucciones de acceso y llegada serán proporcionadas al huésped antes de su estancia.",
      ],
    },
    {
      heading: "6. USO DE LA PROPIEDAD",
      lines: [
        "El huésped deberá utilizar la propiedad de manera responsable y exclusivamente para fines de hospedaje.",
        "No está permitido:",
        "· Exceder la capacidad autorizada.",
        "· Organizar fiestas, eventos o reuniones.",
        "· Realizar actividades ilícitas.",
        "· Dañar o alterar la propiedad, mobiliario o instalaciones.",
        "· Generar molestias graves a vecinos o terceros.",
        "· Fumar dentro de las casas.",
        "Los niños deberán permanecer bajo supervisión de un adulto, especialmente en las áreas de alberca y exteriores. El huésped será responsable de cualquier daño o limpieza extraordinaria ocasionada por las mascotas.",
      ],
    },
    {
      heading: "7. DAÑOS Y DEPÓSITO DE GARANTÍA",
      lines: [
        "El huésped será responsable por los daños ocasionados a la propiedad, mobiliario, instalaciones, equipamiento o accesorios por él, sus acompañantes, visitantes o mascotas.",
      ],
    },
    {
      heading: "8. ALBERCA Y SEGURIDAD",
      lines: [
        "Cada propiedad cuenta con alberca privada. El uso de la alberca y de las áreas exteriores es responsabilidad del huésped. Los menores deberán permanecer bajo supervisión de un adulto. Casa Zii no cuenta con personal permanente dentro de las propiedades.",
      ],
    },
    {
      heading: "9. SERVICIOS E INTERRUPCIONES",
      lines: [
        "Casa Zii procurará mantener disponibles los servicios y amenidades publicados para cada propiedad. Algunos servicios dependen de proveedores externos y podrían verse afectados por causas técnicas, mantenimiento, fuerza mayor o circunstancias fuera del control razonable de Casa Zii. En estos casos, Casa Zii procurará informar al huésped cuando corresponda.",
      ],
    },
    {
      heading: "10. OBJETOS PERSONALES Y FACTURACIÓN",
      lines: [
        "El huésped será responsable de sus objetos personales. Casa Zii no será responsable por objetos olvidados o extraviados, salvo en los casos previstos por la legislación aplicable.",
        <>Las solicitudes de factura deberán enviarse a: {EMAIL}</>,
        "La solicitud deberá realizarse dentro del mismo mes en que se realizó el pago o se prestó el servicio y deberá incluir los datos fiscales correspondientes.",
      ],
    },
    {
      heading: "11. PROTECCIÓN DE DATOS",
      lines: [
        <>
          El tratamiento de los datos personales de los huéspedes se realizará conforme al Aviso de Privacidad de Casa Zii, disponible en:{" "}
          <Link href="/aviso-de-privacidad" className="underline hover:opacity-70">Aviso de Privacidad</Link>
        </>,
        "Casa Zii utiliza Guesty para la gestión de reservaciones y Stripe para el procesamiento de pagos. Estos proveedores cuentan además con sus propios términos y políticas de privacidad.",
      ],
    },
    {
      heading: "12. MODIFICACIONES Y LEGISLACIÓN APLICABLE",
      lines: [
        "Casa Zii podrá actualizar estos Términos y Condiciones cuando existan cambios en sus servicios, operación, tecnología o legislación aplicable. Las condiciones aplicables a una reservación serán las vigentes al momento de su contratación, salvo aquellas modificaciones que deban realizarse por disposición legal. Estos Términos se regirán por las leyes aplicables en México.",
      ],
    },
    {
      heading: "CONTACTO",
      lines: [
        <>
          ● CASA Zii CAMPECHE  ▲ CASA Zii PALMAS
          <br />
          ZICATELA HOSPITALITY GROUP, S.A. DE C.V.
        </>,
        <>
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
        "Al realizar una reservación y/o efectuar el pago correspondiente, el huésped reconoce haber tenido acceso a estos Términos y Condiciones y acepta las condiciones aplicables a su estancia.",
      ],
    },
  ],
  closing: "Casa Zii es el refugio ideal para olvidar la ciudad, reconectar con la naturaleza y vivir intensamente cada instante.",
};

const en: LegalContent = {
  intro: (
    <>
      <h1 className="text-[22px] font-bold leading-[26px] md:text-[24px] md:leading-[30px]">
        Terms and Conditions
        <br />
        of Reservation and Lodging
      </h1>
      <p className="mt-[40px]">● CASA Zii CAMPECHE  ▲ CASA Zii PALMAS</p>
      <p className="mt-[64px]">Last updated: September 1, 2026</p>
    </>
  ),
  sections: [
    {
      heading: "1. RESPONSIBLE PARTY AND PURPOSE",
      lines: [
        "The lodging services of Casa Zii Campeche and Casa Zii Palmas are provided by ZICATELA HOSPITALITY GROUP, S.A. DE C.V., hereinafter “Casa Zii”. These Terms and Conditions govern the reservation and contracting process for the temporary lodging services offered by Casa Zii. By making a reservation, the guest accepts these Terms and Conditions.",
        <>
          Address: Avenida Cuauhtémoc 55, interior 304, Colonia Roma Norte, Alcaldía Cuauhtémoc, Mexico City, C.P. 06700.
          <br />
          Email: {EMAIL}
          <br />
          Phone: 33 1432 4309
        </>,
      ],
    },
    {
      heading: "2. RESERVATIONS AND CAPACITY",
      lines: [
        "Reservations are made through the website and the Guesty reservation system. Each property is rented in full and for the exclusive use of the guests registered in the reservation. Standard capacity is 4 people, distributed in 2 bedrooms with one King Size bed each.",
        "Casa Zii may request additional information from guests and companions for security, access control, registration and lodging operation purposes. When necessary, Casa Zii may request official identification and other elements to verify the guest's identity.",
      ],
    },
    {
      heading: "3. PRICES AND PAYMENTS",
      lines: [
        "The applicable price will be the one shown in the booking engine at the time of contracting. Payments are processed through Stripe, in accordance with the conditions shown during the reservation process. Any additional charge applicable to the stay must be communicated to the guest. 100% of the total must be paid at the time of booking.",
      ],
    },
    {
      heading: "4. CANCELLATIONS AND CHANGES",
      lines: [
        "Reservations are subject to the cancellation policy indicated at the time of contracting. Date changes are subject to availability and may generate rate differences or additional charges, where applicable. In case of no-show on the arrival date, the cancellation policy corresponding to the reservation will apply.",
      ],
    },
    {
      heading: "5. CHECK-IN AND CHECK-OUT",
      lines: [
        <>
          Check-in: 3:00 p.m.
          <br />
          Check-out: 11:00 a.m.
        </>,
        "Early access and late departure are subject to availability and prior authorization. Access and arrival instructions will be provided to the guest before their stay.",
      ],
    },
    {
      heading: "6. USE OF THE PROPERTY",
      lines: [
        "The guest must use the property responsibly and exclusively for lodging purposes.",
        "The following is not allowed:",
        "· Exceeding the authorized capacity.",
        "· Organizing parties, events or gatherings.",
        "· Carrying out illegal activities.",
        "· Damaging or altering the property, furniture or facilities.",
        "· Causing serious disturbance to neighbors or third parties.",
        "· Smoking inside the houses.",
        "Children must remain under adult supervision, especially in the pool and outdoor areas. The guest will be responsible for any damage or extraordinary cleaning caused by pets.",
      ],
    },
    {
      heading: "7. DAMAGES AND SECURITY DEPOSIT",
      lines: [
        "The guest will be responsible for damage caused to the property, furniture, facilities, equipment or accessories by themselves, their companions, visitors or pets.",
      ],
    },
    {
      heading: "8. POOL AND SAFETY",
      lines: [
        "Each property has a private pool. Use of the pool and outdoor areas is the guest's responsibility. Minors must remain under adult supervision. Casa Zii does not have permanent staff on the properties.",
      ],
    },
    {
      heading: "9. SERVICES AND INTERRUPTIONS",
      lines: [
        "Casa Zii will endeavor to keep the services and amenities published for each property available. Some services depend on external providers and may be affected by technical causes, maintenance, force majeure or circumstances beyond Casa Zii's reasonable control. In these cases, Casa Zii will endeavor to inform the guest where appropriate.",
      ],
    },
    {
      heading: "10. PERSONAL ITEMS AND INVOICING",
      lines: [
        "The guest is responsible for their personal belongings. Casa Zii will not be liable for forgotten or lost items, except in the cases provided for by applicable law.",
        <>Invoice requests must be sent to: {EMAIL}</>,
        "The request must be made within the same month in which the payment was made or the service was provided, and must include the corresponding tax information.",
      ],
    },
    {
      heading: "11. DATA PROTECTION",
      lines: [
        <>
          Guests' personal data will be processed in accordance with the Casa Zii Privacy Notice, available at:{" "}
          <Link href="/aviso-de-privacidad" className="underline hover:opacity-70">Privacy Notice</Link>
        </>,
        "Casa Zii uses Guesty for reservation management and Stripe for payment processing. These providers also have their own terms and privacy policies.",
      ],
    },
    {
      heading: "12. MODIFICATIONS AND GOVERNING LAW",
      lines: [
        "Casa Zii may update these Terms and Conditions when there are changes in its services, operations, technology or applicable legislation. The conditions applicable to a reservation will be those in force at the time of contracting, except for modifications required by law. These Terms are governed by the applicable laws of Mexico.",
      ],
    },
    {
      heading: "CONTACT",
      lines: [
        <>
          ● CASA Zii CAMPECHE  ▲ CASA Zii PALMAS
          <br />
          ZICATELA HOSPITALITY GROUP, S.A. DE C.V.
        </>,
        <>
          Avenida Cuauhtémoc 55, interior 304
          <br />
          Colonia Roma Norte, Alcaldía Cuauhtémoc
          <br />
          Mexico City, C.P. 06700
        </>,
        <>
          Email: {EMAIL}
          <br />
          Phone: 33 1432 4309
        </>,
        "By making a reservation and/or making the corresponding payment, the guest acknowledges having had access to these Terms and Conditions and accepts the conditions applicable to their stay.",
      ],
    },
  ],
  closing: "Casa Zii is the perfect retreat to leave the city behind, reconnect with nature, and fully embrace every moment.",
};

export default function TerminosContent() {
  return <LegalPage photo={{ src: "/figma/latest/terms-photo.jpg", alt: "Casa Zii" }} content={{ es, en }} />;
}
