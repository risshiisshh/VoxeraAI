import React from "react";

interface Props {
  markdown: string;
  className?: string;
}

/**
 * Lightweight markdown → JSX renderer tailored for VoxeraAI article content.
 * Handles: headings (h1–h3), paragraphs, bold, italic, links,
 * unordered/ordered lists, blockquotes, horizontal rules, and inline code.
 * Auto-generates anchor IDs for headings (for table-of-contents linking).
 */
export default function MarkdownRenderer({ markdown, className = "" }: Props) {
  const lines = markdown.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  function slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  function parseInline(text: string): React.ReactNode {
    const parts: React.ReactNode[] = [];
    // Pattern to match bold, italic, inline code, and links
    const pattern = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)|(\[(.+?)\]\((.+?)\))/g;
    let last = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text)) !== null) {
      if (match.index > last) {
        parts.push(text.slice(last, match.index));
      }
      if (match[1]) {
        // Bold **text**
        parts.push(<strong key={key++} className="text-white font-semibold">{match[2]}</strong>);
      } else if (match[3]) {
        // Italic *text*
        parts.push(<em key={key++} className="text-[#B0C0DF]">{match[4]}</em>);
      } else if (match[5]) {
        // Code `text`
        parts.push(
          <code key={key++} className="bg-white/10 text-[#F5A623] px-1.5 py-0.5 rounded text-sm font-mono">
            {match[6]}
          </code>
        );
      } else if (match[7]) {
        // Link [text](url)
        parts.push(
          <a
            key={key++}
            href={match[9]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5A623] underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            {match[8]}
          </a>
        );
      }
      last = match.index + match[0].length;
    }

    if (last < text.length) parts.push(text.slice(last));
    return parts.length === 1 ? parts[0] : parts;
  }

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (line.trim() === "") { i++; continue; }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      elements.push(<hr key={key++} className="border-white/10 my-6" />);
      i++; continue;
    }

    // Headings
    const h3 = line.match(/^### (.+)/);
    const h2 = line.match(/^## (.+)/);
    const h1 = line.match(/^# (.+)/);

    if (h1) {
      const text = h1[1];
      elements.push(
        <h1 key={key++} id={slugify(text)} className="text-3xl font-extrabold text-white mt-8 mb-4 scroll-mt-24">
          {parseInline(text)}
        </h1>
      );
      i++; continue;
    }
    if (h2) {
      const text = h2[1];
      elements.push(
        <h2 key={key++} id={slugify(text)} className="text-xl font-bold text-white mt-8 mb-3 scroll-mt-24">
          {parseInline(text)}
        </h2>
      );
      i++; continue;
    }
    if (h3) {
      const text = h3[1];
      elements.push(
        <h3 key={key++} id={slugify(text)} className="text-lg font-semibold text-white mt-6 mb-2 scroll-mt-24">
          {parseInline(text)}
        </h3>
      );
      i++; continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote
          key={key++}
          className="border-l-4 border-[#F5A623] pl-4 py-2 my-4 bg-[#F5A623]/5 rounded-r-lg"
        >
          {quoteLines.map((ql, qi) => (
            <p key={qi} className="text-[#B0C0DF] italic text-sm">{parseInline(ql)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (/^[-*+] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*+] /.test(lines[i])) {
        items.push(lines[i].replace(/^[-*+] /, ""));
        i++;
      }
      elements.push(
        <ul key={key++} className="space-y-2 my-4 ml-1">
          {items.map((item, ii) => (
            <li key={ii} className="flex items-start gap-2 text-[#B0C0DF] leading-relaxed">
              <span className="text-[#F5A623] mt-1 flex-shrink-0 text-xs">▸</span>
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      let num = 1;
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
        num++;
      }
      elements.push(
        <ol key={key++} className="space-y-2 my-4 ml-1">
          {items.map((item, ii) => (
            <li key={ii} className="flex items-start gap-3 text-[#B0C0DF] leading-relaxed">
              <span className="text-[#F5A623] font-bold flex-shrink-0 min-w-[1.5rem]">{ii + 1}.</span>
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      void num;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="text-[#B0C0DF] leading-relaxed my-3">
        {parseInline(line)}
      </p>
    );
    i++;
  }

  return (
    <div className={`prose-dark ${className}`}>
      {elements}
    </div>
  );
}
