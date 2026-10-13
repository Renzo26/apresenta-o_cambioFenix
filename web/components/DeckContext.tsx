"use client";

import { createContext, useContext, useEffect, useState } from "react";

type DeckState = {
  active: number;
  total: number;
  reducedMotion: boolean;
  goTo: (index: number, immediate?: boolean) => void;
};

export const DeckContext = createContext<DeckState>({
  active: 0,
  total: 1,
  reducedMotion: false,
  goTo: () => {},
});

export const SlideIndexContext = createContext(0);

export const useDeck = () => useContext(DeckContext);

/** Estado do slide em que o componente está: ativo agora e se já foi visto. */
export function useSlide() {
  const index = useContext(SlideIndexContext);
  const { active, reducedMotion } = useDeck();
  const isActive = active === index;
  const [seen, setSeen] = useState(isActive);

  useEffect(() => {
    if (isActive) setSeen(true);
  }, [isActive]);

  return { index, isActive, seen, reducedMotion };
}
