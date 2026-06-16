import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, projectType, budget, message } = body;

    if (!name || !email || !projectType || !budget || !message) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }

    // If RESEND_API_KEY is set, send via Resend; otherwise log to console.
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL ?? "hello@fovea-agency.be";

    if (apiKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Fovea Site <onboarding@resend.dev>",
          to: toEmail,
          subject: `Nouveau devis — ${name} (${projectType})`,
          html: `
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Téléphone :</strong> ${phone || "—"}</p>
            <p><strong>Type de projet :</strong> ${projectType}</p>
            <p><strong>Budget estimé :</strong> ${budget}</p>
            <hr />
            <p><strong>Message :</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Resend error:", err);
        return NextResponse.json({ error: "Erreur d'envoi." }, { status: 500 });
      }
    } else {
      console.log("Contact form submission:", { name, email, phone, projectType, budget, message });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
