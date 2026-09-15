"use client";

import Image from "next/image";
import { useRef } from "react";
import { photos } from "@/content/photos";
import { site } from "@/lib/site";
import {
  gsap,
  useGSAP,
  SplitText,
  INTRO_KEY,
  INTRO_EVENT,
  reducedMotion,
} from "@/lib/gsap";

// O hero fica preso na tela por 180vh: enquanto o visitante rola, o wordmark cresce
// e some, a foto aproxima e escurece, e o primeiro capítulo entra.
export function Hero() {
  const p = photos.fachada_casa_jardim;
  const wrap = useRef<HTMLDivElement>(null);

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
        const title = SplitText.create(
          root.querySelector("[data-hero-title]")!,
          { type: "chars" },
        );
        const tag = SplitText.create(root.querySelector("[data-hero-tag]")!, {
          type: "lines",
          mask: "lines",
          aria: "none",
        });
        const nav = document.querySelector("[data-hero-nav]");
        const tl = gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .set(root.querySelector("[data-hero-ui]"), { opacity: 1 })
          .from(
            title.chars,
            { yPercent: 110, duration: 1.4, stagger: 0.06 },
            0.2,
          )
          .from(tag.lines, { yPercent: 110, duration: 1.1, stagger: 0.1 }, 0.7)
          .from(
            root.querySelector("[data-hero-note]"),
            { opacity: 0, y: 14, duration: 1 },
            1.0,
          );
        if (nav) tl.from(nav, { opacity: 0, duration: 1 }, 1.0);
      };
      let seen = false;
      try {
        seen = sessionStorage.getItem(INTRO_KEY) === "1";
      } catch {}
      if (seen || reduce) intro();
      else window.addEventListener(INTRO_EVENT, intro, { once: true });

      if (reduce) return;

      // Zoom lento de abertura: a foto assenta ao longo de 7 s (só transform).
      gsap.fromTo(
        "[data-hero-photo]",
        { scale: 1.12 },
        { scale: 1, duration: 7, ease: "power2.out" },
      );

      // Rolagem: título cresce e dissolve, texto some, foto aproxima e escurece.
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: wrap.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
          },
        })
        .to(
          "[data-hero-title]",
          { scale: 1.6, yPercent: -40, transformOrigin: "left bottom" },
          0,
        )
        .to("[data-hero-title]", { opacity: 0, duration: 0.5 }, 0.35)
        .to(
          "[data-hero-tag], [data-hero-note]",
          { opacity: 0, y: -30, duration: 0.4 },
          0,
        )
        .to("[data-hero-zoom]", { scale: 1.15 }, 0)
        .to("[data-hero-dim]", { opacity: 0.75 }, 0);

      return () => window.removeEventListener(INTRO_EVENT, intro);
    },
    { scope: wrap },
  );

  return (
    <div ref={wrap} className="relative h-[180svh]">
      <section className="sticky top-0 h-[100svh] min-h-[560px] overflow-hidden bg-mata text-linho">
        <div data-hero-zoom className="absolute inset-0 will-change-transform">
          <div data-hero-photo className="absolute inset-0">
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
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-mata/80 via-mata/10 to-mata/20" />
        <div
          data-hero-dim
          className="pointer-events-none absolute inset-0 bg-mata opacity-0"
        />

        <div
          data-hero-ui
          className="absolute inset-x-0 bottom-0 flex flex-col gap-6 px-5 pb-10 opacity-0 md:flex-row md:items-end md:justify-between md:px-10 md:pb-12"
        >
          <div>
            <h1
              data-hero-title
              className="display display-italic text-[clamp(5rem,16vw,15rem)] leading-[0.9] will-change-transform"
            >
              Angá
            </h1>
            <p data-hero-tag className="lede mt-3 max-w-[22ch] text-linho/95">
              {site.tagline}.
            </p>
          </div>
          <p
            data-hero-note
            className="text-sm text-linho/80 md:max-w-[26ch] md:text-right"
          >
            Uma casa escondida em {site.address.neighborhood},{" "}
            {site.address.city}. Seis etapas, {site.seats} lugares, sempre com
            reserva.
          </p>
        </div>
      </section>
    </div>
  );
}
