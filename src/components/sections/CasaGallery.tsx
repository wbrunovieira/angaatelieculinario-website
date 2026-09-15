"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Photo } from "@/content/photos";
import { gsap, useGSAP } from "@/lib/gsap";

type Item = { p: Photo; alt: string; cap: string };

// Desktop: a galeria trava na tela e desliza na horizontal enquanto se rola na vertical.
// Mobile: rolagem horizontal comum com snap.
export function CasaGallery({ items }: { items: Item[] }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track =
            scope.current?.querySelector<HTMLElement>("[data-track]");
          if (!track) return;
          const distance = () => track.scrollWidth - window.innerWidth;
          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: scope.current,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: 0.6,
              pin: true,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
          gsap.utils.toArray<HTMLElement>("[data-track] img").forEach((img) => {
            gsap.fromTo(
              img,
              { xPercent: -6 },
              {
                xPercent: 6,
                ease: "none",
                scrollTrigger: {
                  trigger: scope.current,
                  start: "top top",
                  end: () => `+=${distance()}`,
                  scrub: true,
                },
              },
            );
          });
        },
      );
    },
    { scope },
  );

  return (
    <div ref={scope} className="md:h-screen md:overflow-hidden">
      <ul
        data-track
        className="snap-gallery flex gap-4 overflow-x-auto px-5 pb-4 md:h-full md:items-center md:gap-8 md:overflow-visible md:px-10 md:pb-0"
      >
        {items.map((g, i) => (
          <li
            key={g.p.src}
            className={`w-[82vw] shrink-0 sm:w-[60vw] md:w-[38vw] ${i % 2 ? "md:mt-24" : "md:-mt-16"}`}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={g.p.src}
                alt={g.alt}
                fill
                sizes="(max-width: 640px) 82vw, (max-width: 768px) 60vw, 40vw"
                placeholder="blur"
                blurDataURL={g.p.blur}
                className="scale-[1.15] object-cover"
              />
            </div>
            <p className="mt-3 text-sm text-linho/60">{g.cap}</p>
          </li>
        ))}
        <li className="hidden w-[10vw] shrink-0 md:block" aria-hidden />
      </ul>
    </div>
  );
}
