"use client";

import { motion } from "motion/react";
import SlideHead from "../ui/SlideHead";
import { useSlide } from "../DeckContext";

type Vital = {
  q: string;
  plain: string;
  value: number;
  display: string;
  good: number;
  poor: number;
  max: number;
  goal: string;
  term: string;
};

const vitals: Vital[] = [
  {
    q: "Quanto demora para aparecer o que importa?",
    plain: "Tempo até a imagem ou o texto principal surgir na tela.",
    value: 4.5,
    display: "4,5 s",
    good: 2.5,
    poor: 4,
    max: 6,
    goal: "bom: até 2,5 s",
    term: "LCP",
  },
  {
    q: "Quando a pessoa toca, a tela responde rápido?",
    plain: "Tempo entre tocar num botão e ver alguma reação.",
    value: 0.274,
    display: "0,27 s",
    good: 0.2,
    poor: 0.5,
    max: 0.6,
    goal: "bom: até 0,2 s",
    term: "INP",
  },
  {
    q: "A tela fica parada ou pula enquanto carrega?",
    plain: "Nota de “pulos” na tela — quanto menor, melhor.",
    value: 0.06,
    display: "0,06",
    good: 0.1,
    poor: 0.25,
    max: 0.3,
    goal: "bom: até 0,1",
    term: "CLS",
  },
];

const statusOf = (v: Vital) => (v.value <= v.good ? "good" : v.value <= v.poor ? "mid" : "bad");
const statusLabel = { good: "Bom", mid: "Precisa melhorar", bad: "Ruim" } as const;

export default function Vitals() {
  const { seen } = useSlide();

  return (
    <div className="frame">
      <SlideHead num="04" label="As três perguntas do Google" />
      <h2 className="h2" data-reveal>
        Para passar, as três respostas <em>precisam estar no verde.</em>
      </h2>

      <ul className="vitals">
        {vitals.map((v, i) => {
          const status = statusOf(v);
          const pct = (x: number) => `${(Math.min(x, v.max) / v.max) * 100}%`;
          return (
            <li key={v.term} className={`vital is-${status}`} data-reveal>
              <div className="vital__copy">
                <strong className="vital__q">{v.q}</strong>
                <span className="vital__plain">{v.plain}</span>
              </div>
              <div className="vital__meter">
                <div className="vital__scale" aria-hidden>
                  <span className="z-good" style={{ width: pct(v.good) }} />
                  <span className="z-mid" style={{ width: `calc(${pct(v.poor)} - ${pct(v.good)})` }} />
                  <span className="z-bad" />
                  <motion.span
                    className="vital__marker"
                    initial={false}
                    animate={{ left: seen ? pct(v.value) : "0%" }}
                    transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.5 + i * 0.25 }}
                  />
                </div>
                <div className="vital__legend">
                  <span className="label">{v.goal}</span>
                  <span className="label">{v.term}</span>
                </div>
              </div>
              <div className="vital__value">
                <strong>{v.display}</strong>
                <span className={`pill pill--${status}`}>{statusLabel[status]}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
