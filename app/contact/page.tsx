"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

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
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    background: "var(--ink-2)",
    border: "1px solid var(--rule)",
    color: "var(--cream)",
  };

  const inputClass =
    "w-full font-poppins font-normal text-sm rounded-xl px-4 py-3.5 focus:outline-none transition-colors placeholder:text-[#7A6E74]";

  return (
    <main
      className="min-h-dvh flex flex-col items-center justify-center px-5 pt-[88px] pb-16"
      style={{ background: "var(--ink)" }}
    >
      <div className="w-full max-w-lg">
        {status === "sent" ? (
          <motion.div
            className="flex flex-col items-center text-center py-20"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
              style={{ background: "linear-gradient(120deg, var(--sun-1), var(--sun-2))" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10L8.5 14.5L16 6"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2
              className="font-poppins font-bold text-3xl mb-3"
              style={{ letterSpacing: "-0.02em", color: "var(--cream)" }}
            >
              Message envoyé
            </h2>
            <p className="font-poppins font-normal text-sm" style={{ color: "var(--cream-dim)" }}>
              Nous vous recontactons sous 24h ouvrées.
            </p>
          </motion.div>
        ) : (
          <>
            <motion.h1
              className="font-poppins font-extrabold mb-10"
              style={{
                fontSize: "clamp(36px, 6vw, 64px)",
                letterSpacing: "-0.03em",
                color: "var(--cream)",
              }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              Parlons de votre <span className="text-gradient">projet.</span>
            </motion.h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.7, ease }}
              >
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
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.7, ease }}
              >
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
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.20, duration: 0.7, ease }}
              >
                <textarea
                  name="message"
                  required
                  placeholder="Décrivez votre projet..."
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  className={`${inputClass} resize-none`}
                  style={inputStyle}
                />
              </motion.div>

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
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26, duration: 0.7, ease }}
              >
                {status === "sending" ? "Envoi en cours..." : "Envoyer"}
              </motion.button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
