import Link from "next/link";
import type { ProjectDetailEntity } from "@/types";

interface FeaturedWorkGridProps {
  projects: ProjectDetailEntity[];
}

export function FeaturedWorkGrid({ projects }: FeaturedWorkGridProps) {
  return (
    <section className="section container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "var(--spacing-lg-1)" }}>
        <h2 className="text-display-subhead">Featured Work</h2>
        <Link href="/work" className="text-link-underlined">View All Projects</Link>
      </div>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "var(--spacing-md-2)"
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
                <p className="text-body-default" style={{ opacity: 0.8, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {project.summary}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
