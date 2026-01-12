import fs from "fs/promises";
import path from "path";

type ParsedFrontMatter = {
  seoTitle: string;
  metaDescription: string;
};

export type RoboticPage = ParsedFrontMatter & {
  slug: string;
  h1: string;
  content: string;
};

const ROBOTIC_DIR = path.join(process.cwd(), "robotic-surgery");

async function parseFrontMatter(raw: string): Promise<ParsedFrontMatter> {
  const lines = raw.split("\n");
  const seoLine = lines.find((line) => line.startsWith("seo_title:"));
  const metaLine = lines.find((line) => line.startsWith("meta_description:"));

  const seoTitle = seoLine ? seoLine.replace(/^seo_title:\s*"/, "").replace(/"$/, "") : "";
  const metaDescription = metaLine ? metaLine.replace(/^meta_description:\s*"/, "").replace(/"$/, "") : "";

  return { seoTitle, metaDescription };
}

function extractH1(body: string): string {
  const h1Line = body.split("\n").find((line) => line.startsWith("# "));
  return h1Line ? h1Line.replace(/^#\s*/, "").trim() : "";
}

async function loadFile(slug: string): Promise<RoboticPage> {
  const filename = slug === "index" ? "index.md" : `${slug}.md`;
  const filePath = path.join(ROBOTIC_DIR, filename);
  const raw = await fs.readFile(filePath, "utf-8");

  const parts = raw.split("---");
  const fm = parts.length > 2 ? parts[1] : "";
  const body = parts.length > 2 ? parts.slice(2).join("---").trim() : raw;

  const { seoTitle, metaDescription } = await parseFrontMatter(fm);
  const h1 = extractH1(body);

  return { slug, seoTitle, metaDescription, h1, content: body.trim() };
}

export async function getRoboticSlugs(): Promise<string[]> {
  const files = await fs.readdir(ROBOTIC_DIR);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""))
    .sort();
}

export async function getRoboticPage(slug: string): Promise<RoboticPage | null> {
  try {
    return await loadFile(slug);
  } catch {
    return null;
  }
}
