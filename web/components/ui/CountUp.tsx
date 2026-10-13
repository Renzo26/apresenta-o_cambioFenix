"use client";

import { useEffect, useRef } from "react";
import { animate } from "motion/react";

type Props = {
  to: number;
  run: boolean;
  decimals?: number;
  duration?: number;
  delay?: number;
};

/** Número que conta do zero ao valor quando `run` fica verdadeiro. Formato pt-BR. */
export default function CountUp({ to, run, decimals = 0, duration = 1.6, delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (v: number) =>
    v.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!run) {
      el.textContent = fmt(0);
      return;
    }
    const controls = animate(0, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = fmt(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run, to]);

  return <span ref={ref}>{fmt(to)}</span>;
}
