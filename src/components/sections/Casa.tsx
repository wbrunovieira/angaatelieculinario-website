import Image from "next/image";
import { photos } from "@/content/photos";
import { site } from "@/lib/site";

const galeria = [
  { p: photos.panela_fogo_lenha, alt: "Panela sobre a brasa do fogão a lenha", cap: "A lenha acesa" },
  { p: photos.salao_luz_tarde_mesa, alt: "Salão com luz da tarde entrando pelas janelas", cap: "O salão no fim da tarde" },
  { p: photos.salao_samambaias_cozinha, alt: "Cozinha aberta vista do salão, sob samambaias", cap: "A cozinha aberta" },
  { p: photos.salao_cozinha_aberta_mesa, alt: "Mesa posta em frente à cozinha aberta", cap: "A mesa perto do fogo" },
  { p: photos.salao_mesa_posta_luz, alt: "Mesa posta com taças, cadeiras de palhinha", cap: "Uma mesa para dois" },
  { p: photos.salao_noite_plantas, alt: "Salão à noite, com plantas e luz baixa", cap: "A casa à noite" },
];

export function Casa() {
  return (
    <section id="casa" className="on-dark bg-mata py-24 text-linho md:py-40">
      <div className="grid gap-10 px-5 md:grid-cols-12 md:gap-8 md:px-10">
        <p className="running-head text-linho/60 md:col-span-2">A casa</p>
        <div className="md:col-span-7 md:col-start-3">
          <h2 className="display text-[clamp(2.4rem,5vw,4.6rem)]">
            Nem parece um restaurante. Parece um lar, uma sala de estar.
          </h2>
          <p className="prose-anga mt-8 text-lg text-linho/85">
            Uma casa de vidro cercada pela Mata Atlântica, com {site.seats} lugares, fogão a lenha e a
            cozinha à vista de todo mundo. Aqui o barulho que se escuta é o da natureza, o tempo corre
            devagar e os convidados acabam conversando entre si. Foi assim que a gente quis.
          </p>
        </div>
      </div>

      <ul className="snap-gallery mt-20 flex gap-4 overflow-x-auto px-5 pb-4 md:mt-28 md:gap-6 md:px-10">
        {galeria.map((g) => (
          <li key={g.p.src} className="w-[82vw] shrink-0 sm:w-[60vw] md:w-[42vw] lg:w-[34vw]">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={g.p.src}
                alt={g.alt}
                fill
                sizes="(max-width: 640px) 82vw, (max-width: 1024px) 42vw, 34vw"
                placeholder="blur"
                blurDataURL={g.p.blur}
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-sm text-linho/60">{g.cap}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
