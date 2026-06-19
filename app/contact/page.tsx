"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          projectType: form.subject || "Demande de contact",
          budget: "Non précisé",
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ firstName: "", lastName: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    background: "var(--ink)",
    border: "1px solid var(--rule)",
    color: "var(--cream)",
  };
  const inputClass =
    "w-full font-poppins font-normal text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--sun-2)] transition-colors placeholder:text-[var(--cream-faint)]";
  const labelClass =
    "block font-poppins font-semibold text-[13px] mb-2 text-[var(--cream)]";

  return (
    <main
      className="min-h-dvh flex items-center px-5 pt-[110px] pb-20"
      style={{ background: "var(--ink)" }}
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — heading + details */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <h1
            className="font-poppins font-extrabold leading-[1.02]"
            style={{ fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "-0.03em", color: "var(--cream)" }}
          >
            Contactez<span className="text-gradient">-nous.</span>
          </h1>
          <p
            className="mt-5 max-w-md font-poppins font-normal text-[15px] leading-relaxed"
            style={{ color: "var(--cream-dim)" }}
          >
            Une question, un projet vidéo ou une campagne Ads à lancer&nbsp;? Dites-nous
            comment on peut vous aider — réponse sous 24h ouvrées.
          </p>

          <div className="mt-12">
            <h2
              className="font-poppins font-bold text-lg mb-5"
              style={{ color: "var(--cream)" }}
            >
              Coordonnées
            </h2>
            <ul className="flex flex-col gap-3 font-poppins text-[14px]" style={{ color: "var(--cream-dim)" }}>
              <li>
                <span className="font-semibold text-[var(--cream)]">Email&nbsp;:</span>{" "}
                <a href="mailto:contact@fovea.be" className="underline decoration-[var(--rule)] underline-offset-4 transition-colors hover:text-[var(--sun-1)]">
                  contact@fovea.be
                </a>
              </li>
              <li>
                <span className="font-semibold text-[var(--cream)]">Zones&nbsp;:</span> Belgique · France
              </li>
              <li>
                <span className="font-semibold text-[var(--cream)]">Web&nbsp;:</span>{" "}
                <a href="https://fovea.be" className="underline decoration-[var(--rule)] underline-offset-4 transition-colors hover:text-[var(--sun-1)]">
                  fovea.be
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Right — form card */}
        <motion.div
          className="rounded-[1.75rem] p-7 md:p-9"
          style={{ background: "var(--ink-2)", border: "1px solid var(--rule)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease }}
        >
          {status === "sent" ? (
            <div className="flex flex-col items-center text-center py-16">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                style={{ background: "linear-gradient(120deg, var(--sun-1), var(--sun-2))" }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10L8.5 14.5L16 6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="font-poppins font-bold text-2xl mb-3" style={{ letterSpacing: "-0.02em", color: "var(--cream)" }}>
                Message envoyé
              </h2>
              <p className="font-poppins font-normal text-sm" style={{ color: "var(--cream-dim)" }}>
                Nous vous recontactons sous 24h ouvrées.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="firstName">Prénom</label>
                  <input id="firstName" type="text" name="firstName" required placeholder="Prénom" value={form.firstName} onChange={handleChange} className={inputClass} style={inputStyle} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="lastName">Nom</label>
                  <input id="lastName" type="text" name="lastName" required placeholder="Nom" value={form.lastName} onChange={handleChange} className={inputClass} style={inputStyle} />
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="email">Email</label>
                <input id="email" type="email" name="email" required placeholder="vous@exemple.com" value={form.email} onChange={handleChange} className={inputClass} style={inputStyle} />
              </div>

              <div>
                <label className={labelClass} htmlFor="subject">Sujet</label>
                <input id="subject" type="text" name="subject" placeholder="Sujet" value={form.subject} onChange={handleChange} className={inputClass} style={inputStyle} />
              </div>

              <div>
                <label className={labelClass} htmlFor="message">Message</label>
                <textarea id="message" name="message" required placeholder="Décrivez votre projet..." value={form.message} onChange={handleChange} rows={5} className={`${inputClass} resize-none`} style={inputStyle} />
              </div>

              {status === "error" && (
                <p className="font-poppins font-normal text-xs text-red-400">
                  Une erreur est survenue. Veuillez réessayer.
                </p>
              )}

              <motion.button
                type="submit"
                disabled={status === "sending"}
                className="mt-1 inline-flex items-center justify-center rounded-full font-poppins font-semibold text-sm px-6 py-3.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(120deg, var(--sun-1), var(--sun-2))", color: "#fff", boxShadow: "0 12px 36px rgba(255,61,119,0.32)" }}
                whileTap={{ scale: 0.97 }}
              >
                {status === "sending" ? "Envoi en cours..." : "Envoyer le message"}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}
