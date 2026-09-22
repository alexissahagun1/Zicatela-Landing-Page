const BREVO_API_URL = "https://api.brevo.com/v3/contacts";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);

  if (!apiKey || !Number.isInteger(listId) || listId < 1) {
    return Response.json(
      { code: "not_configured" },
      { status: 503 },
    );
  }

  let payload: { email?: unknown; consent?: unknown };

  try {
    payload = (await request.json()) as { email?: unknown; consent?: unknown };
  } catch {
    return Response.json({ code: "invalid_request" }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const consent = payload.consent === true;

  if (!isValidEmail(email)) {
    return Response.json({ code: "invalid_email" }, { status: 400 });
  }

  if (!consent) {
    return Response.json({ code: "consent_required" }, { status: 400 });
  }

  try {
    const brevoResponse = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: false,
      }),
    });

    if (brevoResponse.ok) {
      return Response.json({ ok: true }, { status: 201 });
    }

    const brevoError = (await brevoResponse.json().catch(() => null)) as
      | { code?: string }
      | null;

    if (brevoError?.code === "duplicate_parameter") {
      return Response.json({ ok: true, alreadySubscribed: true });
    }

    return Response.json({ code: "provider_error" }, { status: 502 });
  } catch {
    return Response.json({ code: "provider_unavailable" }, { status: 502 });
  }
}
