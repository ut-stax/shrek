import { ServicesList } from "@/components/about/ServicesList";
import { SkillsTextLoop } from "@/components/about/SkillsTextLoop";
import { getProfile, getServices, getExperiences, getSkills } from "@/lib/data";
import TimelineDemo from "@/components/ui/timeline-demo";
import type { Profile, Experience, Skill } from "@/types";

export default async function AboutPage() {
  const [profile, services, experiences, skills] = await Promise.all([
    getProfile(),
    getServices(),
    getExperiences(),
    getSkills(),
  ]);

  return (
    <div style={{ paddingBottom: "var(--spacing-section)" }}>
      {/* Header */}
      <header className="container section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <p className="text-caption-small" style={{ marginBottom: "var(--spacing-md-1)", opacity: 0.6 }}>About</p>
        <h1 className="text-display-hero" style={{ marginBottom: "var(--spacing-md-2)" }}>About Me</h1>
        <p className="text-body-xl" style={{ maxWidth: "900px", color: "var(--color-charcoal)" }}>
          {profile?.headline || "Brand Growth Strategist helping founders turn products into brands."}
        </p>
      </header>

      {/* Bio + Contact */}
      <section className="container section">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--spacing-lg-1)" }}>
          {profile?.bio && (
            <div style={{ maxWidth: "900px" }}>
              {profile.bio.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-body-large" style={{ marginBottom: idx === 0 ? "var(--spacing-md-1)" : "var(--spacing-md-2)", color: "var(--color-charcoal)" }}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md-2)" }}>
            {(profile?.email || profile?.social_links) && (
              <div>
                <h3 className="text-display-subhead" style={{ marginBottom: "var(--spacing-md-1)" }}>Get in Touch</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm-1)" }}>
                  {profile?.email && (
                    <p className="text-body-large">
                      <a href={`mailto:${profile.email}`} style={{ textDecoration: "underline" }}>{profile.email}</a>
                    </p>
                  )}
                  {profile?.social_links && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-sm-2)" }}>
                      {Object.entries(profile.social_links).map(([platform, url]) => (
                        <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-link-underlined" style={{ textTransform: "capitalize" }}>
                          {platform}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Skills Text Loop */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 0, marginLeft: 0, marginRight: 0, maxWidth: "none" }}>
        <p className="text-body-large" style={{ maxWidth: "900px", marginLeft: "auto", marginRight: "auto", marginBottom: "var(--spacing-md-1)", color: "var(--color-charcoal)" }}>
          I help brands grow through content, positioning, and storytelling — with expertise spanning strategy, digital experience, motion design, and interactive storytelling.
        </p>
        <div style={{ maxWidth: "100%", overflow: "hidden" }}>
          <SkillsTextLoop skills={skills.map(s => s.name)} />
        </div>
      </section>

      {/* Services */}
      <section className="container section" style={{ backgroundColor: "var(--color-warm-cream)", borderRadius: "var(--radius-card)", padding: "var(--spacing-section)" }}>
        <h2 className="text-display-subhead" style={{ marginBottom: "var(--spacing-md-2)" }}>Services</h2>
        <ServicesList services={services} />
      </section>

      {/* Experience Timeline */}
      <section className="section container">
        <TimelineDemo />
      </section>
    </div>
  );
}
