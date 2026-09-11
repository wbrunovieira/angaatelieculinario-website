import Image from "next/image";
import { territorio } from "@/content/territorio";

export function Territorio() {
  return (
    <section id="territorio" className="px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <p className="running-head md:col-span-2">Território</p>
        <div className="md:col-span-7 md:col-start-3">
          <h2 className="display text-[clamp(2.4rem,5vw,4.6rem)]">
            Cozinhar a nossa terra e os hábitos da nossa gente é o que nos alegra.
          </h2>
          <p className="prose-anga mt-8 text-lg">
            Petrópolis guarda o maior polo de produção orgânica do Rio de Janeiro. A chef visita as
            roças, escolhe fruta por fruta e traz para a mesa ingredientes que quase saíram do
            repertório brasileiro. Cada um tem uma história. Estas são algumas.
          </p>
        </div>
      </div>

      <ul className="mt-20 grid gap-x-8 gap-y-16 sm:grid-cols-2 md:mt-32 md:grid-cols-3">
        {territorio.map((item, i) => (
          <li key={item.name} className={i % 3 === 1 ? "md:translate-y-16" : ""}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={item.photo.src}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL={item.photo.blur}
                className="object-cover"
              />
            </div>
            <h3 className="display mt-6 text-3xl">{item.name}</h3>
            <p className="mt-1 text-sm text-samambaia">{item.origin}</p>
            <p className="prose-anga mt-4 text-[0.97rem] text-mata/85">{item.story}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
