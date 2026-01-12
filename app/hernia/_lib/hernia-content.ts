import fs from "node:fs";
import path from "node:path";

export type HerniaMarkdownPage = {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  bodyMarkdown: string;
  jsonLdBlocks: string[];
};

const HERNIA_DIR = path.join(process.cwd(), "content", "pages", "hernia");

function parseFrontmatter(markdown: string): {
  data: Record<string, string>;
  content: string;
} {
  const normalized = markdown.replaceAll("\r\n", "\n");

  if (!normalized.startsWith("---\n")) {
    return { data: {}, content: normalized };
  }

  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) {
    return { data: {}, content: normalized };
  }

  const rawFrontmatter = normalized.slice(4, end);
  const content = normalized.slice(end + "\n---\n".length);

  const data: Record<string, string> = {};
  for (const rawLine of rawFrontmatter.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;

    const idx = line.indexOf(":");
    if (idx === -1) continue;

    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return { data, content };
}

function extractJsonLd(markdown: string): { cleanedMarkdown: string; jsonLdBlocks: string[] } {
  const jsonLdBlocks: string[] = [];
  const cleanedMarkdown = markdown.replace(
    /<script\s+type=["']application\/ld\+json["']\s*>\s*([\s\S]*?)\s*<\/script>/gi,
    (_match, group1: string) => {
      jsonLdBlocks.push(group1.trim());
      return "";
    }
  );

  return { cleanedMarkdown, jsonLdBlocks };
}

export function herniaContentExists() {
  return fs.existsSync(HERNIA_DIR);
}

export function getAllHerniaSlugs(): string[] {
  if (!herniaContentExists()) return [];

  const entries = fs.readdirSync(HERNIA_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name.replace(/\.md$/, ""))
    .filter((slug) => slug !== "index")
    .sort();
}

export function readHerniaMarkdownPage(slug: string): HerniaMarkdownPage | null {
  if (!herniaContentExists()) return null;

  const safeSlug = slug.replaceAll("..", "").replaceAll("/", "");
  const filePath = path.join(HERNIA_DIR, `${safeSlug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = parseFrontmatter(raw);
  const { cleanedMarkdown, jsonLdBlocks } = extractJsonLd(content);

  const seoTitle =
    data.seo_title || data.seoTitle || `${safeSlug} | Florida Surgical Specialists`;
  const metaDescription = data.meta_description || data.metaDescription || "";

  return {
    slug: safeSlug,
    seoTitle,
    metaDescription,
    bodyMarkdown: cleanedMarkdown.trim(),
    jsonLdBlocks,
  };
}
