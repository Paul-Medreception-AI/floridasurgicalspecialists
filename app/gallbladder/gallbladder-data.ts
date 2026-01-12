import fs from "fs";
import path from "path";

export type GallbladderMarkdownPage = {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  bodyMarkdown: string;
  jsonLdBlocks: string[];
};

const CONTENT_DIR = path.join(process.cwd(), "content", "gallbladder");

function buildFaqMarkdown(jsonText: string) {
  try {
    const parsed = JSON.parse(jsonText) as {
      mainEntity?: { name?: string; acceptedAnswer?: { text?: string } }[];
    };

    const entities = parsed.mainEntity ?? [];
    if (!entities.length) return [];

    return entities.map((entity) => {
      const question = entity.name?.trim() ?? "";
      const answer = entity.acceptedAnswer?.text?.trim() ?? "";
      if (!question || !answer) return "";
      return `- **${question}** ${answer}`;
    });
  } catch (error) {
    return [];
  }
}

function extractJsonLdBlocks(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const cleaned: string[] = [];
  const jsonLdBlocks: string[] = [];
  let inJson = false;
  let jsonLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (!inJson && trimmed.toLowerCase().startsWith("```json")) {
      inJson = true;
      jsonLines = [];
      continue;
    }

    if (inJson) {
      if (trimmed.startsWith("```")) {
        inJson = false;
        const jsonText = jsonLines.join("\n").trim();
        if (jsonText) {
          jsonLdBlocks.push(jsonText);
          const faqLines = buildFaqMarkdown(jsonText).filter(Boolean);
          cleaned.push(...faqLines);
        }
        continue;
      }
      jsonLines.push(line);
      continue;
    }

    cleaned.push(line);
  }

  return { cleanedMarkdown: cleaned.join("\n"), jsonLdBlocks };
}

export function getGallbladderSlugs() {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getGallbladderDoc(slug: string): GallbladderMarkdownPage | null {
  const safeSlug = slug === "index" ? "index" : slug;
  const filePath = path.join(CONTENT_DIR, `${safeSlug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const lines = raw.split(/\r?\n/);

  const seoTitleLine = lines.shift() ?? "";
  const metaDescriptionLine = lines.shift() ?? "";

  const seoTitle = seoTitleLine.replace(/^SEO Title:\s*/i, "").trim();
  const metaDescription = metaDescriptionLine.replace(/^Meta Description:\s*/i, "").trim();

  while (lines.length && !lines[0].trim()) {
    lines.shift();
  }

  const markdown = lines.join("\n");
  const { cleanedMarkdown, jsonLdBlocks } = extractJsonLdBlocks(markdown);

  return {
    slug: safeSlug,
    seoTitle,
    metaDescription,
    bodyMarkdown: cleanedMarkdown.trim(),
    jsonLdBlocks,
  };
}
