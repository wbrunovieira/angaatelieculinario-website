export const site = {
  name: "Angá Ateliê Culinário",
  shortName: "Angá",
  tagline: "Cozinha de território inspirada na cultura do nosso Brasil",
  description:
    "Ateliê culinário da chef Lydia Gonzalez em Nogueira, Petrópolis. Menu degustação sazonal em seis etapas, fogão a lenha e 28 lugares, somente com reserva.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://angaatelieculinario.com",
  phoneDisplay: "(24) 98163-1455",
  phoneE164: "+5524981631455",
  whatsapp:
    "https://wa.me/5524981631455?text=" +
    encodeURIComponent("Olá! Gostaria de fazer uma reserva no Angá."),
  instagram: "https://www.instagram.com/angaatelieculinario/",
  instagramHandle: "@angaatelieculinario",
  address: {
    street: "Rua Argentina, 393",
    neighborhood: "Nogueira",
    city: "Petrópolis",
    state: "RJ",
    zip: "25730-120",
  },
  geo: { lat: -22.4263349, lng: -43.1301844 },
  maps: "https://maps.app.goo.gl/?q=-22.4263349,-43.1301844",
  mapsSearch:
    "https://www.google.com/maps/search/?api=1&query=Ang%C3%A1+Ateli%C3%AA+Culin%C3%A1rio+Petr%C3%B3polis",
  hours: [
    { day: "Sexta", label: "jantar", time: "20h à meia-noite" },
    { day: "Sábado", label: "almoço e jantar", time: "13h30 à meia-noite" },
    { day: "Domingo", label: "almoço", time: "13h30 às 18h" },
  ],
  seats: 28,
  photoCredits: [
    "Paula Giolito",
    "Rodrigo Azevedo",
    "Niina",
    "Maria Hennies",
  ],
} as const;
