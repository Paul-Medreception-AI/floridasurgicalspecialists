import Link from "next/link";
import { notFound } from "next/navigation";

import { renderMarkdownToHtml } from "../hernia/_lib/markdown";
import { getGallbladderDoc } from "./gallbladder-data";

export function GallbladderPage({ slug }: { slug: string }) {
  const doc = getGallbladderDoc(slug);

  if (!doc) {
    notFound();
  }

  const html = renderMarkdownToHtml(doc.bodyMarkdown);

  return (
    <main className="bg-white text-slate-900">
      <section className="hero-gradient">
        <div className="section-shell grid gap-8 py-12 md:gap-10">
          <nav className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link className="hover:text-slate-700" href="/">
                  Home
                </Link>
              </li>
              <li className="text-slate-400">/</li>
              <li>
                <Link className="hover:text-slate-700" href="/gallbladder">
                  Gallbladder
                </Link>
              </li>
              {slug !== "index" ? (
                <>
                  <li className="text-slate-400">/</li>
                  <li className="text-slate-600">{doc.seoTitle}</li>
                </>
              ) : null}
            </ol>
          </nav>
          <p className="eyebrow text-teal-600">Gallbladder &amp; Biliary</p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Florida Surgical Specialists</p>
              <p className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">{doc.seoTitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="btn btn-primary" href="/request-appointment">
                Schedule a Gallbladder Consultation
              </Link>
              <Link className="btn btn-outline" href="/services/gallbladder-liver-disease">
                Gallbladder &amp; Liver Service
              </Link>
            </div>
          </div>
          <p className="max-w-3xl text-lg text-slate-700">{doc.metaDescription}</p>
        </div>
      </section>

      <section className="section-shell py-12">
        <div className="space-y-4" dangerouslySetInnerHTML={{ __html: html }} />
      </section>

      <section className="section-shell pb-16">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-700 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Ready for answers?</h2>
          <p className="mt-3 max-w-3xl">
            We see patients from Bradenton, Palmetto, Parrish, Lakewood Ranch, and Sarasota for gallbladder care with
            robotic expertise, clear diagnostics, and coordinated follow-up.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/request-appointment">
              Schedule a Gallbladder Consultation
            </Link>
            <Link className="btn btn-outline" href="/contact">
              Call our team
            </Link>
          </div>
        </div>
      </section>

      {doc.jsonLdBlocks.map((json, index) => (
        <script
          dangerouslySetInnerHTML={{ __html: json }}
          type="application/ld+json"
          key={`${doc.slug}-jsonld-${index}`}
        />
      ))}
    </main>
  );
}
