import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticleBySlug, getPublishedArticles } from "@/lib/data";
import { ArticleShareActions } from "@/components/insights/ArticleShareActions";

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    return getArticleBySlug(slug).then((article) => {
      if (!article) {
        return { title: "Article not found | Dynamic Portfolio" };
      }

      return {
        title: `${article.title} | Insights`,
        description: article.excerpt || article.body_content.slice(0, 160),
        alternates: {
          canonical: `/insights/${article.slug}`,
        },
      };
    });
  });
}

function renderMarkdownBlock(block: string) {
  if (block.startsWith("## ")) {
    return <h2 className="text-display-subhead" style={{ marginBottom: "var(--spacing-sm-2)" }}>{block.slice(3)}</h2>;
  }

  if (block.startsWith("- ")) {
    return (
      <ul style={{ display: "grid", gap: "var(--spacing-sm-2)", paddingLeft: "18px", listStyle: "disc" }}>
        {block.split("\n").map((item) => (
          <li key={item} className="text-body-default">{item.replace(/^[-*]\s*/, "")}</li>
        ))}
      </ul>
    );
  }

  if (/^\d+\.\s/.test(block)) {
    return (
      <ol style={{ display: "grid", gap: "var(--spacing-sm-2)", paddingLeft: "18px", listStyle: "decimal" }}>
        {block.split("\n").map((item) => (
          <li key={item} className="text-body-default">{item.replace(/^\d+\.\s*/, "")}</li>
        ))}
      </ol>
    );
  }

  return <p className="text-body-default">{block}</p>;
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const blocks = article.body_content.split(/\n\n+/).filter(Boolean);
  const canonicalUrl = `/insights/${article.slug}`;

  return (
    <article className="container" style={{ paddingBlock: "var(--spacing-section)" }}>
      <header style={{ maxWidth: "860px", marginBottom: "var(--spacing-section)" }}>
        <p className="text-caption-small" style={{ marginBottom: "var(--spacing-sm-2)", opacity: 0.6 }}>{article.author_name}</p>
        <h1 className="text-display-hero" style={{ marginBottom: "var(--spacing-md-2)" }}>{article.title}</h1>
        <div style={{ display: "flex", gap: "var(--spacing-md-1)", flexWrap: "wrap", marginBottom: "var(--spacing-md-2)" }}>
          <span className="text-caption-small">{new Date(article.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
          <span className="text-caption-small">{article.reading_time_minutes} min read</span>
        </div>
        <ArticleShareActions url={canonicalUrl} title={article.title} />
      </header>

      <section style={{ maxWidth: "860px", display: "grid", gap: "var(--spacing-md-2)" }}>
        {blocks.map((block) => renderMarkdownBlock(block))}
      </section>
    </article>
  );
}