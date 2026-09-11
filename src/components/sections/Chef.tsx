import Image from "next/image";
import { photos } from "@/content/photos";

export function Chef() {
  const retrato = photos.chef_lydia_jardim_colhendo;
  const dupla = photos.bruno_lydia_cozinha;
  return (
    <section id="chef" className="px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <p className="running-head md:col-span-2">A chef</p>

        <figure className="md:col-span-4 md:col-start-3">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={retrato.src}
              alt="Lydia Gonzalez no jardim, segurando um pé de cúrcuma recém-colhido"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              placeholder="blur"
              blurDataURL={retrato.blur}
              className="object-cover"
            />
          </div>
        </figure>

        <div className="md:col-span-5 md:col-start-8">
          <h2 className="display text-[clamp(2.4rem,5vw,4.6rem)]">Lydia Gonzalez</h2>
          <div className="prose-anga mt-8 text-lg">
            <p>
              Cresceu em Petrópolis ao redor da avó, que era cozinheira. Saiu aos dezessete para
              estudar gastronomia e passou dezessete anos fora, em cozinhas japonesas, tailandesas,
              paraenses, italianas. Na Espanha, trabalhou no El Celler de Can Roca, então o melhor
              restaurante do mundo, no Can Fabes de Santi Santamaria e no Kabuki, em Madri.
            </p>
            <p>
              Voltou para casa ao virar mãe, em 2016, e abriu o Angá no ano seguinte. Desde então
              cozinha só o que a terra daqui oferece. Faz a própria cerâmica, escolhe os vinhos e
              costuma dizer que a cozinha só tem duas regras.
            </p>
          </div>
          <blockquote className="lede mt-12 border-l hairline pl-6">
            O pior inimigo de um cozinheiro é a expectativa. O melhor amigo é a fome.
          </blockquote>
        </div>
      </div>

      <div className="mt-24 grid gap-8 md:mt-32 md:grid-cols-12">
        <div className="md:col-span-5 md:col-start-3">
          <div className="relative aspect-[5/4] overflow-hidden">
            <Image
              src={dupla.src}
              alt="Bruno Sobreira e Lydia Gonzalez na cozinha aberta, montando um prato"
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              placeholder="blur"
              blurDataURL={dupla.blur}
              className="object-cover"
            />
          </div>
        </div>
        <div className="self-end md:col-span-4 md:col-start-9">
          <h3 className="display text-3xl">Bruno Sobreira</h3>
          <p className="prose-anga mt-4 text-mata/85">
            Braço direito da chef e o outro par de mãos que toca o serviço. A cada preparo entrega o
            seu melhor, e a cada serviço, uma piada boba que faz todo mundo rir.
          </p>
        </div>
      </div>
    </section>
  );
}
