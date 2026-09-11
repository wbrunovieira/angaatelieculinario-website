import Image from "next/image";
import { photos } from "@/content/photos";
import { site } from "@/lib/site";

export function Hero() {
  const p = photos.fachada_casa_jardim;
  return (
    <section className="relative h-[100svh] min-h-[560px] overflow-hidden bg-mata text-linho">
      <div className="hero-image absolute inset-0">
        <Image
          src={p.src}
          alt="A casa do Angá vista do jardim: telhado de barro, salão aberto e mesas postas entre plantas"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={p.blur}
          className="object-cover object-[50%_60%]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-mata/85 via-mata/15 to-mata/10" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 px-5 pb-10 md:flex-row md:items-end md:justify-between md:px-10 md:pb-12">
        <div>
          <h1 className="hero-rise display display-italic text-[clamp(5rem,16vw,15rem)]">
            Angá
          </h1>
          <p className="hero-rise-2 lede mt-2 max-w-[22ch] text-linho/95">
            {site.tagline}.
          </p>
        </div>
        <p className="hero-rise-3 text-sm text-linho/80 md:max-w-[26ch] md:text-right">
          Uma casa escondida em {site.address.neighborhood}, {site.address.city}. Seis etapas,{" "}
          {site.seats} lugares, sempre com reserva.
        </p>
      </div>
    </section>
  );
}
