"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, SplitText, reducedMotion } from "@/lib/gsap";

type Props = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  // "lines": revela linha a linha com máscara. "fade": só opacidade e leve subida.
  mode?: "lines" | "fade";
  delay?: number;
};

// Texto que aparece quando entra na tela, uma vez.
export function Reveal({ as: Tag = "div", className, children, mode = "lines", delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reducedMotion()) return;

      if (mode === "fade") {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 1.2,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
        return;
      }

      document.fonts.ready.then(() => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          // Sem aria-label: em <p>/<blockquote> o atributo é proibido; os spans já carregam o texto.
          aria: "none",
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.2,
              stagger: 0.09,
              delay,
              ease: "power4.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }),
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
