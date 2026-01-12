function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderInlineMarkdown(text: string) {
  let out = escapeHtml(text);

  out = out.replaceAll(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  out = out.replaceAll(/\*(.+?)\*/g, "<em>$1</em>");
  out = out.replaceAll(/\[(.+?)\]\((.+?)\)/g, '<a class="font-semibold text-teal-600 hover:text-teal-700" href="$2">$1</a>');

  return out;
}

export function renderMarkdownToHtml(markdown: string) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");

  const html: string[] = [];
  let listBuffer: string[] = [];

  function flushList() {
    if (listBuffer.length === 0) return;
    html.push("<ul class=\"mt-3 space-y-2\">" + listBuffer.join("") + "</ul>");
    listBuffer = [];
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.trim() === "") {
      flushList();
      continue;
    }

    const h1 = line.match(/^#\s+(.+)$/);
    if (h1) {
      flushList();
      html.push(`<h1 class=\"text-4xl font-semibold leading-tight text-slate-900 lg:text-5xl\">${renderInlineMarkdown(h1[1])}</h1>`);
      continue;
    }

    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      flushList();
      html.push(`<h2 class=\"mt-8 text-2xl font-semibold text-slate-900\">${renderInlineMarkdown(h2[1])}</h2>`);
      continue;
    }

    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      flushList();
      html.push(`<h3 class=\"mt-6 text-xl font-semibold text-slate-900\">${renderInlineMarkdown(h3[1])}</h3>`);
      continue;
    }

    const li = line.match(/^[-*]\s+(.+)$/);
    if (li) {
      listBuffer.push(`<li class=\"text-slate-700\">${renderInlineMarkdown(li[1])}</li>`);
      continue;
    }

    flushList();
    html.push(`<p class=\"mt-3 text-slate-700\">${renderInlineMarkdown(line)}</p>`);
  }

  flushList();
  return html.join("\n");
}
