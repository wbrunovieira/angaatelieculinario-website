import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="on-dark relative z-10 border-t hairline bg-mata px-5 py-12 text-sm text-linho/70 md:px-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="display display-italic text-4xl text-linho">Angá</p>
          <p className="mt-2 max-w-[36ch]">{site.tagline}.</p>
        </div>
        <ul className="flex flex-col gap-2 md:items-end">
          <li>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-quiet">
              Instagram {site.instagramHandle}
            </a>
          </li>
          <li>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="link-quiet">
              WhatsApp {site.phoneDisplay}
            </a>
          </li>
          <li>
            {site.address.street}, {site.address.neighborhood}, {site.address.city}
          </li>
        </ul>
      </div>
      <p className="mt-12 text-xs text-linho/60">
        Fotos de {site.photoCredits.join(", ")}. © {new Date().getFullYear()} {site.name}.
      </p>
    </footer>
  );
}
