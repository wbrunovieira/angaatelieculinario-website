"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Photo } from "@/content/photos";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";

type Props = {
  photo: Photo;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  // Intensidade do parallax (fração da altura). 0 desliga.
  speed?: number;
  cursor?: string;
};

// Moldura de foto: revela de baixo para cima com máscara quando entra na tela
// e desliza levemente (parallax) enquanto atravessa a janela.
export function Frame({ photo, alt, sizes, className = "", priority, speed = 0.1, cursor = "Ver" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reducedMotion()) return;
      const inner = el.querySelector("[data-inner]");

      gsap.fromTo(
        el,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        },
      );
      gsap.from(inner, {
        scale: 1.2,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
      if (speed > 0) {
        gsap.fromTo(
          inner,
          { yPercent: -speed * 100 },
          {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }
    },
    { scope: ref },
  );

  const bleed = speed > 0 ? `${Math.round(speed * 100)}%` : "0";

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} data-cursor={cursor}>
      <div data-inner className="absolute inset-0" style={{ top: `-${bleed}`, bottom: `-${bleed}` }}>
        <Image
          src={photo.src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={photo.blur}
          className="object-cover"
        />
      </div>
    </div>
  );
}
