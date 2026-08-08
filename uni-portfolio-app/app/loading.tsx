export default function Loading() {
  return (
    <div className="container" style={{ paddingBlock: "var(--spacing-section)" }}>
      <div className="skeleton" style={{ height: "64px", width: "45%", marginBottom: "var(--spacing-md-2)" }} />
      <div className="skeleton" style={{ height: "24px", width: "65%", marginBottom: "var(--spacing-md-2)" }} />
      <div className="skeleton" style={{ height: "360px", width: "100%", borderRadius: "var(--radius-card)" }} />
    </div>
  );
}