"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { photos } from "@/content/photos";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";

const links = [
  { href: "#anga", label: "Angá" },
  { href: "#etapas", label: "Seis etapas" },
  { href: "#territorio", label: "Território" },
  { href: "#casa", label: "A casa" },
  { href: "#chef", label: "A chef" },
  { href: "#reservas", label: "Reservas" },
];

// Barra fixa em mix-blend-difference (contraste em qualquer fundo) e um menu
// em tela cheia que desce como cortina, com os capítulos em serifa grande.
export function Nav() {
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);
  const foto = photos.salao_luz_tarde_mesa;

  useGSAP(
    () => {
      const reduce = reducedMotion();
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "power4.inOut" } })
        .set(overlay.current, { pointerEvents: "auto" })
        .fromTo(overlay.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: reduce ? 0 : 0.9 })
        .from("[data-menu-link]", { yPercent: 110, duration: reduce ? 0 : 0.9, stagger: 0.06, ease: "power4.out" }, "-=0.45")
        .from("[data-menu-side]", { opacity: 0, y: 20, duration: reduce ? 0 : 0.8, ease: "power3.out" }, "-=0.7");
    },
    { scope: overlay },
  );

  useEffect(() => {
    if (open) {
      tl.current?.timeScale(1).play();
      window.__lenis?.stop();
      document.documentElement.classList.add("is-menu");
    } else {
      tl.current?.timeScale(1.6).reverse();
      window.__lenis?.start();
      document.documentElement.classList.remove("is-menu");
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        data-hero-nav
        className={`fixed inset-x-0 top-0 z-50 text-linho ${open ? "" : "mix-blend-difference"}`}
      >
        <nav className="flex items-center justify-between px-5 py-5 md:px-10">
          <Link href="#" className="display display-italic text-2xl leading-none" aria-label="Angá, início" onClick={() => setOpen(false)}>
            Angá
          </Link>
          <div className="flex items-center gap-8 text-sm">
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="link-quiet hidden sm:inline" data-cursor="Reservar">
              Reservar
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu"
              className="link-quiet"
            >
              {open ? "Fechar" : "Menu"}
            </button>
          </div>
        </nav>
      </header>

      <div
        id="menu"
        ref={overlay}
        className="pointer-events-none fixed inset-0 z-40 bg-mata text-linho"
        style={{ clipPath: "inset(0 0 100% 0)" }}
        aria-hidden={!open}
      >
        <div className="grid h-full grid-cols-12 items-end gap-8 px-5 pb-10 pt-24 md:px-10 md:pb-14">
          <ul className="col-span-12 md:col-span-7">
            {links.map((l, i) => (
              <li key={l.href} className="overflow-hidden">
                <a
                  href={l.href}
                  data-menu-link
                  onClick={() => setOpen(false)}
                  className="display block py-1 text-[clamp(2.4rem,7vw,6.5rem)] leading-[1.05] transition-opacity hover:opacity-60"
                  tabIndex={open ? 0 : -1}
                >
                  <span className="running-head mr-4 align-top text-linho/50">{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div data-menu-side className="col-span-12 hidden md:col-span-4 md:col-start-9 md:block">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src={foto.src} alt="" fill sizes="30vw" placeholder="blur" blurDataURL={foto.blur} className="object-cover" />
            </div>
            <dl className="mt-6 space-y-1 text-sm text-linho/80">
              {site.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4">
                  <dt>{h.day}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-linho/60">
              {site.address.street}, {site.address.neighborhood}, {site.address.city}
            </p>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="link-quiet mt-2 inline-block text-sm" tabIndex={open ? 0 : -1}>
              Reservar pelo WhatsApp {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
