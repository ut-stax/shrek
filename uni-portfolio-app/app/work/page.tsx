import Link from "next/link";
import { getCategories, getProjectsByCategory } from "@/lib/data";
import { CategoryFilterBar } from "@/components/work/CategoryFilterBar";
import { SearchInput } from "@/components/work/SearchInput";

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const categoryParam = params.category || "all";
  const searchParam = params.search || "";
  const categories = await getCategories();
  const categoryExists = categories.some((category) => category.slug === categoryParam);
  const activeCategory = categoryExists ? categoryParam : "all";
  const hasActiveFilters = activeCategory !== "all" || searchParam.length >= 2;

  // 1. Filter by Category
  let projects = await getProjectsByCategory(activeCategory);

  // 2. Filter by Search (if >= 2 chars)
  if (searchParam.length >= 2) {
    const lowerSearch = searchParam.toLowerCase();
    projects = projects.filter(
      (p) =>
        p.title.toLowerCase().includes(lowerSearch) ||
        p.client_name.toLowerCase().includes(lowerSearch) ||
        p.tags.some(t => t.toLowerCase().includes(lowerSearch)) ||
        p.summary.toLowerCase().includes(lowerSearch)
    );
  }

  return (
    <div className="container" style={{ paddingBlock: "var(--spacing-section)" }}>
      <h1 className="text-display-hero" style={{ marginBottom: "var(--spacing-md-2)" }}>Our Work</h1>
      
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--spacing-md-1)" }}>
        <CategoryFilterBar categories={categories} />
        <SearchInput />
      </div>

      {hasActiveFilters && (
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm-3)", flexWrap: "wrap", marginBottom: "var(--spacing-md-2)" }}>
          <span className="text-caption-small" style={{ opacity: 0.6 }}>Active filters:</span>
          {activeCategory !== "all" && (
            <span className="text-caption-small" style={{ backgroundColor: "var(--color-white)", padding: "4px 8px", borderRadius: "var(--radius-subtle)" }}>
              Category: {categories.find((category) => category.slug === activeCategory)?.name}
            </span>
          )}
          {searchParam.length >= 2 && (
            <span className="text-caption-small" style={{ backgroundColor: "var(--color-white)", padding: "4px 8px", borderRadius: "var(--radius-subtle)" }}>
              Search: {searchParam}
            </span>
          )}
          <Link href="/work" className="text-link-underlined">Reset All Filters</Link>
        </div>
      )}

      {!categoryExists && categoryParam !== "all" && (
        <div style={{ marginBottom: "var(--spacing-md-2)", padding: "12px 16px", border: "1px solid var(--color-pale-gray)", borderRadius: "var(--radius-subtle)", backgroundColor: "var(--color-warm-cream)" }}>
          <p className="text-body-default">That category does not exist, so the portfolio has been reset to All projects.</p>
        </div>
      )}

      {projects.length === 0 ? (
        <div style={{ textAlign: "center", paddingBlock: "100px" }}>
          <p className="text-body-large">No projects match your selected filters.</p>
          <Link href="/work" className="text-link-underlined" style={{ display: "inline-block", marginTop: "var(--spacing-md-1)" }}>Clear Filters</Link>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "var(--spacing-md-2)",
          marginTop: "var(--spacing-lg-1)"
        }}>
          {projects.map((project) => {
            const mainImage = project.media_assets.find(m => m.asset_type === "image" || m.asset_type === "video");
            
            return (
              <Link href={`/work/${project.slug}`} key={project.id} className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4/3",
                  backgroundColor: "var(--color-pale-gray)",
                  overflow: "hidden"
                }}>
                  {mainImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={mainImage.asset_type === 'video' ? mainImage.poster_url : mainImage.url}
                      alt={mainImage.alt_text}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  )}
                </div>
                <div style={{ padding: "var(--spacing-md-1)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--spacing-sm-1)" }}>
                    <span className="text-caption-small" style={{ opacity: 0.6 }}>{project.client_name}</span>
                    <span className="text-caption-small" style={{ opacity: 0.6 }}>{project.completion_year}</span>
                  </div>
                  <h3 className="text-body-large" style={{ fontWeight: 500, marginBottom: "var(--spacing-xs)" }}>{project.title}</h3>
                  <div style={{ display: "flex", gap: "var(--spacing-sm-2)", flexWrap: "wrap", marginTop: "var(--spacing-sm-1)" }}>
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-caption-small" style={{ backgroundColor: "var(--color-white)", padding: "4px 8px", borderRadius: "var(--radius-subtle)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
