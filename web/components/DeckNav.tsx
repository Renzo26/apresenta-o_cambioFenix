"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useDeck } from "./DeckContext";

const pad = (n: number) => String(n).padStart(2, "0");

export default function DeckNav({ titles }: { titles: string[] }) {
  const { active, total, goTo } = useDeck();
  const [fullscreen, setFullscreen] = useState(false);
  const progress = total > 1 ? active / (total - 1) : 1;

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "f" || e.key === "F") && !e.metaKey && !e.ctrlKey) toggleFullscreen();
    };
    document.addEventListener("fullscreenchange", onChange);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <nav className="nav" aria-label="Navegação da apresentação">
      <div className="nav__progress" aria-hidden>
        <motion.span
          className="nav__progress-fill"
          animate={{ scaleX: progress }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
        />
        <ol className="nav__dots">
          {titles.map((t, i) => (
            <li key={t}>
              <button
                type="button"
                tabIndex={-1}
                className={i <= active ? "is-past" : undefined}
                onClick={() => goTo(i)}
                aria-label={`Ir para ${t}`}
              />
            </li>
          ))}
        </ol>
      </div>

      <div className="nav__bar">
        <p className="nav__count" aria-live="polite">
          <span className="nav__current">{pad(active + 1)}</span>
          <span className="nav__sep">/</span>
          <span>{pad(total)}</span>
        </p>

        <div className="nav__title" aria-hidden>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={active}
              initial={{ y: 14, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -14, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {titles[active]}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="nav__actions">
          <NavButton label="Tela cheia (F)" onClick={toggleFullscreen} className="nav__fs">
            {fullscreen ? (
              <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
            ) : (
              <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            )}
          </NavButton>
          <NavButton label="Slide anterior" onClick={() => goTo(active - 1)} disabled={active === 0}>
            <path d="M15 5l-7 7 7 7" />
          </NavButton>
          <NavButton label="Próximo slide" onClick={() => goTo(active + 1)} disabled={active === total - 1} primary>
            <path d="M9 5l7 7-7 7" />
          </NavButton>
        </div>
      </div>
    </nav>
  );
}

function toggleFullscreen() {
  if (!document.fullscreenEnabled) return;
  if (document.fullscreenElement) document.exitFullscreen();
  else document.documentElement.requestFullscreen().catch(() => {});
}

function NavButton({
  label,
  onClick,
  disabled,
  primary,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      className={`nav__btn${primary ? " nav__btn--primary" : ""}${className ? ` ${className}` : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      whileHover={disabled ? undefined : { scale: 1.06 }}
      whileTap={disabled ? undefined : { scale: 0.92 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {children}
      </svg>
    </motion.button>
  );
}
