export default function SlideHead({ num, label }: { num: string; label: string }) {
  return (
    <header className="slide-head" data-reveal>
      <span className="label">§ {num}</span>
      <span className="slide-head__rule" aria-hidden />
      <span className="label">{label}</span>
    </header>
  );
}

export function Term({ children }: { children: React.ReactNode }) {
  return (
    <span className="term">
      <span className="term__k">No relatório</span>
      {children}
    </span>
  );
}

export function Source({ children }: { children: React.ReactNode }) {
  return (
    <p className="source" data-reveal>
      {children}
    </p>
  );
}
