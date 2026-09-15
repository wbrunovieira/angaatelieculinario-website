"use client";

import { useRef } from "react";
import { gsap, useGSAP, INTRO_KEY, INTRO_EVENT, reducedMotion } from "@/lib/gsap";

const WORD = "Angá".split("");

// Cortina de abertura: o wordmark sobe letra a letra, o contador corre,
// e a cortina levanta revelando a casa. Só na primeira visita da sessão.
// Renderiza sempre no servidor (evita mismatch de hidratação); a decisão
// de pular acontece no layout effect, antes da primeira pintura.
export function Preloader() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const finish = () => {
        try {
          sessionStorage.setItem(INTRO_KEY, "1");
        } catch {}
        document.documentElement.classList.remove("is-intro");
        window.__lenis?.start();
        window.dispatchEvent(new Event(INTRO_EVENT));
      };

      let seen = false;
      try {
        seen = sessionStorage.getItem(INTRO_KEY) === "1";
      } catch {}
      if (seen || reducedMotion()) {
        gsap.set(scope.current, { display: "none" });
        finish();
        return;
      }

      document.documentElement.classList.add("is-intro");
      window.__lenis?.stop();

      const counter = { n: 0 };
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-letter]", { yPercent: 110, duration: 1.2, stagger: 0.07 }, 0.15)
        .from("[data-sub]", { opacity: 0, y: 12, duration: 0.8 }, 0.7)
        .to(
          counter,
          {
            n: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate() {
              const el = scope.current?.querySelector("[data-count]");
              if (el) el.textContent = String(Math.round(counter.n)).padStart(3, "0");
            },
          },
          0.2,
        )
        .to("[data-letter], [data-sub], [data-count]", { opacity: 0, duration: 0.4, ease: "power2.in" }, 1.9)
        .to(
          "[data-curtain]",
          {
            yPercent: -100,
            duration: 1.1,
            ease: "power4.inOut",
            onStart: finish,
          },
          2.05,
        )
        .set(scope.current, { display: "none" });

      // Só em desenvolvimento: ?intro=slow deixa a abertura 4x mais lenta; ?intro=pause congela no meio.
      if (process.env.NODE_ENV !== "production" && location.search.includes("intro=slow")) tl.timeScale(0.25);
      if (process.env.NODE_ENV !== "production" && location.search.includes("intro=pause")) tl.pause(1.3);
    },
    { scope },
  );

  return (
    <div ref={scope} className="fixed inset-0 z-[100]" aria-hidden>
      <div data-curtain className="absolute inset-0 bg-mata text-linho will-change-transform">
        <div className="absolute inset-x-0 bottom-[38%] px-5 md:px-10">
          <p className="display display-italic flex overflow-hidden pb-[0.14em] text-[clamp(5rem,16vw,15rem)] leading-[0.9]">
            {WORD.map((ch, i) => (
              <span key={i} data-letter className="inline-block">
                {ch}
              </span>
            ))}
          </p>
          <p data-sub className="running-head mt-4 text-linho/60">
            Nogueira, Petrópolis
          </p>
        </div>
        <p data-count className="display absolute bottom-10 right-5 text-2xl tabular-nums text-linho/60 md:right-10">
          000
        </p>
      </div>
    </div>
  );
}
