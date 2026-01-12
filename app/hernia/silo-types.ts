export type HerniaSiloGroup =
  | "Hernia Types"
  | "Symptoms & Pain"
  | "Treatment & Surgery"
  | "Recovery & Lifestyle"
  | "Cost & Insurance"
  | "When to See a Surgeon"
  | "Location Pages";

export type HerniaFaqItem = {
  question: string;
  answer: string;
};

export type HerniaSiloPage = {
  slug: string;
  group: HerniaSiloGroup;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  sections: Array<{ title: string; body: string[] }>;
  faq: HerniaFaqItem[];
};
