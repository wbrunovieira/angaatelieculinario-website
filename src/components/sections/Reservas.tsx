import { photos } from "@/content/photos";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { Frame } from "@/components/Frame";
import { Magnetic } from "@/components/Magnetic";

export function Reservas() {
  const a = site.address;
  return (
    <section id="reservas" className="on-dark relative z-10 bg-mata text-linho">
      <div className="grid md:grid-cols-12">
        <div className="md:col-span-5">
          <Frame
            photo={photos.fogao_lenha_tacho_rapadura}
            alt="Tacho de cobre sobre o fogão a lenha aceso"
            sizes="(max-width: 768px) 100vw, 42vw"
            className="aspect-[4/3] md:h-full md:min-h-[85vh]"
            speed={0.08}
            cursor=""
          />
        </div>

        <div className="px-5 py-20 md:col-span-6 md:col-start-7 md:py-32 md:pr-10">
          <p className="running-head text-linho/60">Reservas</p>
          <Reveal as="h2" className="display mt-6 text-[clamp(2.6rem,5.5vw,5rem)]">
            Só com reserva. Nos fins de semana, a lenha já está acesa.
          </Reveal>

          <Reveal mode="fade" delay={0.3}>
            <dl className="mt-12 divide-y hairline">
              {site.hours.map((h) => (
                <div key={h.day} className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                  <dt className="display text-2xl">{h.day}</dt>
                  <dd className="text-linho/85">
                    {h.time}
                    <span className="block text-sm text-linho/55">{h.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal mode="fade" delay={0.5} className="mt-12">
            <Magnetic>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-barro" data-cursor="">
                Reservar pelo WhatsApp
                <span>{site.phoneDisplay}</span>
              </a>
            </Magnetic>
          </Reveal>

          <Reveal mode="fade" delay={0.6}>
            <address className="mt-14 not-italic text-linho/85">
              <p>
                {a.street}, {a.neighborhood}
              </p>
              <p>
                {a.city}, {a.state}, {a.zip}
              </p>
              <p className="mt-3 text-sm text-linho/60">
                <a href={site.mapsSearch} target="_blank" rel="noopener noreferrer" className="link-quiet">
                  Ver no mapa
                </a>
                . Estacionamento gratuito na rua.
              </p>
            </address>
            <p className="mt-10 max-w-[44ch] text-sm text-linho/60">
              Casamentos, aniversários e celebrações também acontecem aqui, em três formatos de festa.
              Conte pra gente o que você imagina.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
