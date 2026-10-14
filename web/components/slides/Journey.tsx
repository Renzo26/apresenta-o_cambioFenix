import SlideHead from "../ui/SlideHead";

const steps = [
  { n: "01", title: "Vê o anúncio", note: "Instagram, Google, Facebook" },
  { n: "02", title: "Toca no anúncio", note: "O clique é cobrado aqui" },
  { n: "03", title: "Espera o site abrir", note: "Aqui perdemos gente — e o rastreamento", alert: true },
  { n: "04", title: "Chama no WhatsApp", note: "A conversão que importa" },
];

export default function Journey() {
  return (
    <div className="frame">
      <SlideHead num="01" label="O caminho de quem clica" />
      <h2 className="h2" data-reveal>
        Até o clique, é com a campanha.
        <br />
        <em>Depois dele, é com o site.</em>
      </h2>

      <div className="journey">
        <svg className="journey__path" viewBox="0 0 1200 140" preserveAspectRatio="none" aria-hidden>
          <path
            data-draw
            pathLength={1}
            d="M20 90 C 180 20, 300 20, 420 70 S 640 130, 760 70 S 1000 10, 1180 60"
            fill="none"
          />
        </svg>
        <ol className="journey__steps">
          {steps.map((s) => (
            <li key={s.n} className={`journey__step${s.alert ? " is-alert" : ""}`} data-reveal>
              <span className="journey__dot" aria-hidden />
              <span className="label">{s.n}</span>
              <strong>{s.title}</strong>
              <span className="journey__note">{s.note}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="lead" data-reveal>
        Quando a página demora, a pessoa desiste no passo 3 — <strong>depois de o clique já ter sido pago</strong>, e
        sem deixar rastro nos relatórios.
      </p>
    </div>
  );
}
