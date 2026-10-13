"use client";

import { motion } from "motion/react";
import SlideHead, { Source, Term } from "../ui/SlideHead";
import CountUp from "../ui/CountUp";
import { useSlide } from "../DeckContext";

const R = 120;
const ARC = Math.PI * R; // semicírculo

export default function Verdict() {
  const { seen } = useSlide();
  const score = 59;

  return (
    <div className="frame frame--split">
      <div className="split__text">
        <SlideHead num="02" label="O veredito" />
        <h2 className="h2" data-reveal>
          O Google avaliou o site no celular.
          <br />
          <em>Reprovado.</em>
        </h2>
        <p className="lead" data-reveal>
          Durante 28 dias, o Google acompanha como o site se comporta no celular de visitantes reais. Esse
          teste — chamado <strong>Core Web Vitals</strong> — faz parte de como ele avalia a experiência de uma
          página.
        </p>
        <div data-reveal>
          <Term>Core Web Vitals: reprovado · Desempenho: 59/100</Term>
        </div>
      </div>

      <figure className="verdict" data-reveal>
        <div className="verdict__dial">
          <svg viewBox="0 0 300 170" aria-hidden>
            <path className="verdict__zone verdict__zone--bad" d={arcPath(0, 0.49)} />
            <path className="verdict__zone verdict__zone--mid" d={arcPath(0.5, 0.89)} />
            <path className="verdict__zone verdict__zone--good" d={arcPath(0.9, 1)} />
            <motion.path
              className="verdict__value"
              d={arcPath(0, 1)}
              strokeDasharray={ARC}
              initial={false}
              animate={{ strokeDashoffset: seen ? ARC * (1 - score / 100) : ARC }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
          </svg>
          <div className="verdict__score">
            <strong>
              <CountUp to={score} run={seen} delay={0.3} duration={1.8} />
            </strong>
            <span>de 100</span>
          </div>
        </div>
        <figcaption>
          <span className="label">Nota de velocidade no celular</span>
          <ul className="verdict__legend">
            <li className="is-bad">0–49 ruim</li>
            <li className="is-mid">50–89 precisa melhorar</li>
            <li className="is-good">90–100 bom</li>
          </ul>
        </figcaption>
        <motion.div
          className="stamp"
          initial={false}
          animate={seen ? { scale: 1, opacity: 1, rotate: -8 } : { scale: 1.8, opacity: 0, rotate: -2 }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 1.5 }}
        >
          Reprovado
        </motion.div>
      </figure>

      <Source>Fonte: Google PageSpeed Insights · cambiofenix.com · celular · 13/10/2026</Source>
    </div>
  );
}

function arcPath(from: number, to: number) {
  const cx = 150;
  const cy = 150;
  const a0 = Math.PI * (1 - from);
  const a1 = Math.PI * (1 - to);
  const x0 = cx + R * Math.cos(a0);
  const y0 = cy - R * Math.sin(a0);
  const x1 = cx + R * Math.cos(a1);
  const y1 = cy - R * Math.sin(a1);
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${R} ${R} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}
