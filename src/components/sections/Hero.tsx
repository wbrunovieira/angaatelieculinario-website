"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { photos } from "@/content/photos";
import { site } from "@/lib/site";
import { gsap, useGSAP, SplitText, INTRO_KEY, INTRO_EVENT, reducedMotion } from "@/lib/gsap";
import { HeroCanvas } from "@/components/HeroCanvas";

// O hero fica preso na tela por 180vh: enquanto o visitante rola, o wordmark cresce
// e some, a foto aproxima e escurece, e o primeiro capítulo sobe por cima.
export function Hero() {
  const p = photos.fachada_casa_jardim;
  const wrap = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [canvasReady, setCanvasReady] = useState(false);
  const onReady = useCallback(() => setCanvasReady(true), []);

  useGSAP(
    () => {
      const reduce = reducedMotion();

      // Abertura: espera a cortina do preloader levantar.
      const intro = () => {
        if (!wrap.current?.isConnected) return;
        if (reduce) {
          gsap.set("[data-hero-ui]", { opacity: 1 });
          return;
        }
        const root = wrap.current!;
        const title = SplitText.create(root.querySelector("[data-hero-title]")!, { type: "chars" });
        const tag = SplitText.create(root.querySelector("[data-hero-tag]")!, { type: "lines", mask: "lines", aria: "none" });
        const nav = document.querySelector("[data-hero-nav]");
        const tl = gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .set(root.querySelector("[data-hero-ui]"), { opacity: 1 })
          .from(title.chars, { yPercent: 110, duration: 1.4, stagger: 0.06 }, 0.2)
          .from(tag.lines, { yPercent: 110, duration: 1.1, stagger: 0.1 }, 0.7)
          .from(root.querySelector("[data-hero-note]"), { opacity: 0, y: 14, duration: 1 }, 1.0);
        if (nav) tl.from(nav, { opacity: 0, duration: 1 }, 1.0);
      };
      let seen = false;
      try {
        seen = sessionStorage.getItem(INTRO_KEY) === "1";
      } catch {}
      if (seen || reduce) intro();
      else window.addEventListener(INTRO_EVENT, intro, { once: true });

      if (reduce) return;

      // Profundidade: o texto desliza no sentido oposto ao da foto, bem pouco.
      if (window.matchMedia("(pointer: fine)").matches) {
        const ui = wrap.current!.querySelector("[data-hero-ui]");
        const x = gsap.quickTo(ui, "x", { duration: 1.2, ease: "power3" });
        const y = gsap.quickTo(ui, "y", { duration: 1.2, ease: "power3" });
        const move = (e: PointerEvent) => {
          x((e.clientX / window.innerWidth - 0.5) * 14);
          y((e.clientY / window.innerHeight - 0.5) * 8);
        };
        window.addEventListener("pointermove", move, { passive: true });
        const cleanupMove = () => window.removeEventListener("pointermove", move);
        return () => {
          cleanupMove();
          window.removeEventListener(INTRO_EVENT, intro);
        };
      }

      // Rolagem: título cresce e dissolve, texto some, canvas escurece via progressRef.
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: wrap.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
            onUpdate: (self) => {
              progress.current = self.progress;
            },
          },
        })
        .to("[data-hero-title]", { scale: 1.6, yPercent: -40, transformOrigin: "left bottom" }, 0)
        .to("[data-hero-title]", { opacity: 0, duration: 0.5 }, 0.35)
        .to("[data-hero-tag], [data-hero-note]", { opacity: 0, y: -30, duration: 0.4 }, 0)
        .to("[data-hero-fallback]", { scale: 1.18 }, 0);

      return () => window.removeEventListener(INTRO_EVENT, intro);
    },
    { scope: wrap },
  );

  return (
    <div ref={wrap} className="relative h-[180svh]">
      <section className="sticky top-0 h-[100svh] min-h-[560px] overflow-hidden bg-mata text-linho">
        <div data-hero-fallback className="absolute inset-0">
          <Image
            src={p.src}
            alt="A casa do Angá vista do jardim: telhado de barro, salão aberto e mesas postas entre plantas"
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={p.blur}
            className="object-cover object-[50%_58%]"
          />
        </div>
        <div className={`absolute inset-0 transition-opacity duration-700 ${canvasReady ? "opacity-100" : "opacity-0"}`}>
          <HeroCanvas src={p.src} progressRef={progress} onReady={onReady} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-mata/80 via-mata/10 to-mata/20" />

        <div
          data-hero-ui
          className="absolute inset-x-0 bottom-0 flex flex-col gap-6 px-5 pb-10 opacity-0 md:flex-row md:items-end md:justify-between md:px-10 md:pb-12"
        >
          <div>
            <h1 data-hero-title className="display display-italic text-[clamp(5rem,16vw,15rem)] leading-[0.9] will-change-transform">
              Angá
            </h1>
            <p data-hero-tag className="lede mt-3 max-w-[22ch] text-linho/95">
              {site.tagline}.
            </p>
          </div>
          <p data-hero-note className="text-sm text-linho/80 md:max-w-[26ch] md:text-right">
            Uma casa escondida em {site.address.neighborhood}, {site.address.city}. Seis etapas,{" "}
            {site.seats} lugares, sempre com reserva.
          </p>
        </div>
      </section>
    </div>
  );
}
