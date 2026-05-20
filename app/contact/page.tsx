"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", phone: "", projectType: "", budget: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    background: "oklch(0.10 0 0)",
    border: "1px solid oklch(0.22 0 0)",
    color: "oklch(0.96 0 0)",
  };

  const inputClass =
    "w-full font-sora font-light text-sm rounded-xl px-4 py-3 focus:outline-none transition-colors placeholder:text-[oklch(0.32_0.007_60)]";

  return (
    <main className="pt-[52px]" style={{ background: "oklch(0.06 0 0)" }}>
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p
                className="font-mono text-[10px] uppercase tracking-wider mb-4"
                style={{ color: "oklch(0.38 0 0)" }}
              >
                Parlons de votre projet
              </p>
              <h1
                className="font-sora font-thin tracking-tighter mb-6"
                style={{
                  fontSize: "clamp(36px, 5vw, 60px)",
                  letterSpacing: "-0.04em",
                  color: "oklch(0.96 0 0)",
                }}
              >
                Demander un devis
              </h1>
              <p
                className="font-sora font-light text-sm leading-relaxed mb-10"
                style={{ color: "oklch(0.45 0 0)" }}
              >
                Remplissez le formulaire et nous vous recontactons sous 24h ouvrées.
                Chaque projet est unique — nous adaptons notre offre à vos objectifs.
              </p>

              <div className="flex flex-col gap-5">
                {[
                  { label: "Belgique", value: "+32 2 000 00 00" },
                  { label: "France", value: "+33 1 00 00 00 00" },
                  { label: "Email", value: "hello@nova-agency.be" },
                ].map((item) => (
                  <div key={item.label}>
                    <p
                      className="font-mono text-[9px] uppercase tracking-wider mb-1"
                      style={{ color: "oklch(0.38 0 0)" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="font-sora font-light text-sm"
                      style={{ color: "oklch(0.65 0 0)" }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                    style={{ background: "oklch(0.96 0 0)", border: "1px solid oklch(0.96 0 0)" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M4 10L8.5 14.5L16 6"
                        stroke="oklch(0.96 0 0)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h2
                    className="font-sora font-light text-2xl mb-3"
                    style={{ color: "oklch(0.96 0 0)" }}
                  >
                    Message envoyé
                  </h2>
                  <p
                    className="font-sora font-light text-sm"
                    style={{ color: "oklch(0.45 0 0)" }}
                  >
                    Nous vous recontactons sous 24h ouvrées.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Nom complet"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                      style={inputStyle}
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Téléphone (optionnel)"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputStyle}
                  />
                  <select
                    name="projectType"
                    required
                    value={form.projectType}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none`}
                    style={inputStyle}
                  >
                    <option value="" disabled>Type de projet</option>
                    <option value="video">Production Vidéo Publicitaire</option>
                    <option value="ads">Campagnes Publicitaires Ads</option>
                    <option value="ia">Agents IA (via Qwillio)</option>
                    <option value="pack">Pack complet (Vidéo + Ads)</option>
                    <option value="autre">Autre</option>
                  </select>
                  <select
                    name="budget"
                    required
                    value={form.budget}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none`}
                    style={inputStyle}
                  >
                    <option value="" disabled>Budget estimé</option>
                    <option value="<5k">Moins de 5 000 €</option>
                    <option value="5-15k">5 000 — 15 000 €</option>
                    <option value="15-30k">15 000 — 30 000 €</option>
                    <option value="30k+">Plus de 30 000 €</option>
                  </select>
                  <textarea
                    name="message"
                    required
                    placeholder="Décrivez votre projet..."
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                  />
                  {status === "error" && (
                    <p className="font-sora font-light text-xs text-red-400">
                      Une erreur est survenue. Veuillez réessayer.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center rounded-full font-sora font-medium text-sm px-6 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: "oklch(0.96 0 0)",
                      color: "oklch(0.06 0 0)",
                    }}
                  >
                    {status === "sending" ? "Envoi en cours..." : "Envoyer le message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
