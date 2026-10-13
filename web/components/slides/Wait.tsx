"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SlideHead, { Term } from "../ui/SlideHead";
import Phone from "../ui/Phone";
import { useSlide } from "../DeckContext";

const LANES = [
  { key: "meta", label: "Meta do Google", target: 2.5, tone: "good" },
  { key: "hoje", label: "Cambio Fénix hoje", target: 4.5, tone: "bad" },
] as const;

const fmt = (s: number) => s.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export default function Wait() {
  const { isActive } = useSlide();
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const autoplayed = useRef(false);
  const frame = useRef(0);

  const done = elapsed >= LANES[LANES.length - 1].target;

  const run = useCallback(() => {
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    setElapsed(0);
    setRunning(true);
    const tick = (now: number) => {
      const s = (now - start) / 1000;
      setElapsed(s);
      if (s < LANES[LANES.length - 1].target + 0.05) frame.current = requestAnimationFrame(tick);
      else setRunning(false);
    };
    frame.current = requestAnimationFrame(tick);
  }, []);

  // Roda sozinho na primeira vez que o slide aparece
  useEffect(() => {
    if (!isActive || autoplayed.current) return;
    autoplayed.current = true;
    const t = setTimeout(run, 900);
    return () => clearTimeout(t);
  }, [isActive, run]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <div className="frame frame--split frame--wait">
      <div className="split__text">
        <SlideHead num="03" label="Sinta a espera" />
        <h2 className="h2" data-reveal>
          Dois segundos <em>parecem pouco.</em>
          <br />
          No celular, não são.
        </h2>
        <p className="lead" data-reveal>
          O mesmo toque no anúncio, dois celulares. À esquerda, o tempo que o Google considera bom. À direita,
          o tempo médio medido em <strong>visitantes reais</strong> do site.
        </p>
        <div className="wait__actions" data-reveal>
          <motion.button
            type="button"
            className="btn"
            onClick={run}
            disabled={running}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="btn__icon" aria-hidden>
              {done ? "↻" : "☝"}
            </span>
            {running ? "Carregando…" : done ? "Repetir" : "Tocar no anúncio"}
          </motion.button>
          <Term>LCP · 4,5 s (visitantes reais)</Term>
        </div>
        <p className="note" data-reveal>
          Num teste do Google com celular simulado em 4G lenta, o conteúdo principal levou <strong>14 segundos</strong>.
        </p>
      </div>

      <div className="wait__stage" data-reveal>
        {LANES.map((lane) => {
          const loaded = elapsed >= lane.target;
          const shown = Math.min(elapsed, lane.target);
          return (
            <figure key={lane.key} className={`wait__lane is-${lane.tone}${loaded ? " is-done" : ""}`}>
              <Phone loaded={loaded} progress={Math.min(0.92, elapsed / lane.target)} />
              <figcaption>
                <span className="label">{lane.label}</span>
                <span className="wait__timer" aria-hidden>
                  {fmt(shown)}
                  <small>s</small>
                </span>
                <AnimatePresence>
                  {loaded && (
                    <motion.span
                      className="wait__check"
                      initial={{ scale: 0, rotate: -40 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 18 }}
                    >
                      abriu
                    </motion.span>
                  )}
                </AnimatePresence>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
