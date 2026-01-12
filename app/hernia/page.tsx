import type { Metadata } from "next";
import Link from "next/link";
import { readHerniaMarkdownPage } from "./_lib/hernia-content";
import { renderMarkdownToHtml } from "./_lib/markdown";

export async function generateMetadata(): Promise<Metadata> {
  const page = readHerniaMarkdownPage("index");

  if (!page) {
    return {
      title: "Hernia Care | Florida Surgical Specialists",
    };
  }

  return {
    title: page.seoTitle,
    description: page.metaDescription,
  };
}

export default function HerniaIndexPage() {
  const page = readHerniaMarkdownPage("index");

  if (!page) {
    return (
      <main className="bg-white text-slate-900">
        <section className="hero-gradient">
          <div className="section-shell space-y-6 py-12">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link className="font-semibold text-teal-600 hover:text-teal-700" href="/">
                    Home
                  </Link>
                </li>
                <li className="text-slate-400">/</li>
                <li className="font-semibold text-slate-700">Hernia</li>
              </ol>
            </nav>
            <p className="eyebrow text-teal-600">Hernia Care</p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 lg:text-5xl">
              Hernia Care in Bradenton, Lakewood Ranch & Sarasota
            </h1>
            <p className="max-w-3xl text-lg text-slate-700">
              This URL is reserved for the Florida Surgical Specialists hernia education silo. Add your silo markdown
              files under <span className="font-semibold">content/pages/hernia</span> to publish the full set of
              hernia pages.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link className="btn btn-primary" href="/request-appointment">
                Schedule a Hernia Consultation
              </Link>
              <Link className="btn btn-outline" href="/contact">
                Talk with our team
              </Link>
              <Link className="btn btn-outline" href="/services/hernias">
                View Hernia Service Page
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const html = renderMarkdownToHtml(page.bodyMarkdown);

  return (
    <main className="bg-white text-slate-900">
      <section className="hero-gradient">
        <div className="section-shell space-y-6 py-12">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link className="font-semibold text-teal-600 hover:text-teal-700" href="/">
                  Home
                </Link>
              </li>
              <li className="text-slate-400">/</li>
              <li className="font-semibold text-slate-700">Hernia</li>
            </ol>
          </nav>
          <p className="eyebrow text-teal-600">Hernia Care</p>

          <div
            className="max-w-4xl space-y-3"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="flex flex-wrap gap-3 pt-2">
            <Link className="btn btn-primary" href="/request-appointment">
              Schedule a Hernia Consultation
            </Link>
            <Link className="btn btn-outline" href="/contact">
              Talk with our team
            </Link>
            <Link className="btn btn-outline" href="/services/hernias">
              View Hernia Service Page
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
