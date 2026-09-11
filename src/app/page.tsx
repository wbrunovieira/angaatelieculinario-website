import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
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
      <Nav />
      <main>
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
    </>
  );
}
