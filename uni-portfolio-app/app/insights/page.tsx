import Link from "next/link";
import { getArticlesByTopic, getArticleTopics } from "@/lib/data";
import { Button } from "@/components/ui/Button";

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const params = await searchParams;
  const topicParam = params.topic || "all";
  const topics = getArticleTopics();
  const [resolvedTopics, articles] = await Promise.all([topics, getArticlesByTopic(topicParam)]);

  return (
    <div className="container" style={{ paddingBlock: "var(--spacing-section)" }}>
      <header style={{ marginBottom: "var(--spacing-section)", maxWidth: "860px" }}>
        <p className="text-caption-small" style={{ marginBottom: "var(--spacing-md-1)", opacity: 0.6 }}>Insights</p>
        <h1 className="text-display-hero" style={{ marginBottom: "var(--spacing-md-2)" }}>Journal & Essays</h1>
        <p className="text-body-xl" style={{ color: "var(--color-charcoal)" }}>
          Notes on brand growth, content strategy, positioning, and the craft of building brands that people actually care about.
        </p>
      </header>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-sm-2)", marginBottom: "var(--spacing-md-2)" }}>
        <Button href="/insights" variant="filter" data-active={topicParam === "all"}>All</Button>
        {resolvedTopics.map((topic) => (
          <Button key={topic} href={`/insights?topic=${topic}`} variant="filter" data-active={topicParam === topic}>
            {topic}
          </Button>
        ))}
        <Link href="/insights" className="text-link-underlined" style={{ alignSelf: "center" }}>Reset All Filters</Link>
      </div>

      {articles.length === 0 ? (
        <div style={{ padding: "80px 0" }}>
          <p className="text-body-large">No articles published in this category yet.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--spacing-md-2)" }}>
          {articles.map((article) => (
            <Link key={article.id} href={`/insights/${article.slug}`} className="card" style={{ display: "block", padding: "var(--spacing-md-2)" }}>
              <p className="text-caption-small" style={{ opacity: 0.6, marginBottom: "var(--spacing-xs)" }}>{new Date(article.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
              <h2 className="text-display-subhead" style={{ marginBottom: "var(--spacing-sm-2)" }}>{article.title}</h2>
              <p className="text-body-default" style={{ opacity: 0.8, marginBottom: "var(--spacing-md-1)" }}>{article.excerpt || article.body_content.slice(0, 140)}</p>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--spacing-md-1)", flexWrap: "wrap" }}>
                <span className="text-caption-small">{article.author_name}</span>
                <span className="text-caption-small">{article.reading_time_minutes} min read</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}