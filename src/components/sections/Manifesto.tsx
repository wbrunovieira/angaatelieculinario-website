import Image from "next/image";
import { photos } from "@/content/photos";

export function Manifesto() {
  const mesa = photos.mesa_posta_jardim;
  const bordado = photos.bordado_casa_mae;
  return (
    <section id="anga" className="px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-16 md:grid-cols-12 md:gap-8">
        <p className="running-head md:col-span-2">Angá</p>

        <div className="md:col-span-6 md:col-start-3">
          <h2 className="display text-[clamp(2.4rem,5vw,4.6rem)]">
            Em tupi, angá é alma, abrigo. A expressão de uma surpresa agradável.
          </h2>
          <div className="prose-anga mt-12 text-lg">
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
          </div>
        </div>

        <figure className="md:col-span-3 md:col-start-10 md:-mt-10">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={mesa.src}
              alt="Mesa posta com taças e guardanapos de linho, o jardim ao fundo"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              placeholder="blur"
              blurDataURL={mesa.blur}
              className="object-cover"
            />
          </div>
        </figure>
      </div>

      <figure className="mt-24 grid gap-6 md:mt-32 md:grid-cols-12 md:gap-8">
        <div className="relative aspect-square overflow-hidden md:col-span-4 md:col-start-3">
          <Image
            src={bordado.src}
            alt="Bordado à mão da casa do Angá, com o jardim florido e a árvore ao lado"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            placeholder="blur"
            blurDataURL={bordado.blur}
            className="object-cover"
          />
        </div>
        <figcaption className="self-end md:col-span-4 md:col-start-8">
          <p className="lede">
            Era pandemia. A gente sonhava com uma casa onde ainda pudesse cozinhar e onde tudo
            pudesse se regenerar. A minha mãe bordou esse sonho.
          </p>
          <p className="mt-4 text-sm text-samambaia">Lydia Gonzalez, sobre o bordado de 2021</p>
        </figcaption>
      </figure>
    </section>
  );
}
