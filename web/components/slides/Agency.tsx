"use client";

import { motion } from "motion/react";
import SlideHead from "../ui/SlideHead";
import { useSlide } from "../DeckContext";

const asks = [
  {
    title: "Dizer quais páginas recebem tráfego pago",
    body: "A auditoria olhou só a página inicial. Outras páginas de destino podem ter problemas diferentes.",
  },
  {
    title: "Anotar os números de hoje",
    body: "Custo por conversa no WhatsApp, taxa de rejeição das visitas pagas e a nota de “Experiência na página de destino” no Google Ads.",
  },
  {
    title: "Avaliar a verba desta página",
    body: "Considerar segurar aumentos de investimento para esta página até a primeira etapa do plano estar no ar.",
  },
  {
    title: "Comparar antes e depois",
    body: "Os dados de visitantes reais do Google levam 28 dias para refletir as mudanças. Vale combinar a data da próxima leitura.",
  },
];

export default function Agency() {
  const { seen } = useSlide();

  return (
    <div className="frame frame--split frame--agency">
      <div className="split__text">
        <SlideHead num="11" label="Próximos passos" />
        <h2 className="h2" data-reveal>
          Onde a agência <em>entra no jogo.</em>
        </h2>
        <p className="lead" data-reveal>
          A correção é técnica, mas o resultado aparece nas campanhas. Quatro combinados para medir o ganho de
          verdade.
        </p>
      </div>
      <ol className="asks">
        {asks.map((a, i) => (
          <li key={a.title} className="ask" data-reveal>
            <span className="ask__box" aria-hidden>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <motion.path
                  d="M5 12.5l4.5 4.5L19 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={false}
                  animate={{ pathLength: seen ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.25, ease: "easeOut" }}
                />
              </svg>
            </span>
            <div>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
