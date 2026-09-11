import { depoimentos, premios } from "@/content/reconhecimento";

export function Reconhecimento() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <p className="running-head md:col-span-2">Reconhecimento</p>

        <ul className="divide-y hairline md:col-span-5 md:col-start-3">
          {premios.map((p) => (
            <li key={p.who} className="grid gap-1 py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-6">
              <p className="display text-2xl">{p.who}</p>
              <p className="text-mata/80">{p.what}</p>
            </li>
          ))}
        </ul>

        <div className="space-y-12 md:col-span-4 md:col-start-9">
          {depoimentos.map((d) => (
            <blockquote key={d.who}>
              <p className="lede">{d.quote}</p>
              <footer className="mt-3 text-sm text-samambaia">{d.who}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
