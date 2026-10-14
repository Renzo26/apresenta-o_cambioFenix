"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Phone from "../ui/Phone";

const TICKS = 60;

export default function Cover() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(".cover__line", { yPercent: 110, duration: 1.4, stagger: 0.09 })
          .from(".cover [data-intro]", { y: 24, autoAlpha: 0, duration: 1.1, stagger: 0.08 }, "-=1.05")
          .from(".cover .phone", { y: 80, rotate: 4, autoAlpha: 0, duration: 1.6 }, 0.2)
          .from(".cover__tick", { autoAlpha: 0, duration: 0.5, stagger: { each: 0.012, from: "start" } }, 0.35)
          .from(".cover__arc", { strokeDashoffset: arc, duration: 2.2, ease: "power3.inOut" }, 0.6)
          .from(".cover__badge", { scale: 0.6, autoAlpha: 0, duration: 1, ease: "back.out(1.8)" }, 1.6);

        gsap.to(".cover__dial", { rotate: 360, duration: 120, repeat: -1, ease: "none" });
        gsap.to(".cover__hint-arrow", { x: 8, duration: 0.9, repeat: -1, yoyo: true, ease: "sine.inOut" });
      });
      return () => mm.revert();
    },
    { scope },
  );

  // 4,5 s num mostrador de 6 s
  const arc = 4.5 / 6;

  return (
    <div className="cover" ref={scope}>
      <div className="cover__text">
        <p className="label cover__kicker" data-intro>
          Diagnóstico de velocidade <i>·</i> Celular <i>·</i> 13 out 2026
        </p>
        <h1 className="display cover__title">
          <span className="cover__mask"><span className="cover__line">O anúncio funciona.</span></span>
          <span className="cover__mask"><span className="cover__line"><em>A porta demora</em></span></span>
          <span className="cover__mask"><span className="cover__line"><em>a abrir.</em></span></span>
        </h1>
        <p className="lead" data-intro>
          Dois problemas no site <strong>cambiofenix.com</strong> que pesam direto nas campanhas: a{" "}
          <strong>velocidade de carregamento</strong> e o <strong>rastreamento</strong> das visitas.
        </p>
        <dl className="cover__meta" data-intro>
          <div>
            <dt className="label">Para</dt>
            <dd>Agência de mídia</dd>
          </div>
          <div>
            <dt className="label">Cliente</dt>
            <dd>Cambio Fénix · Rivera</dd>
          </div>
        </dl>
      </div>

      <div className="cover__visual">
        <svg className="cover__dial" viewBox="0 0 400 400" aria-hidden>
          {Array.from({ length: TICKS }, (_, i) => (
            <line
              key={i}
              className="cover__tick"
              x1="200"
              y1={i % 5 === 0 ? 8 : 14}
              x2="200"
              y2="26"
              transform={`rotate(${(i * 360) / TICKS} 200 200)`}
            />
          ))}
        </svg>
        <svg className="cover__ring" viewBox="0 0 400 400" aria-hidden>
          <circle cx="200" cy="200" r="168" className="cover__track" />
          <circle
            cx="200"
            cy="200"
            r="168"
            className="cover__arc"
            pathLength={1}
            strokeDasharray={`${arc} 2`}
            transform="rotate(-90 200 200)"
          />
        </svg>
        <Phone priority className="cover__phone" />
        <div className="cover__badge">
          <strong>4,5 s</strong>
          <span>até o conteúdo principal aparecer, em média</span>
        </div>
      </div>

      <p className="cover__hint label" data-intro>
        Role, deslize ou use as setas
        <svg className="cover__hint-arrow" viewBox="0 0 24 12" width="28" height="14" aria-hidden>
          <path d="M0 6h22M17 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </p>
    </div>
  );
}
