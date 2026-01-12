import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { abdominalPainPages, abdominalPainSlugs, getAbdominalPainPageBySlug } from "../_data/pages";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return abdominalPainSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getAbdominalPainPageBySlug(slug);

  if (!page) {
    return {
      title: "Page not found | Florida Surgical Specialists",
    };
  }

  return {
    title: page.seoTitle,
    description: page.metaDescription,
  };
}

function titleCaseFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function AbdominalPainDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const page = getAbdominalPainPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const related = page.relatedSlugs.map((relatedSlug) => getAbdominalPainPageBySlug(relatedSlug)).filter(Boolean);

  const moreToExplore = abdominalPainPages
    .filter((p) => p.slug !== page.slug)
    .filter((p) => p.group === page.group)
    .slice(0, 6);

  return (
    <main className="bg-white text-slate-900">
      <section className="hero-gradient">
        <div className="section-shell space-y-6 py-10">
          <nav className="text-sm text-slate-600">
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/" className="hover:text-slate-900">
                Home
              </Link>
              <span className="text-slate-400">/</span>
              <Link href="/abdominal-pain" className="hover:text-slate-900">
                Abdominal Pain
              </Link>
              <span className="text-slate-400">/</span>
              <span className="font-semibold text-slate-800">{titleCaseFromSlug(page.slug)}</span>
            </div>
          </nav>

          <p className="eyebrow text-teal-600">{page.group}</p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 lg:text-5xl">{page.h1}</h1>
          <p className="max-w-3xl text-lg text-slate-700">{page.intro}</p>

          <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:grid-cols-3 md:gap-6">
            {page.keyPoints.map((point) => (
              <div key={point} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                <span className="mt-1 text-teal-600">✓</span>
                <p>{point}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/request-appointment">
              Get Abdominal Pain Evaluated
            </Link>
            <Link className="btn btn-outline" href="/contact">
              Talk with our team
            </Link>
          </div>

          <p className="text-sm text-slate-600">
            Scheduling is designed to be fast and responsive—AI-answered phones help ensure no missed calls.
          </p>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-10">
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">What to know</h2>
              <div className="space-y-4 leading-relaxed text-slate-700">
                <p>
                  Abdominal pain is best evaluated by pattern: where it is located, whether it’s worsening, what triggers
                  it, and what symptoms come with it.
                </p>
                <p>
                  For patients in Bradenton, Lakewood Ranch, and Sarasota, we focus on getting the right test when it
                  changes urgency and the treatment plan.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">Frequently asked questions</h2>
              <div className="space-y-6">
                {page.faqs.map((faq) => (
                  <div key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-base font-semibold text-slate-900">{faq.question}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-2 rounded-3xl border border-slate-200 bg-white p-8 shadow-md">
              <p className="eyebrow text-teal-600">Next step</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Get Abdominal Pain Evaluated</h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                If your symptoms are persistent, worsening, or recurring, we can help you get clarity and a plan you can
                trust—often with same-week imaging coordination when appropriate.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="btn btn-primary" href="/request-appointment">
                  Get Abdominal Pain Evaluated
                </Link>
                <Link className="btn btn-outline" href="/abdominal-pain">
                  Back to Abdominal Pain
                </Link>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-teal-600">Related reading</p>
              <ul className="mt-4 space-y-2 text-sm">
                {related.length > 0 ? (
                  related.map((relatedPage) => (
                    <li key={relatedPage!.slug}>
                      <Link
                        className="font-semibold text-teal-600 hover:text-teal-700"
                        href={`/abdominal-pain/${relatedPage!.slug}`}
                      >
                        {relatedPage!.h1}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-600">Explore more abdominal pain topics below.</li>
                )}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-teal-600">More in {page.group}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {moreToExplore.map((p) => (
                  <li key={p.slug}>
                    <Link className="text-slate-700 hover:text-slate-900" href={`/abdominal-pain/${p.slug}`}>
                      {p.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: page.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      </section>
    </main>
  );
}
