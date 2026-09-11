"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { territorio } from "@/content/territorio";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";

// Desktop: lista de nomes em serifa grande. Ao passar o mouse, a foto do ingrediente
// flutua e segue o cursor; a história aparece na coluna ao lado.
export function TerritorioList() {
  const scope = useRef<HTMLDivElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const shown = active ?? 0;

  useGSAP(
    () => {
      const el = float.current;
      if (!el || reducedMotion()) return;
      const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
      const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
      const rot = gsap.quickTo(el, "rotation", { duration: 0.8, ease: "power3" });
      let lastX = 0;
      const move = (e: PointerEvent) => {
        x(e.clientX);
        y(e.clientY);
        rot(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.4));
        lastX = e.clientX;
      };
      window.addEventListener("pointermove", move, { passive: true });
      return () => window.removeEventListener("pointermove", move);
    },
    { scope },
  );

  useGSAP(
    () => {
      if (!float.current) return;
      gsap.to(float.current, {
        opacity: active === null ? 0 : 1,
        scale: active === null ? 0.85 : 1,
        duration: 0.5,
        ease: "power3.out",
      });
    },
    { scope, dependencies: [active] },
  );

  return (
    <div ref={scope} className="grid grid-cols-12 gap-8">
      <ul className="col-span-7 divide-y hairline" onPointerLeave={() => setActive(null)}>
        {territorio.map((item, i) => (
          <li key={item.name}>
            <button
              type="button"
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`display flex w-full items-baseline justify-between gap-6 py-6 text-left text-[clamp(2rem,3.6vw,3.6rem)] transition-opacity duration-500 ${
                active !== null && active !== i ? "opacity-30" : "opacity-100"
              }`}
              data-cursor=""
            >
              <span>{item.name}</span>
              <span className="running-head shrink-0 text-right">{item.origin}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="col-span-4 col-start-9">
        <div className="sticky top-32">
          <p key={shown} className="prose-anga text-lg text-mata/85 animate-[fade_0.6s_ease-out]">
            {territorio[shown].story}
          </p>
        </div>
      </div>

      <div
        ref={float}
        className="pointer-events-none fixed left-0 top-0 z-30 -ml-[9vw] -mt-[12vw] h-[24vw] w-[18vw] opacity-0"
        aria-hidden
      >
        {territorio.map((item, i) => (
          <div
            key={item.name}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ${shown === i ? "opacity-100" : "opacity-0"}`}
          >
            <Image src={item.photo.src} alt="" fill sizes="20vw" placeholder="blur" blurDataURL={item.photo.blur} className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
