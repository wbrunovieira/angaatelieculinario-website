import Image from "next/image";
import { photos } from "@/content/photos";

export function Vinhos() {
  const brinde = photos.brinde_vinho_tacas;
  return (
    <section id="vinhos" className="bg-linho-escuro px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <p className="running-head md:col-span-2">Vinhos</p>

        <div className="md:col-span-4 md:col-start-3">
          <h2 className="display text-[clamp(2.4rem,4.4vw,4rem)]">
            Uma carta quase toda brasileira.
          </h2>
          <div className="prose-anga mt-8 text-lg">
            <p>
              Pequenos produtores, vinificação natural ou de mínima intervenção. A chef escolhe cada
              rótulo com a mesma lógica dos ingredientes: tem que expressar o lugar de onde vem.
            </p>
            <p>
              Também há coquetéis da casa e uma seleção de cachaças. E um clarete de pinot noir que
              leva o nome e a ilustração da Lydia, ouro na Grande Prova Vinhos do Brasil de 2026.
            </p>
          </div>
        </div>

        <figure className="md:col-span-4 md:col-start-8">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={brinde.src}
              alt="Duas taças de vinho tinto se tocando sobre a mesa de madeira"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              placeholder="blur"
              blurDataURL={brinde.blur}
              className="object-cover"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
