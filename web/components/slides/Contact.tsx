"use client";

import { useState } from "react";
import { motion } from "motion/react";
import SlideHead, { Term } from "../ui/SlideHead";

const versions = {
  hoje: { label: "Como está", ratio: 2.1, text: "#ffffff" },
  ajuste: { label: "Sugestão", ratio: 8.7, text: "#17130e" },
} as const;

type Key = keyof typeof versions;

const MIN = 4.5;
const SCALE = 10;

export default function Contact() {
  const [version, setVersion] = useState<Key>("hoje");
  const [sun, setSun] = useState(false);
  const v = versions[version];
  const ok = v.ratio >= MIN;

  return (
    <div className="frame frame--split frame--contact">
      <div className="split__text">
        <SlideHead num="08" label="O botão de contato" />
        <h2 className="h2" data-reveal>
          O botão mais importante <em>é o mais difícil de ler.</em>
        </h2>
        <p className="lead" data-reveal>
          “CONTACTO” leva direto ao WhatsApp — é para onde vai quem chega pelo anúncio. Texto branco sobre
          dourado tem contraste de <strong>2,1 para 1</strong>. O mínimo recomendado é 4,5.
        </p>
        <ul className="also" data-reveal>
          <li>Áreas de toque pequenas ou muito próximas</li>
          <li>Títulos fora de ordem, o que confunde leitores de tela</li>
          <li>Atalhos de navegação por teclado que não funcionam</li>
        </ul>
        <div data-reveal>
          <Term>Acessibilidade 90/100 · contraste insuficiente</Term>
        </div>
      </div>

      <div className="contact" data-reveal>
        <div className={`contact__stage${sun ? " is-sun" : ""}`}>
          <span className="contact__glare" aria-hidden />
          <motion.span
            className="contact__btn"
            animate={{ color: v.text }}
            transition={{ duration: 0.5 }}
            aria-hidden
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
              <path d="M8 13V7.5a1.5 1.5 0 013 0V12m0-1.5a1.5 1.5 0 013 0V12m0-.5a1.5 1.5 0 013 0V15a5 5 0 01-5 5h-1.2a5 5 0 01-3.9-1.9L4.6 15.4a1.5 1.5 0 012.3-1.9L8 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            CONTACTO
          </motion.span>
        </div>

        <div className="contact__controls">
          <div className="segmented" role="radiogroup" aria-label="Versão do botão" data-pos={version === "hoje" ? 0 : 1}>
            <span className="segmented__thumb" aria-hidden />
            {(Object.keys(versions) as Key[]).map((k) => (
              <button
                key={k}
                type="button"
                role="radio"
                aria-checked={version === k}
                className={version === k ? "is-on" : undefined}
                onClick={() => setVersion(k)}
              >
                <span>{versions[k].label}</span>
              </button>
            ))}
          </div>
          <button type="button" role="switch" aria-checked={sun} className={`switch${sun ? " is-on" : ""}`} onClick={() => setSun((s) => !s)}>
            <span className="switch__knob" aria-hidden>
              <span />
            </span>
            Ver sob o sol
          </button>
        </div>

        <div className={`ratio${ok ? " is-ok" : " is-bad"}`}>
          <div className="ratio__head">
            <span className="label">Contraste</span>
            <motion.strong key={version} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              {v.ratio.toLocaleString("pt-BR")} : 1
            </motion.strong>
          </div>
          <div className="ratio__track" aria-hidden>
            <motion.span
              className="ratio__fill"
              animate={{ scaleX: Math.min(v.ratio, SCALE) / SCALE }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
            />
            <span className="ratio__min" style={{ left: `${(MIN / SCALE) * 100}%` }}>
              <span className="label">mínimo 4,5</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
