import { photos } from "@/content/photos";
import { Reveal } from "@/components/Reveal";
import { Frame } from "@/components/Frame";

export function Chef() {
  return (
    <section id="chef" className="relative z-10 bg-linho px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <p className="running-head md:col-span-2">A chef</p>

        <figure className="md:col-span-4 md:col-start-3">
          <Frame
            photo={photos.chef_lydia_jardim_colhendo}
            alt="Lydia Gonzalez no jardim, segurando um pé de cúrcuma recém-colhido"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="aspect-[4/5]"
            speed={0.12}
          />
        </figure>

        <div className="md:col-span-5 md:col-start-8">
          <Reveal as="h2" className="display text-[clamp(2.4rem,5vw,4.6rem)]">
            Lydia Gonzalez
          </Reveal>
          <Reveal mode="fade" delay={0.3} className="prose-anga mt-8 text-lg">
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
          </Reveal>
          <Reveal as="blockquote" className="lede mt-12 border-l hairline pl-6">
            O pior inimigo de um cozinheiro é a expectativa. O melhor amigo é a fome.
          </Reveal>
        </div>
      </div>

      <div className="mt-24 grid gap-8 md:mt-32 md:grid-cols-12">
        <div className="md:col-span-5 md:col-start-3">
          <Frame
            photo={photos.bruno_lydia_cozinha}
            alt="Bruno Sobreira e Lydia Gonzalez na cozinha aberta, montando um prato"
            sizes="(max-width: 768px) 100vw, 42vw"
            className="aspect-[5/4]"
            speed={0.1}
          />
        </div>
        <div className="self-end md:col-span-4 md:col-start-9">
          <Reveal as="h3" className="display text-3xl">
            Bruno Sobreira
          </Reveal>
          <Reveal as="p" mode="fade" delay={0.2} className="prose-anga mt-4 text-mata/85">
            Braço direito da chef e o outro par de mãos que toca o serviço. A cada preparo entrega o
            seu melhor, e a cada serviço, uma piada boba que faz todo mundo rir.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
