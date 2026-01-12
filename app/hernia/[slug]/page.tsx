import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllHerniaSlugs, readHerniaMarkdownPage } from "../_lib/hernia-content";
import { renderMarkdownToHtml } from "../_lib/markdown";

type Params = { slug: string };

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export function generateStaticParams() {
  return getAllHerniaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = readHerniaMarkdownPage(slug);

  if (!page) {
    return { title: "Hernia page not found | Florida Surgical Specialists" };
  }

  return {
    title: page.seoTitle,
    description: page.metaDescription,
  };
}

export default async function HerniaSiloPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const page = readHerniaMarkdownPage(slug);

  if (!page) {
    notFound();
  }

  const html = renderMarkdownToHtml(page.bodyMarkdown);

  return (
    <main className="bg-white text-slate-900">
      <section className="hero-gradient">
        <div className="section-shell space-y-5 py-12">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link className="font-semibold text-teal-600 hover:text-teal-700" href="/">
                  Home
                </Link>
              </li>
              <li className="text-slate-400">/</li>
              <li>
                <Link className="font-semibold text-teal-600 hover:text-teal-700" href="/hernia">
                  Hernia
                </Link>
              </li>
              <li className="text-slate-400">/</li>
              <li className="font-semibold text-slate-700">{page.slug}</li>
            </ol>
          </nav>
          <p className="eyebrow text-teal-600">Hernia Care</p>
          <div
            className="max-w-4xl space-y-3"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="flex flex-wrap gap-3 pt-4">
            <Link className="btn btn-primary" href="/request-appointment">
              Schedule a Hernia Consultation
            </Link>
            <Link className="btn btn-outline" href="/contact">
              Talk with our team
            </Link>
            <Link className="btn btn-outline" href="/hernia">
              Back to Hernia Silo
            </Link>
          </div>
        </div>
      </section>

      {page.jsonLdBlocks.map((json, idx) => (
        <script
          dangerouslySetInnerHTML={{ __html: json }}
          type="application/ld+json"
          key={`${page.slug}-jsonld-${idx}`}
        />
      ))}
    </main>
  );
}
