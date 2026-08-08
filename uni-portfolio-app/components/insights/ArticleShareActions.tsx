"use client";

import { useState } from "react";

interface ArticleShareActionsProps {
  url: string;
  title: string;
}

export function ArticleShareActions({ url, title }: ArticleShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const copyUrl = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-sm-2)", alignItems: "center" }}>
      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="text-link-underlined">
        Share on X
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="text-link-underlined">
        Share on LinkedIn
      </a>
      <button type="button" onClick={copyUrl} className="btn-filter">
        {copied ? "Link copied" : "Copy URL"}
      </button>
    </div>
  );
}