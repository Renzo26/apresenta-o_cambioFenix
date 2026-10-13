"use client";

import { motion } from "motion/react";
import SlideHead from "../ui/SlideHead";
import CountUp from "../ui/CountUp";
import { useSlide } from "../DeckContext";

const scores = [
  { name: "SEO", value: 100, note: "O Google entende bem o conteúdo" },
  { name: "Boas práticas", value: 96, note: "Segurança e padrões em dia" },
  { name: "Acessibilidade", value: 90, note: "Boa, com ajustes pontuais" },
  { name: "Velocidade", value: 59, note: "Aqui está o problema", focus: true },
];

const R = 44;
const C = 2 * Math.PI * R;

export default function Strengths() {
  const { seen } = useSlide();

  return (
    <div className="frame">
      <SlideHead num="09" label="O que já funciona" />
      <h2 className="h2" data-reveal>
        Nem tudo é problema. <em>A base é boa.</em>
      </h2>
      <ul className="rings">
        {scores.map((s, i) => (
          <li key={s.name} className={`ring${s.focus ? " is-focus" : ""}`} data-reveal>
            <div className="ring__dial">
              <svg viewBox="0 0 100 100" aria-hidden>
                <circle cx="50" cy="50" r={R} className="ring__track" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r={R}
                  className="ring__value"
                  strokeDasharray={C}
                  transform="rotate(-90 50 50)"
                  initial={false}
                  animate={{ strokeDashoffset: seen ? C * (1 - s.value / 100) : C }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 + i * 0.12 }}
                />
              </svg>
              <strong>
                <CountUp to={s.value} run={seen} delay={0.4 + i * 0.12} />
              </strong>
            </div>
            <span className="ring__name">{s.name}</span>
            <span className="ring__note">{s.note}</span>
          </li>
        ))}
      </ul>
      <p className="lead" data-reveal>
        O problema está concentrado em um ponto: <strong>velocidade no celular</strong>. Isso deixa claro onde
        investir o esforço.
      </p>
    </div>
  );
}
