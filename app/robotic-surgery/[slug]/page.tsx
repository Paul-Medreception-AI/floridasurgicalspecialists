import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getRoboticPage, getRoboticSlugs } from "../_lib/roboticPages";

type Params = { slug: string };

function renderText(text: string, keyPrefix: string) {
  const parts: React.ReactNode[] = [];
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

function renderMarkdown(body: string) {
  const withoutSchema = body.split("```json")[0];
  const lines = withoutSchema.split("\n");
  const elements: React.ReactNode[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let keyCounter = 0;

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      const text = paragraph.join(" ").trim();
      if (text) {
        elements.push(
          <p key={`p-${keyCounter++}`} className="text-slate-700">
            {renderText(text, `p-${keyCounter}`)}
          </p>
        );
      }
      paragraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${keyCounter++}`} className="ml-6 list-disc space-y-1 text-slate-700">
          {listItems.map((item, idx) => (
            <li key={`li-${keyCounter}-${idx}`}>{renderText(item, `li-${keyCounter}-${idx}`)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h2 key={`h2-${keyCounter++}`} className="text-2xl font-semibold text-slate-900">
          {line.replace(/^##\s*/, "")}
        </h2>
      );
      continue;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h2 key={`h2-${keyCounter++}`} className="text-2xl font-semibold text-slate-900">
          {line.replace(/^#\s*/, "")}
        </h2>
      );
      continue;
    }

    if (line.startsWith("- ")) {
      listItems.push(line.replace(/^-+\s*/, ""));
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return elements;
}

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getRoboticSlugs();
  return slugs.filter((slug) => slug !== "index").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getRoboticPage(slug);

  if (!page) {
    return {
      title: "Page not found | Florida Surgical Specialists",
    };
  }

  return {
    title: page.seoTitle || page.h1,
    description: page.metaDescription,
  };
}

export default async function RoboticDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = await getRoboticPage(slug);

  if (!page) {
    notFound();
  }

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
              <Link href="/robotic-surgery" className="hover:text-slate-900">
                Robotic Surgery
              </Link>
              <span className="text-slate-400">/</span>
              <span className="font-semibold text-slate-800">{page.h1}</span>
            </div>
          </nav>

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

      <section className="section-shell py-14">
        <article className="space-y-4">{renderMarkdown(page.content)}</article>
      </section>
    </main>
  );
}
