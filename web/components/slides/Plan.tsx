import SlideHead from "../ui/SlideHead";

const phases = [
  {
    n: "1",
    tag: "Prioridade máxima",
    title: "Abrir mais rápido",
    body: "Fazer o texto e a imagem principal aparecerem primeiro: ajustar as fontes, encurtar a fila de arquivos e priorizar a imagem de destaque.",
    goal: "Conteúdo principal em até 2,5 s",
  },
  {
    n: "2",
    tag: "Em seguida",
    title: "Viajar mais leve",
    body: "Tirar código e imagens que sobram, fazer o celular guardar arquivos para a próxima visita e revisar a hospedagem.",
    goal: "Página mais leve, servidor respondendo rápido",
  },
  {
    n: "3",
    tag: "Para fechar",
    title: "Facilitar o contato",
    body: "Botão CONTACTO legível, áreas de toque maiores e títulos organizados. Depois, uma nova medição no Google.",
    goal: "Contraste do botão acima de 4,5 : 1",
  },
];

export default function Plan() {
  return (
    <div className="frame">
      <SlideHead num="10" label="O plano" />
      <h2 className="h2" data-reveal>
        Três etapas, <em>na ordem que mais rende.</em>
      </h2>
      <div className="plan">
        <svg className="plan__line" viewBox="0 0 1000 20" preserveAspectRatio="none" aria-hidden>
          <path data-draw pathLength={1} d="M0 10 H1000" />
        </svg>
        <ol className="plan__phases">
          {phases.map((p) => (
            <li key={p.n} className="phase" data-reveal>
              <span className="phase__n" aria-hidden>
                {p.n}
              </span>
              <span className="label phase__tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <p className="phase__goal">
                <span className="label">Meta</span>
                {p.goal}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
