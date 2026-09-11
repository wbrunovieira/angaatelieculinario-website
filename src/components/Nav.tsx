import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "#etapas", label: "Etapas" },
  { href: "#territorio", label: "Território" },
  { href: "#casa", label: "A casa" },
  { href: "#chef", label: "A chef" },
];

// Fixa no topo; mix-blend-difference mantém o contraste sobre foto, linho e mata.
export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference text-linho">
      <nav className="flex items-center justify-between px-5 py-5 md:px-10">
        <Link href="#" className="display display-italic text-2xl leading-none" aria-label="Angá, início">
          Angá
        </Link>
        <ul className="hidden gap-8 text-sm md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-quiet">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="link-quiet text-sm">
          Reservar
        </a>
      </nav>
    </header>
  );
}
