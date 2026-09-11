import { photos, type Photo } from "./photos";

export type Ingrediente = {
  name: string;
  origin: string;
  story: string;
  photo: Photo;
};

export const territorio: Ingrediente[] = [
  {
    name: "Mandioca",
    origin: "A rainha do Brasil",
    story:
      "Aipim, macaxeira, mandioca. Pode chamar como quiser. A melhor época do ano é quando ela fica boa embaixo da terra, e ela sempre aparece no menu nessa hora.",
    photo: photos.mandioca_raizes_tigela,
  },
  {
    name: "Mangarito",
    origin: "Fazenda Pirapitinga",
    story:
      "Foi presença constante nos quintais, cultivado ao lado da mandioca, do cará e da taioba. A batata europeia o empurrou para a raridade. Hoje volta pela mão de agricultores que resgatam espécies e saberes.",
    photo: photos.mangaritos_cesta,
  },
  {
    name: "Caqui",
    origin: "Quintais de Petrópolis",
    story:
      "Chegou ao Brasil com a imigração japonesa e encontrou aqui clima e solo. No outono, marca presença em cada quintal da cidade. Há algo de ritual em colher no ponto exato.",
    photo: photos.caquis_prato,
  },
  {
    name: "Lardo de porco Pirapitinga",
    origin: "Charcutaria Porco Alado, Serra do Rio",
    story:
      "Uma peça de porco com nome e sobrenome. Porcos crioulos criados soltos, comendo frutas, sementes e tubérculos, maturados em sal grosso e especiarias da Mata Atlântica.",
    photo: photos.lardo_porco_pirapitinga,
  },
  {
    name: "Queijo Sapucaia",
    origin: "Terroir fluminense",
    story:
      "Queijo de cabra curado dentro das cuias de sapucaia, uma árvore nativa que contribui para a flora do queijo. Já foi considerado em concursos um dos melhores do mundo.",
    photo: photos.queijo_sapucaia_tigela_madeira,
  },
  {
    name: "Mexerica do jardim",
    origin: "Nosso jardim",
    story:
      "O que está no pé está na mesa. Mexerica, mamão verde, ervas e flores saem do jardim da casa direto para o prato, sem atalhos e sem maquiagem.",
    photo: photos.mexericas_galho_parede,
  },
];
