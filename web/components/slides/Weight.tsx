"use client";

import { motion } from "motion/react";
import SlideHead, { Source } from "../ui/SlideHead";
import CountUp from "../ui/CountUp";
import { useSlide } from "../DeckContext";

const TOTAL = 3167;

const extras = [
  { kb: 657, label: "Arquivos que o celular não guarda para a próxima visita" },
  { kb: 491, label: "Código que não é usado nesta página" },
  { kb: 329, label: "Imagens maiores ou mais pesadas que o necessário" },
  { kb: 138, label: "Estilos visuais que não são usados" },
  { kb: 69, label: "Código feito para navegadores antigos" },
];

const kb = (n: number) => n.toLocaleString("pt-BR");

export default function Weight() {
  const { seen } = useSlide();

  return (
    <div className="frame frame--split frame--weight">
      <div className="split__text">
        <SlideHead num="06" label="O peso da página" />
        <h2 className="h2" data-reveal>
          Uma mala de <em>3,1 MB</em> para entregar um bilhete.
        </h2>
        <p className="lead" data-reveal>
          Para mostrar a tela de boas-vindas, o celular baixa 3,1 MB. Em uma conexão 4G fraca, cada pedaço extra
          vira tempo de espera — e consome o pacote de dados do cliente.
        </p>
      </div>

      <div className="weight" data-reveal>
        <div className="weight__total">
          <span className="label">Peso total da página inicial</span>
          <strong>
            <CountUp to={TOTAL} run={seen} duration={1.4} /> <small>KB</small>
          </strong>
          <div className="weight__bar" aria-hidden>
            <motion.span
              initial={false}
              animate={{ scaleX: seen ? 1 : 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        <p className="label weight__sub">O que o Google aponta como evitável</p>
        <ul className="weight__list">
          {extras.map((e, i) => (
            <li key={e.label}>
              <span className="weight__label">{e.label}</span>
              <span className="weight__kb">{kb(e.kb)} KB</span>
              <span className="weight__track" aria-hidden>
                <motion.span
                  initial={false}
                  animate={{ scaleX: seen ? e.kb / TOTAL : 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.6 + i * 0.1 }}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Source>Estimativas do Google. Os itens se sobrepõem em parte e não devem ser somados.</Source>
    </div>
  );
}
