import SlideHead from "../ui/SlideHead";

const cards = [
  {
    n: "i",
    title: "Clique pago, visita perdida",
    body: "O clique é cobrado no toque. Se a pessoa desiste enquanto a página carrega, o investimento foi feito e a visita não aconteceu.",
  },
  {
    n: "ii",
    title: "Clique mais caro",
    body: "No Google Ads, a experiência na página de destino é um dos três componentes do Índice de Qualidade. Página lenta pode baixar essa nota e encarecer cada clique.",
  },
  {
    n: "iii",
    title: "Relatórios que enganam",
    body: "Quem sai antes de a página carregar pode nem ser registrado pelo Pixel ou pelo Analytics. A campanha parece diferente do que realmente é.",
  },
];

export default function Ads() {
  return (
    <div className="frame">
      <SlideHead num="05" label="Por que isso importa para a agência" />
      <h2 className="h2" data-reveal>
        Site lento aparece <em>na conta dos anúncios.</em>
      </h2>
      <div className="cards cards--3">
        {cards.map((c) => (
          <article key={c.n} className="card" data-reveal>
            <span className="card__n" aria-hidden>
              {c.n}
            </span>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
