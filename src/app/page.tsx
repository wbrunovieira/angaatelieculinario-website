import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { Cursor } from "@/components/Cursor";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Etapas } from "@/components/sections/Etapas";
import { Territorio } from "@/components/sections/Territorio";
import { Casa } from "@/components/sections/Casa";
import { Chef } from "@/components/sections/Chef";
import { Vinhos } from "@/components/sections/Vinhos";
import { Reconhecimento } from "@/components/sections/Reconhecimento";
import { Reservas } from "@/components/sections/Reservas";

export default function Home() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Preloader />
      <Cursor />
      <Nav />
      <main id="conteudo">
        <Hero />
        <Manifesto />
        <Etapas />
        <Territorio />
        <Casa />
        <Chef />
        <Vinhos />
        <Reconhecimento />
        <Reservas />
      </main>
      <Footer />
      <div className="grain" aria-hidden />
    </>
  );
}
