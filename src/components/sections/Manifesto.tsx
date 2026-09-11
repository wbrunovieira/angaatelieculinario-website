import { photos } from "@/content/photos";
import { Reveal } from "@/components/Reveal";
import { Frame } from "@/components/Frame";

export function Manifesto() {
  return (
    <section id="anga" className="relative z-10 bg-linho px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-16 md:grid-cols-12 md:gap-8">
        <p className="running-head md:col-span-2">Angá</p>

        <div className="md:col-span-6 md:col-start-3">
          <Reveal as="h2" className="display text-[clamp(2.4rem,5vw,4.6rem)]">
            Em tupi, angá é alma, abrigo. A expressão de uma surpresa agradável.
          </Reveal>
          <Reveal mode="fade" delay={0.35} className="prose-anga mt-12 text-lg">
            <p>
              O Angá nasce do encontro entre natureza, pesquisa e memória. Nossa cozinha acompanha
              o tempo das estações e transforma ingredientes brasileiros em pratos que revelam o
              território de onde vêm.
            </p>
            <p>
              Não é um restaurante; é um ateliê, um lugar onde se faz artesanato. Tudo que a gente
              serve é feito aqui: os pães, as manteigas, os sorvetes, os queijos que curam na casa,
              a louça que sai das mãos da chef.
            </p>
            <p>
              Um serviço em seis etapas que convida a desacelerar, para perceber que um cheiro pode
              guardar lembranças, que uma paisagem tem sabor e que cozinhar é, antes de tudo, uma
              forma de criar conexões.
            </p>
          </Reveal>
        </div>

        <figure className="md:col-span-3 md:col-start-10 md:-mt-10">
          <Frame
            photo={photos.mesa_posta_jardim}
            alt="Mesa posta com taças e guardanapos de linho, o jardim ao fundo"
            sizes="(max-width: 768px) 100vw, 25vw"
            className="aspect-[4/5]"
            speed={0.14}
          />
        </figure>
      </div>

      <figure className="mt-24 grid gap-6 md:mt-32 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4 md:col-start-3">
          <Frame
            photo={photos.bordado_casa_mae}
            alt="Bordado à mão da casa do Angá, com o jardim florido e a árvore ao lado"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="aspect-square"
            speed={0.08}
          />
        </div>
        <figcaption className="self-end md:col-span-4 md:col-start-8">
          <Reveal as="p" className="lede">
            Era pandemia. A gente sonhava com uma casa onde ainda pudesse cozinhar e onde tudo
            pudesse se regenerar. A minha mãe bordou esse sonho.
          </Reveal>
          <Reveal as="p" mode="fade" delay={0.4} className="mt-4 text-sm text-samambaia">
            Lydia Gonzalez, sobre o bordado de 2021
          </Reveal>
        </figcaption>
      </figure>
    </section>
  );
}
