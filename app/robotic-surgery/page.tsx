import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { getRoboticPage, getRoboticSlugs } from "./_lib/roboticPages";

function renderText(text: string, keyPrefix: string) {
  const parts: ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <Link key={`${keyPrefix}-link-${match.index}`} href={match[2]} className="text-teal-600 hover:text-teal-700">
        {match[1]}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function renderContent(body: string) {
  let skippedH1 = false;
  let pendingFaq: { question: string; answerParts: string[] } | null = null;
  let keyCounter = 0;

  const nodes: ReactNode[] = [];
  const blocks = body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  const flushPendingFaq = (idx: number) => {
    if (!pendingFaq) return;

    const answer = pendingFaq.answerParts.join("\n\n").trim();
    nodes.push(
      <div
        key={`faq-${idx}-${pendingFaq.question}`}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <p className="text-base font-semibold text-slate-900">{pendingFaq.question}</p>
        {answer ? (
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{renderText(answer, `faq-${keyCounter++}`)}</p>
        ) : null}
      </div>
    );

    pendingFaq = null;
  };

  blocks.forEach((block, idx) => {
    if (!skippedH1 && block.startsWith("# ")) {
      skippedH1 = true;
      return;
    }

    if (block.startsWith("## ")) {
      flushPendingFaq(idx);
      nodes.push(
        <h2 key={`h2-${idx}`} className="text-2xl font-semibold text-slate-900">
          {block.replace(/^##\s*/, "")}
        </h2>
      );
      return;
    }

    if (block.startsWith("### ")) {
      flushPendingFaq(idx);

      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      const question = (lines[0] ?? "").replace(/^###\s*/, "").trim();
      const inlineAnswer = lines.slice(1).join(" ").trim();

      pendingFaq = {
        question,
        answerParts: inlineAnswer ? [inlineAnswer] : [],
      };
      return;
    }

    if (block.startsWith("```")) {
      flushPendingFaq(idx);

      const lines = block.split("\n");
      const lang = lines[0]?.replace(/```/g, "").trim();
      const code = lines.slice(1, -1).join("\n");

      if (lang === "json") {
        try {
          const parsed = JSON.parse(code) as Record<string, unknown>;
          const schemaType = parsed["@type"];
          const schemaContext = parsed["@context"];

          if (schemaContext === "https://schema.org" && typeof schemaType === "string") {
            nodes.push(
              <script
                key={`jsonld-${idx}-${schemaType}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(parsed) }}
              />
            );
            return;
          }
        } catch {
          // fall through and render as code block
        }
      }

      nodes.push(
        <pre
          key={`code-${idx}`}
          className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800"
        >
          <code className={lang ? `language-${lang}` : undefined}>{code}</code>
        </pre>
      );
      return;
    }

    const listLines = block
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const isBulletList = listLines.length > 0 && listLines.every((line) => line.startsWith("- "));

    if (pendingFaq) {
      pendingFaq.answerParts.push(block);
      return;
    }

    if (isBulletList) {
      flushPendingFaq(idx);

      const items = listLines
        .map((line) => line.replace(/^\-\s*/, ""))
        .map((line) => {
          const match = line.match(/^\[(.+?)\]\((.+?)\)\/?$/);
          if (!match) {
            return { label: line, href: "" };
          }

          const label = match[1] ?? line;
          const href = match[2] ?? "";
          return { label, href };
        });

      nodes.push(
        <div key={`list-${idx}`} className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={`${item.label}-${item.href}`}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {item.href ? (
                <Link className="font-semibold text-teal-600 hover:text-teal-700" href={item.href}>
                  {item.label} →
                </Link>
              ) : (
                <p className="font-semibold text-slate-900">{item.label}</p>
              )}
            </article>
          ))}
        </div>
      );
      return;
    }

    nodes.push(
      <p key={`p-${idx}`} className="text-slate-700 leading-relaxed">
        {renderText(block, `p-${keyCounter++}`)}
      </p>
    );
  });

  flushPendingFaq(blocks.length);

  return nodes;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getRoboticPage("index");

  if (!page) {
    return {
      title: "Robotic Surgery | Florida Surgical Specialists",
      description: "Robotic surgery services in Bradenton, Lakewood Ranch, and Sarasota.",
    };
  }

  return {
    title: page.seoTitle || page.h1,
    description: page.metaDescription,
  };
}

export default async function RoboticSurgeryIndexPage() {
  const page = await getRoboticPage("index");
  const slugs = await getRoboticSlugs();
  const cards = await Promise.all(
    slugs
      .filter((slug) => slug !== "index")
      .map(async (slug) => {
        const p = await getRoboticPage(slug);
        return p;
      })
  );

  const visibleCards = cards.filter(Boolean);

  if (!page) {
    notFound();
  }

  return (
    <main className="bg-white text-slate-900">
      <section className="hero-gradient">
        <div className="section-shell space-y-6 py-10">
          <p className="eyebrow text-teal-600">Robotic Surgery</p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 lg:text-5xl">{page.h1}</h1>
          <p className="max-w-3xl text-lg text-slate-700">{page.metaDescription}</p>
          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/request-appointment">
              Schedule a Robotic Surgery Consultation
            </Link>
            <Link className="btn btn-outline" href="/contact">
              Talk with our team
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell py-14 space-y-10">
        <article className="space-y-4">{renderContent(page.content)}</article>

        {visibleCards.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Explore robotic surgery topics</h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {visibleCards.map((card) => (
                <article
                  key={card!.slug}
                  className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Robotic Surgery</p>
                    <h3 className="text-xl font-semibold text-slate-900">{card!.h1}</h3>
                    <p className="text-sm text-slate-600">{card!.metaDescription}</p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link className="font-semibold text-teal-600 hover:text-teal-700" href={`/robotic-surgery/${card!.slug}`}>
                      Read more →
                    </Link>
                    <Link className="btn btn-outline" href="/request-appointment">
                      Schedule consult
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
