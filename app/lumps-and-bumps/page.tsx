import type { Metadata } from "next";
import Link from "next/link";

import { lumpsAndBumpsPages } from "./_data/pages";
import type { LumpGroup } from "./_data/types";

export const metadata: Metadata = {
  title: "Lumps & Bumps Evaluation and Removal | Florida Surgical Specialists",
  description:
    "Worried about a lump, bump, cyst, or lipoma? Get fast, surgeon-led evaluation and removal planning in Bradenton, Lakewood Ranch, and Sarasota.",
};

const groupOrder: LumpGroup[] = [
  "Types of lumps",
  "Symptoms",
  "Cancer concern",
  "Removal & treatment",
  "After removal",
  "Cost & insurance",
  "Locations",
];

const groupHeadlines: Record<LumpGroup, { title: string; description: string }> = {
  "Types of lumps": {
    title: "Types of lumps we evaluate",
    description:
      "Learn about common causes like lipomas and cysts and when it makes sense to remove a lump for comfort or peace of mind.",
  },
  Symptoms: {
    title: "Symptom-based concerns",
    description:
      "Search by what you’re noticing—painless vs painful, growing vs firm, or location-specific lumps (back, neck, arm, leg, abdomen).",
  },
  "Cancer concern": {
    title: "When you’re worried about cancer",
    description:
      "Most lumps are benign, but certain red flags deserve a prompt evaluation. Here’s how we guide next steps calmly and clearly.",
  },
  "Removal & treatment": {
    title: "Removal & treatment options",
    description:
      "Office or outpatient options, local anesthesia, scar-conscious technique, and a clear plan for the safest next step.",
  },
  "After removal": {
    title: "After removal & recovery",
    description:
      "What to expect after a lump removal procedure—stitches, pain control, return to work, and recurrence prevention.",
  },
  "Cost & insurance": {
    title: "Cost & insurance questions",
    description:
      "Understand what affects cost and how we keep evaluation and treatment efficient for West-Central Florida patients.",
  },
  Locations: {
    title: "Local pages",
    description:
      "Bradenton, Lakewood Ranch, Sarasota, and nearby communities—fast evaluation, no missed calls, and efficient scheduling.",
  },
};

function groupPages() {
  const groups = new Map<LumpGroup, typeof lumpsAndBumpsPages>();

  for (const page of lumpsAndBumpsPages) {
    const existing = groups.get(page.group) ?? [];
    existing.push(page);
    groups.set(page.group, existing);
  }

  return groupOrder
    .filter((group) => (groups.get(group)?.length ?? 0) > 0)
    .map((group) => ({ group, pages: groups.get(group) ?? [] }));
}

export default function LumpsAndBumpsIndexPage() {
  const grouped = groupPages();

  return (
    <main className="bg-white text-slate-900">
      <section className="hero-gradient">
        <div className="section-shell space-y-6 py-14">
          <p className="eyebrow text-teal-600">Lumps &amp; Bumps</p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 lg:text-5xl">
            Lump, Bump, Cyst, and Lipoma Evaluation in Bradenton &amp; Sarasota
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Finding a new lump can be stressful. Florida Surgical Specialists provides surgeon-led evaluation and
            straightforward next steps for patients in Bradenton, Lakewood Ranch, and Sarasota. Many lumps are benign,
            but you deserve clarity, fast scheduling, and a plan you can trust.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Fast evaluation</p>
              <p className="mt-2 text-sm text-slate-700">
                Focused exam and next steps without unnecessary delays.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Same-week options</p>
              <p className="mt-2 text-sm text-slate-700">
                Office or outpatient removal planning when appropriate.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">No missed calls</p>
              <p className="mt-2 text-sm text-slate-700">
                AI-answered phones help you schedule quickly and get questions answered.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/request-appointment">
              Schedule a Lump Evaluation
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
                        href={`/lumps-and-bumps/${page.slug}`}
                      >
                        Read more →
                      </Link>
                      <Link className="btn btn-outline" href="/request-appointment">
                        Schedule a Lump Evaluation
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
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Schedule a Lump Evaluation</h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            If you have a lump that’s growing, painful, firm, or simply worrying you, we can help. Our team serves
            Bradenton, Lakewood Ranch, and Sarasota with fast scheduling, office and outpatient options, and
            scar-conscious technique.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/request-appointment">
              Schedule a Lump Evaluation
            </Link>
            <Link className="btn btn-outline" href="/services/skin-soft-tissue">
              Explore Skin &amp; Soft Tissue care
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
                  name: "Do all lumps need to be removed?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Some lumps can be safely observed. Removal is often recommended for growth, pain, recurrent inflammation, uncertain diagnosis, or patient preference.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can you remove a lump the same week?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Often, yes. After evaluation we can determine whether in-office removal is appropriate or whether outpatient removal is safer, and then schedule efficiently.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Will removal leave a scar?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Any incision can scar, but we use scar-conscious technique and provide aftercare guidance to minimize scarring.",
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
