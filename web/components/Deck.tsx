"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { DeckContext, SlideIndexContext } from "./DeckContext";
import DeckNav from "./DeckNav";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type SlideDef = { id: string; title: string; content: ReactNode };

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function Deck({ slides }: { slides: SlideDef[] }) {
  const total = slides.length;
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const lenis = useRef<Lenis | null>(null);
  const pin = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const scrollFor = useCallback(
    (index: number) => {
      const st = pin.current;
      if (!st) return 0;
      return st.start + ((st.end - st.start) * index) / Math.max(1, total - 1);
    },
    [total],
  );

  const goTo = useCallback(
    (index: number, immediate = false) => {
      const i = Math.max(0, Math.min(total - 1, index));
      const y = scrollFor(i);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (lenis.current) {
        lenis.current.scrollTo(y, {
          immediate: immediate || reduce,
          duration: 1.15,
          easing: easeInOutCubic,
          force: true,
        });
      } else {
        window.scrollTo(0, y);
      }
    },
    [scrollFor, total],
  );

  // Smooth scrolling (Lenis) sincronizado com o ticker do GSAP
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduce);
    const instance = new Lenis({ lerp: reduce ? 1 : 0.085, smoothWheel: !reduce, wheelMultiplier: 0.9 });
    lenis.current = instance;
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Encaixe: depois que a rolagem para, assenta no slide mais próximo
    let timer: ReturnType<typeof setTimeout> | undefined;
    instance.on("scroll", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const st = pin.current;
        if (!st || instance.isScrolling === "smooth") return;
        const step = (st.end - st.start) / Math.max(1, total - 1);
        const nearest = Math.round((instance.scroll - st.start) / step);
        const target = st.start + nearest * step;
        if (Math.abs(target - instance.scroll) > 2 && instance.scroll <= st.end + 1) {
          instance.scrollTo(target, { duration: 0.7, easing: easeInOutCubic });
        }
      }, 160);
    });

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis.current = null;
    };
  }, [total]);

  // Trilho horizontal fixado + animações de entrada de cada slide
  useGSAP(
    () => {
      const trackEl = track.current!;
      const distance = () => trackEl.scrollWidth - window.innerWidth;
      ScrollTrigger.config({ ignoreMobileResize: true });

      const horizontal = gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          scrub: true,
          start: "top top",
          end: () => "+=" + distance(),
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.round(self.progress * (total - 1));
            if (next !== activeRef.current) {
              activeRef.current = next;
              setActive(next);
            }
          },
        },
      });
      pin.current = horizontal.scrollTrigger ?? null;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".slide", trackEl).forEach((slide, i) => {
          if (i === 0) return; // a capa tem coreografia própria

          const items = slide.querySelectorAll("[data-reveal]");
          if (items.length) {
            gsap.from(items, {
              y: 48,
              autoAlpha: 0,
              duration: 1,
              ease: "expo.out",
              stagger: 0.07,
              scrollTrigger: {
                trigger: slide,
                containerAnimation: horizontal,
                start: "left 62%",
                toggleActions: "play none none reverse",
              },
            });
          }

          slide.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
            const speed = parseFloat(el.dataset.speed || "0.2");
            gsap.fromTo(
              el,
              { xPercent: speed * 60 },
              {
                xPercent: speed * -60,
                ease: "none",
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: horizontal,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              },
            );
          });

          slide.querySelectorAll<SVGGeometryElement>("[data-draw]").forEach((path) => {
            const length = path.hasAttribute("pathLength") ? Number(path.getAttribute("pathLength")) : path.getTotalLength();
            gsap.fromTo(
              path,
              { strokeDasharray: length, strokeDashoffset: length },
              {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: horizontal,
                  start: "left 85%",
                  end: "left 15%",
                  scrub: true,
                },
              },
            );
          });
        });
      });

      // Link direto para um slide: /#slide-4
      const match = window.location.hash.match(/slide-(\d+)/);
      if (match) {
        const i = parseInt(match[1], 10) - 1;
        requestAnimationFrame(() => goTo(i, true));
      }

      return () => mm.revert();
    },
    { scope: root, dependencies: [total] },
  );

  // Mantém o endereço apontando para o slide atual
  useEffect(() => {
    const url = active === 0 ? window.location.pathname : `#slide-${active + 1}`;
    window.history.replaceState(null, "", url);
  }, [active]);

  // Teclado e gesto lateral
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      const onControl = target.closest("button, a, input, [role='switch']");
      const current = activeRef.current;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          goTo(current + 1);
          break;
        case " ":
          if (onControl) return;
          e.preventDefault();
          goTo(current + (e.shiftKey ? -1 : 1));
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          goTo(current - 1);
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(total - 1);
          break;
      }
    };

    let sx = 0;
    let sy = 0;
    const onStart = (e: TouchEvent) => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        goTo(activeRef.current + (dx < 0 ? 1 : -1));
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [goTo, total]);

  return (
    <DeckContext.Provider value={{ active, total, reducedMotion, goTo }}>
      <main ref={root} className="deck" aria-roledescription="apresentação">
        <div ref={track} className="track">
          {slides.map((s, i) => (
            <SlideIndexContext.Provider key={s.id} value={i}>
              <section
                id={`slide-${i + 1}`}
                className={`slide slide--${s.id}`}
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${total}: ${s.title}`}
                aria-hidden={i !== active}
                inert={i !== active ? true : undefined}
              >
                {s.content}
              </section>
            </SlideIndexContext.Provider>
          ))}
        </div>
      </main>
      <DeckNav titles={slides.map((s) => s.title)} />
    </DeckContext.Provider>
  );
}
