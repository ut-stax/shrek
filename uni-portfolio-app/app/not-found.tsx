import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container" style={{ paddingBlock: "var(--spacing-section)" }}>
      <div style={{ maxWidth: "700px" }}>
        <p className="text-caption-small" style={{ opacity: 0.6, marginBottom: "var(--spacing-sm-2)" }}>404</p>
        <h1 className="text-display-hero" style={{ marginBottom: "var(--spacing-md-2)" }}>Page not found</h1>
        <p className="text-body-xl" style={{ marginBottom: "var(--spacing-md-2)", color: "var(--color-charcoal)" }}>
          The page you requested is not available.
        </p>
        <Link href="/" className="btn-primary">Return home</Link>
      </div>
    </div>
  );
}