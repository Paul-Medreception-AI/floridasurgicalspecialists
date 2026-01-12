import type { Metadata } from "next";
import Link from "next/link";

import { abdominalPainPages } from "./_data/pages";
import type { AbdominalPainGroup } from "./_data/types";

export const metadata: Metadata = {
  title: "Abdominal Pain Evaluation | Florida Surgical Specialists",
  description:
    "Abdominal pain can be caused by gallbladder disease, hernias, appendicitis, diverticulitis, or other surgical conditions. Get fast, surgeon-led evaluation and imaging coordination in Bradenton, Lakewood Ranch, and Sarasota.",
};

const groupOrder: AbdominalPainGroup[] = [
  "Location of pain",
  "Timing & triggers",
  "Associated symptoms",
  "Surgical causes",
  "When to worry",
  "Testing & imaging",
  "Local pages",
];

const groupHeadlines: Record<AbdominalPainGroup, { title: string; description: string }> = {
  "Location of pain": {
    title: "Search by where it hurts",
    description:
      "Location is one of the most useful clues. Explore right upper, right lower, left lower, and belly-button pain patterns and what they can mean.",
  },
  "Timing & triggers": {
    title: "Search by timing and trigger",
    description:
      "Pain after eating, at night, or in repeated attacks can follow specific surgical patterns—especially gallbladder disease.",
  },
  "Associated symptoms": {
    title: "Search by symptoms",
    description:
      "Fever, vomiting, bloating, and bowel changes help determine urgency and what testing is most helpful.",
  },
  "Surgical causes": {
    title: "Common surgical causes",
    description:
      "Learn about appendicitis, diverticulitis, bowel obstruction patterns, gallbladder disease, and hernias—plus when to act.",
  },
  "When to worry": {
    title: "When it’s serious",
    description:
      "If pain is worsening, persistent, or paired with red flags, fast evaluation matters.",
  },
  "Testing & imaging": {
    title: "Testing and imaging",
    description:
      "Ultrasound and CT can clarify urgent diagnoses and speed the right treatment plan.",
  },
  "Local pages": {
    title: "Local evaluation pages",
    description:
      "Serving Bradenton, Lakewood Ranch, Sarasota, and surrounding West-Central Florida with fast scheduling and clear next steps.",
  },
};

function groupPages() {
  const groups = new Map<AbdominalPainGroup, typeof abdominalPainPages>();

  for (const page of abdominalPainPages) {
    const existing = groups.get(page.group) ?? [];
    existing.push(page);
    groups.set(page.group, existing);
  }

  return groupOrder
    .filter((group) => (groups.get(group)?.length ?? 0) > 0)
    .map((group) => ({ group, pages: groups.get(group) ?? [] }));
}

export default function AbdominalPainIndexPage() {
  const grouped = groupPages();

  return (
    <main className="bg-white text-slate-900">
      <section className="hero-gradient">
        <div className="section-shell space-y-6 py-14">
          <p className="eyebrow text-teal-600">Abdominal Pain</p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 lg:text-5xl">
            Abdominal Pain Evaluation in Bradenton &amp; Sarasota
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Abdominal pain can be stressful—especially when it’s worsening, recurring, or paired with vomiting or
            fever. Florida Surgical Specialists provides surgeon-led evaluation and clear next steps for patients in
            Bradenton, Lakewood Ranch, and Sarasota.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Fast evaluation</p>
              <p className="mt-2 text-sm text-slate-700">Focused visit that prioritizes diagnostic clarity.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Same-week imaging</p>
              <p className="mt-2 text-sm text-slate-700">Coordinated ultrasound or CT when it changes the plan.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">No missed calls</p>
              <p className="mt-2 text-sm text-slate-700">AI-answered phones help you schedule quickly.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/request-appointment">
              Get Abdominal Pain Evaluated
            </Link>
            <Link className="btn btn-outline" href="/contact">
              Talk with our team
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="space-y-10">
          {grouped.map(({ group, pages }) => (
            <section key={group} className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-slate-900">{groupHeadlines[group].title}</h2>
                <p className="max-w-3xl text-slate-600">{groupHeadlines[group].description}</p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {pages.map((page) => (
                  <article
                    key={page.slug}
                    className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">{page.group}</p>
                      <h3 className="text-xl font-semibold text-slate-900">{page.h1}</h3>
                      <p className="text-sm text-slate-600">{page.metaDescription}</p>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        className="font-semibold text-teal-600 hover:text-teal-700"
                        href={`/abdominal-pain/${page.slug}`}
                      >
                        Read more →
                      </Link>
                      <Link className="btn btn-outline" href="/request-appointment">
                        Get Abdominal Pain Evaluated
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="section-shell pb-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-md">
          <p className="eyebrow text-teal-600">Next step</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Get Abdominal Pain Evaluated</h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            If your pain is persistent, worsening, or recurring—or if you’re noticing fever, vomiting, or increasing
            bloating—our team can help you get answers and a plan. Serving Bradenton, Lakewood Ranch, and Sarasota.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/request-appointment">
              Get Abdominal Pain Evaluated
            </Link>
            <Link className="btn btn-outline" href="/services">
              Explore surgical services
            </Link>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How do I know if my abdominal pain is serious?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Pain that is worsening, persistent, localized, or paired with fever, vomiting, or increasing bloating deserves prompt evaluation.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can you coordinate imaging?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. When appropriate, we coordinate ultrasound or CT to clarify the diagnosis and speed the right plan.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you see patients in Bradenton and Sarasota?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. We serve Bradenton, Lakewood Ranch, Sarasota, and nearby communities with fast scheduling and surgeon-led evaluation.",
                  },
                },
              ],
            }),
          }}
        />
      </section>
    </main>
  );
}
