import SlideHead from "../ui/SlideHead";

const targets = [
  { name: "Aparecer", goal: "até 2,5 s", now: "hoje 4,5 s", status: "bad" },
  { name: "Responder ao toque", goal: "até 0,2 s", now: "hoje 0,27 s", status: "mid" },
  { name: "Tela estável", goal: "até 0,1", now: "hoje 0,06 ✓", status: "good" },
];

export default function Closing() {
  return (
    <div className="frame frame--closing">
      <SlideHead num="12" label="A meta" />
      <div className="closing">
        <p className="label closing__kicker" data-reveal>
          Conteúdo principal no celular em
        </p>
        <p className="closing__big" data-reveal>
          2,5<span>s</span>
        </p>
        <ul className="closing__targets">
          {targets.map((t) => (
            <li key={t.name} className={`is-${t.status}`} data-reveal>
              <span className="label">{t.name}</span>
              <strong>{t.goal}</strong>
              <span>{t.now}</span>
            </li>
          ))}
        </ul>
        <p className="closing__thanks" data-reveal>
          Obrigado. <em>Vamos abrir essa porta.</em>
        </p>
      </div>
      <p className="source" data-reveal>
        Fonte: Google PageSpeed Insights · cambiofenix.com · celular · 13/10/2026. Dados de visitantes reais (28
        dias) e teste de laboratório (Moto G Power simulado, 4G lenta, Lighthouse 13.5).
      </p>
    </div>
  );
}
