"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container" style={{ paddingBlock: "var(--spacing-section)" }}>
      <div style={{ maxWidth: "700px", padding: "var(--spacing-section)", backgroundColor: "var(--color-warm-cream)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-pale-gray)" }}>
        <h1 className="text-display-subhead" style={{ marginBottom: "var(--spacing-md-2)" }}>Something went wrong</h1>
        <p className="text-body-default" style={{ marginBottom: "var(--spacing-md-2)" }}>{error.message}</p>
        <button type="button" onClick={reset} className="btn-primary">Try again</button>
      </div>
    </div>
  );
}