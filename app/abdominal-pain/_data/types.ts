export type AbdominalPainGroup =
  | "Location of pain"
  | "Timing & triggers"
  | "Associated symptoms"
  | "Surgical causes"
  | "When to worry"
  | "Testing & imaging"
  | "Local pages";

export type FAQItem = {
  question: string;
  answer: string;
};

export type AbdominalPainPage = {
  slug: string;
  group: AbdominalPainGroup;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  keyPoints: string[];
  faqs: FAQItem[];
  relatedSlugs: string[];
};
