"use client";

import { useEffect, useRef } from "react";
import { gsap, finePointer, reducedMotion } from "@/lib/gsap";

// Cursor da casa: um ponto que segue o mouse com atraso e cresce
// sobre links e fotos, mostrando uma palavra ("Ver", "Reservar").
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = dot.current;
    if (!el || !finePointer() || reducedMotion()) return;
    document.documentElement.classList.add("has-cursor");
    // Força o reflow: o ponto era display:none até aqui e o GSAP precisa
    // ler o transform calculado antes de criar os quickTo.
    void el.offsetWidth;

    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
    // quickTo não aceita "scale" (vira scaleX/scaleY por dentro); um quickTo por eixo.
    const sx = gsap.quickTo(el, "scaleX", { duration: 0.4, ease: "power3" });
    const sy = gsap.quickTo(el, "scaleY", { duration: 0.4, ease: "power3" });
    const scale = (v: number) => {
      sx(v);
      sy(v);
    };

    gsap.set(el, { opacity: 0 });
    let shown = false;
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      if (!shown) {
        shown = true;
        gsap.to(el, { opacity: 1, duration: 0.3 });
      }
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as Element).closest<HTMLElement>("a, button, [data-cursor]");
      if (!t) {
        scale(1);
        el.classList.remove("is-big");
        return;
      }
      const text = t.dataset.cursor ?? "";
      if (label.current) label.current.textContent = text;
      el.classList.toggle("is-big", true);
      scale(text ? 5 : 2.5);
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.3 });
    const enter = () => gsap.to(el, { opacity: 1, duration: 0.3 });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, []);

  return (
    <div ref={dot} className="cursor-dot" aria-hidden>
      <span ref={label} className="cursor-label" />
    </div>
  );
}
