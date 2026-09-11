import { territorio } from "@/content/territorio";
import { Reveal } from "@/components/Reveal";
import { Frame } from "@/components/Frame";
import { TerritorioList } from "./TerritorioList";

export function Territorio() {
  return (
    <section id="territorio" className="relative z-10 bg-linho px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <p className="running-head md:col-span-2">Território</p>
        <div className="md:col-span-7 md:col-start-3">
          <Reveal as="h2" className="display text-[clamp(2.4rem,5vw,4.6rem)]">
            Cozinhar a nossa terra e os hábitos da nossa gente é o que nos alegra.
          </Reveal>
          <Reveal as="p" mode="fade" delay={0.3} className="prose-anga mt-8 text-lg">
            Petrópolis guarda o maior polo de produção orgânica do Rio de Janeiro. A chef visita as
            roças, escolhe fruta por fruta e traz para a mesa ingredientes que quase saíram do
            repertório brasileiro. Cada um tem uma história.
          </Reveal>
        </div>
      </div>

      {/* Desktop: lista com foto flutuante */}
      <div className="mt-20 hidden md:mt-32 md:block">
        <TerritorioList />
      </div>

      {/* Mobile: grade com fotos */}
      <ul className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 md:hidden">
        {territorio.map((item) => (
          <li key={item.name}>
            <Frame photo={item.photo} alt={item.name} sizes="(max-width: 640px) 100vw, 50vw" className="aspect-[4/5]" />
            <h3 className="display mt-6 text-3xl">{item.name}</h3>
            <p className="mt-1 text-sm text-samambaia">{item.origin}</p>
            <p className="prose-anga mt-4 text-[0.97rem] text-mata/85">{item.story}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
