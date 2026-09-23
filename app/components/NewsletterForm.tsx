"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type SubmissionState = "idle" | "submitting" | "success" | "error";

const copy = {
  es: {
    description:
      "Recibe de vez en cuando novedades, experiencias y beneficios especiales de Casa Zii directamente en tu correo.",
    emailLabel: "Tu correo electrónico",
    emailPlaceholder: "Ingresa tu E-mail",
    consent:
      "Quiero recibir novedades y beneficios especiales de Casa Zii. Puedes cancelar en cualquier momento",
    submit: "Suscribirme al newsletter",
    submitting: "Enviando…",
    success: "Listo. Revisa tu correo para confirmar la suscripción.",
    alreadySubscribed: "Este correo ya está suscrito.",
    error: "No pudimos completar la suscripción. Intenta de nuevo.",
    invalidEmail: "Ingresa un correo electrónico válido.",
    consentRequired: "Acepta recibir noticias y ofertas para continuar.",
    notConfigured: "El newsletter todavía no está conectado a Brevo.",
  },
  en: {
    description:
      "Receive Casa Zii news, experiences and special benefits in your inbox from time to time.",
    emailLabel: "Your email address",
    emailPlaceholder: "Enter your E-mail",
    consent:
      "I want to receive news and special benefits from Casa Zii. You can unsubscribe at any time",
    submit: "Subscribe to the newsletter",
    submitting: "Sending…",
    success: "Done. Check your inbox to confirm your subscription.",
    alreadySubscribed: "This email is already subscribed.",
    error: "We couldn’t complete the subscription. Please try again.",
    invalidEmail: "Enter a valid email address.",
    consentRequired: "Please consent to receive news and offers to continue.",
    notConfigured: "The newsletter is not connected to Brevo yet.",
  },
} as const;

export default function NewsletterForm() {
  const { language } = useLanguage();
  const t = copy[language];
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setState("error");
      setMessage(t.invalidEmail);
      return;
    }

    if (!consent) {
      setState("error");
      setMessage(t.consentRequired);
      return;
    }

    setState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, consent }),
      });
      const result = (await response.json().catch(() => null)) as
        | { code?: string; alreadySubscribed?: boolean }
        | null;

      if (!response.ok) {
        setState("error");
        setMessage(result?.code === "not_configured" ? t.notConfigured : t.error);
        return;
      }

      setState("success");
      setMessage(result?.alreadySubscribed ? t.alreadySubscribed : t.success);
    } catch {
      setState("error");
      setMessage(t.error);
    }
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative mx-auto h-auto w-full max-w-[685px] md:h-[155px]"
    >
      <p
        id="newsletter-heading"
        className="mx-auto max-w-[606px] text-center font-[family-name:var(--font-courier)] text-[15px] leading-[25px] text-black"
      >
        {t.description}
      </p>

      <form onSubmit={handleSubmit} className="mt-[28px]" noValidate>
        <div className="relative border-b border-[#222222]">
          <label
            htmlFor="newsletter-email"
            className="sr-only"
          >
            {t.emailLabel}
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t.emailPlaceholder}
            className="h-[30px] w-full bg-transparent pr-12 font-[family-name:var(--font-courier)] text-[14px] leading-[30px] text-black outline-none placeholder:text-black placeholder:opacity-100 focus-visible:ring-2 focus-visible:ring-[#222222] focus-visible:ring-offset-2 focus-visible:ring-offset-[#eaeaea]"
            aria-invalid={state === "error" || undefined}
            aria-describedby="newsletter-consent newsletter-status"
            disabled={state === "submitting"}
          />
          <button
            type="submit"
            aria-label={state === "submitting" ? t.submitting : t.submit}
            disabled={state === "submitting"}
            className="absolute bottom-[-1px] right-0 flex h-[31px] w-10 items-center justify-center font-[family-name:var(--font-courier)] text-[32px] leading-[30px] text-black transition-opacity hover:opacity-60 disabled:cursor-wait disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222]"
          >
            →
          </button>
        </div>

        <label
          htmlFor="newsletter-consent"
          className="mt-[6px] flex cursor-pointer items-start gap-[12px] font-[family-name:var(--font-courier)] text-[11px] leading-[26px] text-black"
        >
          <input
            id="newsletter-consent"
            name="consent"
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="mt-[6px] h-[13px] w-[13px] shrink-0 appearance-none border border-[#222222] bg-transparent checked:bg-[#222222] checked:shadow-[inset_0_0_0_2px_#eaeaea] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222]"
            disabled={state === "submitting"}
          />
          <span id="newsletter-consent">{t.consent}</span>
        </label>

        <p
          id="newsletter-status"
          role="status"
          aria-live="polite"
          className={`absolute left-0 top-full min-h-[20px] pt-1 font-[family-name:var(--font-courier)] text-[11px] leading-4 ${
            state === "success" ? "text-[#245b38]" : "text-[#8a2c2c]"
          }`}
        >
          {message}
        </p>
      </form>
    </section>
  );
}
