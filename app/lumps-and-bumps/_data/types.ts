export type LumpGroup =
  | "Types of lumps"
  | "Symptoms"
  | "Cancer concern"
  | "Removal & treatment"
  | "After removal"
  | "Cost & insurance"
  | "Locations";

export type FAQItem = {
  question: string;
  answer: string;
};

export type LumpPage = {
  slug: string;
  group: LumpGroup;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  keyPoints: string[];
  faqs: FAQItem[];
  relatedSlugs: string[];
};
