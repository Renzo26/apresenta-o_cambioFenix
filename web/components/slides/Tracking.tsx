"use client";

import { motion } from "motion/react";
import SlideHead, { Source } from "../ui/SlideHead";
import { useSlide } from "../DeckContext";

const SCALE = 20; // segundos representados na linha do tempo
const BLIND_UNTIL = 14.2;

const events = [
  { t: 2.9, label: "Primeiro conteúdo aparece na tela", kind: "neutral", low: true, right: false },
  { t: 14.2, label: "Google Ads registra o clique", kind: "track", low: true, right: true },
  { t: 14.5, label: "Google Analytics registra a visita", kind: "track", low: false, right: true },
  { t: 17.8, label: "Pixel da Meta dispara", kind: "track", low: false, right: true },
];

const fmt = (n: number) => n.toLocaleString("pt-BR", { minimumFractionDigits: 1 });
const pct = (t: number) => `${(t / SCALE) * 100}%`;
const DURATION = 3.2;

export default function Tracking() {
  const { seen } = useSlide();

  return (
    <div className="frame frame--tracking">
      <SlideHead num="05" label="Rastreamento" />
      <h2 className="h2 h2--wide" data-reveal>
        O Analytics só fica sabendo da visita <em>aos 14 segundos.</em>
      </h2>
      <p className="lead lead--wide" data-reveal>
        Os códigos de rastreamento estão no fim de uma página de 1,1 MB e só rodam quando ela termina de chegar.
        Quem desiste antes clicou, foi cobrado — <strong>e não aparece em nenhum relatório.</strong>
      </p>

      <div className="timeline" data-reveal>
        <div className="timeline__track" aria-hidden>
          <span className="timeline__blind" style={{ width: pct(BLIND_UNTIL) }}>
            <span className="label">Zona invisível: quem sai aqui não é contado</span>
          </span>
          <motion.span
            className="timeline__fill"
            initial={false}
            animate={{ scaleX: seen ? 1 : 0 }}
            transition={{ duration: DURATION, ease: "linear", delay: 0.6 }}
          />
          {[0, 5, 10, 15, 20].map((s) => (
            <span key={s} className="timeline__tick" style={{ left: pct(s) }}>
              <span>{s} s</span>
            </span>
          ))}
        </div>

        <ol className="timeline__events">
          {events.map((e) => (
            <motion.li
              key={e.label}
              className={`timeline__event is-${e.kind}${e.low ? " is-low" : ""}${e.right ? " is-right" : ""}`}
              style={{ "--x": pct(e.t) } as React.CSSProperties}
              initial={false}
              animate={seen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.6 + (e.t / SCALE) * DURATION }}
            >
              <span className="timeline__dot" aria-hidden />
              <strong>{fmt(e.t)} s</strong>
              <span>{e.label}</span>
            </motion.li>
          ))}
        </ol>
      </div>

      <div className="tracking__notes" data-reveal>
        <p>
          <span className="label">Para a agência</span>
          Custo por resultado, taxa de conversão e públicos de remarketing são calculados só sobre quem esperou
          a página carregar.
        </p>
        <p>
          <span className="label">Correção</span>
          Carregar o Tag Manager no início da página, como o Google recomenda. É um ajuste pontual, que não
          depende do resto da otimização.
        </p>
      </div>

      <Source>
        Medição própria, 13/10/2026: Chrome simulando celular em 4G lenta (mesmas condições do teste do Google),
        3 execuções com resultados praticamente idênticos.
      </Source>
    </div>
  );
}
