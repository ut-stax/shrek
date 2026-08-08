import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Script from "next/script";
import { getProjectBySlug, getProjectsByCategory } from "@/lib/data";
import { ProjectMediaGallery } from "@/components/work/ProjectMediaGallery";

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    return getProjectBySlug(slug).then((project) => {
      if (!project) {
        return {
          title: "Project not found | Dynamic Portfolio",
        };
      }

      return {
        title: `${project.title} | Dynamic Portfolio`,
        description: project.summary,
        alternates: {
          canonical: `/work/${project.slug}`,
        },
        openGraph: {
          title: project.title,
          description: project.summary,
          type: "article",
        },
      };
    });
  });
}

// Generate static params for SSG
export async function generateStaticParams() {
  const projects = await getProjectsByCategory("all");
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Find next and previous projects
  const allProjects = await getProjectsByCategory("all");
  const currentIndex = allProjects.findIndex((item) => item.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <article style={{ paddingBottom: "var(--spacing-section)" }}>
      {/* Header */}
      <header className="container section" style={{ paddingBottom: 0 }}>
        <h1 className="text-display-hero" style={{ marginBottom: "var(--spacing-md-2)" }}>{project.title}</h1>
        
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--spacing-section)",
          paddingTop: "var(--spacing-md-2)",
          borderTop: "1px solid var(--color-light-silver)"
        }}>
          <div>
            <h3 className="text-caption-small" style={{ opacity: 0.6, marginBottom: "var(--spacing-xs)" }}>Client</h3>
            <p className="text-body-default">{project.client_name}</p>
          </div>
          <div>
            <h3 className="text-caption-small" style={{ opacity: 0.6, marginBottom: "var(--spacing-xs)" }}>Year</h3>
            <p className="text-body-default">{project.completion_year}</p>
          </div>
          <div>
            <h3 className="text-caption-small" style={{ opacity: 0.6, marginBottom: "var(--spacing-xs)" }}>Category</h3>
            <p className="text-body-default">{project.category.name}</p>
          </div>
          <div>
            <h3 className="text-caption-small" style={{ opacity: 0.6, marginBottom: "var(--spacing-xs)" }}>Services</h3>
            <div style={{ display: "flex", gap: "var(--spacing-xs)", flexWrap: "wrap" }}>
              {project.tags.map(tag => (
                 <span key={tag} className="text-caption-small" style={{ backgroundColor: "var(--color-white)", padding: "4px 8px", borderRadius: "var(--radius-subtle)" }}>
                   {tag}
                 </span>
              ))}
            </div>
          </div>
          {project.external_url && (
            <div>
              <h3 className="text-caption-small" style={{ opacity: 0.6, marginBottom: "var(--spacing-xs)" }}>Live Site</h3>
              <a href={project.external_url} target="_blank" rel="noopener noreferrer" className="text-link-underlined">
                Visit Website ↗
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Media Gallery & Content */}
      <div className="container section">
        <p className="text-body-xl" style={{ maxWidth: "1000px", marginBottom: "var(--spacing-section)" }}>
          {project.summary}
        </p>

        <ProjectMediaGallery assets={project.media_assets} />
      </div>

      {project.outcome_highlights && project.outcome_highlights.length > 0 && (
        <section className="container section">
          <h2 className="text-display-subhead" style={{ marginBottom: "var(--spacing-md-1)" }}>Outcomes</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--spacing-md-2)" }}>
            {project.outcome_highlights.map((highlight) => (
              <div key={highlight} style={{ padding: "var(--spacing-md-2)", backgroundColor: "var(--color-warm-cream)", borderRadius: "var(--radius-card-alt)", border: "1px solid var(--color-pale-gray)" }}>
                <p className="text-body-default">{highlight}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Challenge & Solution */}
      <div className="container section" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--spacing-section)" }}>
        {project.challenge_description && (
          <div>
            <h2 className="text-display-subhead" style={{ marginBottom: "var(--spacing-md-1)" }}>The Challenge</h2>
            <p className="text-body-default" style={{ opacity: 0.8 }}>{project.challenge_description}</p>
          </div>
        )}
        {project.solution_description && (
          <div>
            <h2 className="text-display-subhead" style={{ marginBottom: "var(--spacing-md-1)" }}>The Solution</h2>
            <p className="text-body-default" style={{ opacity: 0.8 }}>{project.solution_description}</p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <footer className="container section" style={{ borderTop: "1px solid var(--color-light-silver)", display: "flex", justifyContent: "space-between" }}>
        {prevProject ? (
           <Link href={`/work/${prevProject.slug}`} className="text-body-large" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
             <span className="text-caption-small" style={{ opacity: 0.6 }}>Previous Project</span>
             <span>← {prevProject.title}</span>
           </Link>
        ) : <div />}
        
        {nextProject ? (
           <Link href={`/work/${nextProject.slug}`} className="text-body-large" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)", textAlign: "right" }}>
             <span className="text-caption-small" style={{ opacity: 0.6 }}>Next Project</span>
             <span>{nextProject.title} →</span>
           </Link>
        ) : <div />}
      </footer>

      <Script
        id="project-json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.summary,
            url: `/work/${project.slug}`,
            author: {
              "@type": "Organization",
              name: "Dynamic Portfolio",
            },
          }),
        }}
      />
    </article>
  );
}
