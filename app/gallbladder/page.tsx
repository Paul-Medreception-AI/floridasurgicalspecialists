import type { Metadata } from "next";

import { getGallbladderDoc } from "./gallbladder-data";
import { GallbladderPage } from "./gallbladder-page";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const doc = getGallbladderDoc("index");

  if (!doc) {
    return {
      title: "Gallbladder care | Florida Surgical Specialists",
    };
  }

  return {
    title: doc.seoTitle,
    description: doc.metaDescription,
  };
}

export default function GallbladderIndexPage() {
  return <GallbladderPage slug="index" />;
}
