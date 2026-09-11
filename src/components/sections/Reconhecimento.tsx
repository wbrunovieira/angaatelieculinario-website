import { depoimentos, premios } from "@/content/reconhecimento";
import { Reveal } from "@/components/Reveal";

export function Reconhecimento() {
  return (
    <section className="relative z-10 bg-linho px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <p className="running-head md:col-span-2">Reconhecimento</p>

        <ul className="divide-y hairline md:col-span-5 md:col-start-3">
          {premios.map((p, i) => (
            <li key={p.who}>
              <Reveal
                mode="fade"
                delay={i * 0.1}
                className="grid gap-1 py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-6"
              >
                <p className="display text-2xl">{p.who}</p>
                <p className="text-mata/80">{p.what}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="space-y-12 md:col-span-4 md:col-start-9">
          {depoimentos.map((d) => (
            <blockquote key={d.who}>
              <Reveal as="p" className="lede">
                {d.quote}
              </Reveal>
              <Reveal as="footer" mode="fade" delay={0.3} className="mt-3 text-sm text-samambaia">
                {d.who}
              </Reveal>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
