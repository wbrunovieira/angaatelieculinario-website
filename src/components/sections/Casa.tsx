import { photos } from "@/content/photos";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { CasaGallery } from "./CasaGallery";

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
    <section id="casa" className="on-dark relative z-10 bg-mata text-linho">
      <div className="grid gap-10 px-5 pt-24 md:grid-cols-12 md:gap-8 md:px-10 md:pt-40">
        <p className="running-head text-linho/60 md:col-span-2">A casa</p>
        <div className="pb-20 md:col-span-7 md:col-start-3 md:pb-28">
          <Reveal as="h2" className="display text-[clamp(2.4rem,5vw,4.6rem)]">
            Nem parece um restaurante. Parece um lar, uma sala de estar.
          </Reveal>
          <Reveal as="p" mode="fade" delay={0.3} className="prose-anga mt-8 text-lg text-linho/85">
            Uma casa de vidro cercada pela Mata Atlântica, com {site.seats} lugares, fogão a lenha e a
            cozinha à vista de todo mundo. Aqui o barulho que se escuta é o da natureza, o tempo corre
            devagar e os convidados acabam conversando entre si. Foi assim que a gente quis.
          </Reveal>
        </div>
      </div>
      <CasaGallery items={galeria} />
      <div className="h-24 md:h-0" />
    </section>
  );
}
