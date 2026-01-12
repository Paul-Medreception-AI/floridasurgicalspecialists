import type { Metadata } from "next";

import { getGallbladderDoc, getGallbladderSlugs } from "../gallbladder-data";
import { GallbladderPage } from "../gallbladder-page";

type Params = { slug: string };

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  return getGallbladderSlugs()
    .filter((slug) => slug !== "index")
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getGallbladderDoc(slug);

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

export default async function GallbladderSlugPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  return <GallbladderPage slug={slug} />;
}
