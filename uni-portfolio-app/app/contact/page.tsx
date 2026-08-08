import { InquiryForm } from "@/components/contact/InquiryForm";
import { getProfile } from "@/lib/data";

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <div className="container" style={{ paddingBlock: "var(--spacing-section)" }}>
      <header style={{ marginBottom: "var(--spacing-section)", maxWidth: "860px" }}>
        <p className="text-caption-small" style={{ marginBottom: "var(--spacing-md-1)", opacity: 0.6 }}>Get in Touch</p>
        <h1 className="text-display-hero" style={{ marginBottom: "var(--spacing-md-2)" }}>Let''s Grow Your Brand</h1>
        <p className="text-body-xl" style={{ color: "var(--color-charcoal)" }}>
          {profile?.headline || "Brand Growth Strategist helping founders turn products into brands through content, positioning, and storytelling."}
        </p>
        {profile?.email && (
          <p className="text-body-large" style={{ marginTop: "var(--spacing-md-1)" }}>
            <a href={`mailto:${profile.email}`} style={{ textDecoration: "underline" }}>{profile.email}</a>
          </p>
        )}
      </header>

      <InquiryForm />
    </div>
  );
}