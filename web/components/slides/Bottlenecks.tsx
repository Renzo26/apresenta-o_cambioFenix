"use client";

import { motion } from "motion/react";
import SlideHead, { Source } from "../ui/SlideHead";

const scenes = [
  {
    n: "01",
    title: "As letras chegam por último",
    body: "O site usa fontes personalizadas. Até elas chegarem, o texto pode ficar invisível — uma vitrine com as etiquetas cobertas.",
    figure: "até 3,0 s",
    term: "Exibição de fontes",
    icon: "M5 19L10.5 5h3L19 19M7.5 13.5h9",
  },
  {
    n: "02",
    title: "Fila na porta",
    body: "Antes de desenhar a tela, o celular precisa baixar vários arquivos. Ninguém entra na loja até o último da fila passar.",
    figure: "até 2,2 s",
    term: "Solicitações que bloqueiam a renderização",
    icon: "M4 12h3M9 12h3M14 12h3M19 12h1M4 7h16M4 17h16",
  },
  {
    n: "03",
    title: "Bagagem extra",
    body: "Código, estilos e imagens além do necessário para a primeira tela. Só de código sem uso, quase meio megabyte.",
    figure: "491 KB",
    term: "JavaScript e CSS não usados · imagens",
    icon: "M6 8h12l-1 12H7L6 8zM9 8V5h6v3",
  },
  {
    n: "04",
    title: "Atendimento demorado",
    body: "O servidor leva tempo para começar a responder: o garçom demora a anotar o pedido antes de a cozinha começar.",
    figure: "3,0 s",
    term: "Tempo até o primeiro byte (visitantes reais)",
    icon: "M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z",
  },
];

export default function Bottlenecks() {
  return (
    <div className="frame">
      <SlideHead num="07" label="Onde o tempo se perde" />
      <h2 className="h2" data-reveal>
        Quatro gargalos, <em>em quatro cenas.</em>
      </h2>
      <div className="cards cards--4">
        {scenes.map((s) => (
          <div key={s.n} className="cards__cell" data-reveal>
          <motion.article
            className="card card--scene"
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <div className="card__top">
              <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
                <path d={s.icon} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="card__figure">{s.figure}</span>
            </div>
            <h3>
              <span className="label">{s.n}</span> {s.title}
            </h3>
            <p>{s.body}</p>
            <span className="card__term">{s.term}</span>
          </motion.article>
          </div>
        ))}
      </div>
      <Source>Tempos estimados pelo Google. Eles se sobrepõem e não devem ser somados.</Source>
    </div>
  );
}
