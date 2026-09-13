export const site = {
  name: "Convalt Energy",
  shortName: "Convalt",
  tagline: "Integrated renewable energy, manufacturing, and infrastructure.",
  description:
    "Convalt Energy develops solar manufacturing, utility-scale generation, and advanced energy infrastructure.",
  url: "https://www.convalt.com",
};

export const chapters = [
  {
    id: "hero",
    navLabel: "Home",
    inNav: false,
    kicker: "Renewable energy",
    title: "Convalt Energy",
    body: "Integrated renewable energy, manufacturing, and infrastructure.",
    cta: {
      href: "#solar-manufacturing",
      label: "Explore",
    },
  },
  {
    id: "solar-manufacturing",
    navLabel: "Solar Manufacturing",
    inNav: true,
    kicker: "Business",
    title: "Solar Manufacturing",
    body: "Solar PV manufacturing as part of an integrated energy value chain.",
  },
  {
    id: "power-generation",
    navLabel: "Power Generation",
    inNav: true,
    kicker: "Business",
    title: "Power Generation",
    body: "Utility-scale power generation within the integrated energy platform.",
  },
  {
    id: "data-centers",
    navLabel: "Data Centers",
    inNav: true,
    kicker: "Business",
    title: "Data Centers",
    body: "Data center development as energy infrastructure.",
  },
  {
    id: "recycling",
    navLabel: "Recycling",
    inNav: true,
    kicker: "Business",
    title: "Recycling",
    body: "Recycling within the integrated energy value chain.",
  },
];

export const navItems = chapters
  .filter((chapter) => chapter.inNav)
  .map((chapter) => ({
    href: `#${chapter.id}`,
    label: chapter.navLabel,
  }));
