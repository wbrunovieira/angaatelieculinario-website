"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { menuAtual } from "@/content/menu";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const { etapas, season } = menuAtual;

// Desktop: painel fixo (sticky) e uma timeline com scrub que troca foto e texto por etapa.
// Mobile e reduced-motion: as etapas empilhadas, sem animação.
export function Etapas() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const imgs = gsap.utils.toArray<HTMLElement>("[data-etapa-img]");
        const texts = gsap.utils.toArray<HTMLElement>("[data-etapa-text]");
        gsap.set(imgs.slice(1), { autoAlpha: 0, scale: 1.06 });
        gsap.set(texts.slice(1), { autoAlpha: 0, y: 28 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: "[data-etapas-track]",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        });
        etapas.forEach((_, i) => {
          if (i === 0) return;
          // Cada etapa ocupa 1 unidade de rolagem; a troca usa só o começo dela.
          tl.to(imgs[i - 1], { autoAlpha: 0, scale: 1, duration: 0.35 }, i)
            .to(imgs[i], { autoAlpha: 1, scale: 1, duration: 0.35 }, i)
            .to(texts[i - 1], { autoAlpha: 0, y: -28, duration: 0.18 }, i)
            .to(texts[i], { autoAlpha: 1, y: 0, duration: 0.2 }, i + 0.18);
        });
      });
    },
    { scope },
  );

  return (
    <section id="etapas" ref={scope} className="on-dark bg-mata text-linho">
      {/* Versão fixa: desktop com movimento */}
      <div
        data-etapas-track
        className="hidden motion-safe:md:block"
        style={{ height: `${etapas.length * 100}vh` }}
      >
        <div className="sticky top-0 grid h-screen grid-cols-12 gap-8 px-10 py-10">
          <div className="col-span-5 flex flex-col justify-between py-4">
            <p className="running-head text-linho/60">Seis etapas, {season.toLowerCase()}</p>
            <div className="relative h-[60vh]">
              {etapas.map((e, i) => (
                <div key={e.title} data-etapa-text className="absolute inset-x-0 bottom-0">
                  <p className="display text-[clamp(4rem,9vw,8.5rem)] text-linho/40">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="display mt-2 text-[clamp(2.6rem,4.6vw,4.8rem)]">{e.title}</h3>
                  <p className="mt-5 max-w-[34ch] text-lg text-linho/85">
                    {e.ingredients.join(". ")}.
                  </p>
                  <p className="prose-anga mt-4 max-w-[46ch] text-linho/70">{e.note}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-linho/60">
              O menu muda com as estações. Este é o de agora.
            </p>
          </div>
          <div className="relative col-span-6 col-start-7 overflow-hidden">
            {etapas.map((e, i) => (
              <div key={e.title} data-etapa-img className="absolute inset-0">
                <Image
                  src={e.photo.src}
                  alt={`${e.title}: ${e.ingredients.join(", ")}`}
                  fill
                  sizes="50vw"
                  placeholder="blur"
                  blurDataURL={e.photo.blur}
                  priority={i === 0}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Versão empilhada: mobile e reduced-motion */}
      <div className="px-5 py-24 motion-safe:md:hidden md:px-10">
        <p className="running-head text-linho/60">Seis etapas, {season.toLowerCase()}</p>
        <ol className="mt-12 space-y-20">
          {etapas.map((e, i) => (
            <li key={e.title} className="grid gap-6 md:grid-cols-2 md:gap-10">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={e.photo.src}
                  alt={`${e.title}: ${e.ingredients.join(", ")}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={e.photo.blur}
                  className="object-cover"
                />
              </div>
              <div className="self-end">
                <p className="display text-5xl text-linho/40">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="display mt-2 text-4xl">{e.title}</h3>
                <p className="mt-4 text-lg text-linho/85">{e.ingredients.join(". ")}.</p>
                <p className="prose-anga mt-3 text-linho/70">{e.note}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-16 text-sm text-linho/60">
          O menu muda com as estações. Este é o de agora. Reservas pelo WhatsApp{" "}
          <a href={site.whatsapp} className="link-quiet">
            {site.phoneDisplay}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
