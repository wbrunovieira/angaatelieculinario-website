import { photos, type Photo } from "./photos";

export type Etapa = {
  title: string;
  ingredients: string[];
  note: string;
  photo: Photo;
};

export const menuAtual = {
  season: "Menu de inverno",
  etapas: [
    {
      title: "Boas-vindas",
      ingredients: ["Queijo Sapucaia", "Pães de fermentação natural", "Manteigas"],
      note: "Um queijo de cabra curado dentro das cuias de sapucaia, árvore nativa, abre a refeição. A gente gosta de dizer que é queijo de terroir fluminense.",
      photo: photos.queijo_sapucaia_cuias,
    },
    {
      title: "Repolho",
      ingredients: ["Repolho na brasa", "Iogurte queimado", "Broa de milho crioulo", "Pecãs", "Mel de uruçu amarela"],
      note: "A primeira etapa vegetal. O repolho vai à brasa até ficar doce por dentro e amargo nas pontas.",
      photo: photos.repolho_brasa_broa,
    },
    {
      title: "Bobó",
      ingredients: ["Mandioca pubada", "Crustáceo na brasa", "Lardo de porco Pirapitinga", "Palmito", "Dendê"],
      note: "Um encontro entre a terra e o mar: a mandioca desmanchando, temperada como um bom bobó, e o lagostim na brasa ligando o litoral às montanhas da Serra.",
      photo: photos.bobo_crustaceo_lardo_brasa,
    },
    {
      title: "Porco",
      ingredients: ["Barriga assada lentamente", "Mangarito", "Mamão verde do jardim", "Tamarindo", "Jiló"],
      note: "Como se fazia nas cozinhas de quintal. O mamão verde é enrolado à mão, fitinha por fitinha, e o mangarito é um tubérculo brasileiro quase esquecido.",
      photo: photos.porco_mangarito_mamao,
    },
    {
      title: "Milho doce",
      ingredients: ["Milho doce", "Açafrão", "Limão"],
      note: "Uma passagem rápida e fresca antes do fim, para a boca pedir de novo.",
      photo: photos.sorvete_tigela_ceramica,
    },
    {
      title: "Banana",
      ingredients: ["Banana", "Missô", "Merengue de mel", "Sequilho de araruta", "Cacau fluminense"],
      note: "Nossas sobremesas têm um objetivo: alegrar a boca sem cansar nem pesar. A gente termina assim para deixar vontade de começar tudo de novo.",
      photo: photos.banana_misso_merengue,
    },
  ] satisfies Etapa[],
};
