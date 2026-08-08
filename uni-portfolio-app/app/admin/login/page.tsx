import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="container" style={{ paddingBlock: "var(--spacing-section)" }}>
      <div style={{ maxWidth: "640px", backgroundColor: "var(--color-warm-cream)", border: "1px solid var(--color-pale-gray)", borderRadius: "var(--radius-card)", padding: "var(--spacing-section)" }}>
        <p className="text-caption-small" style={{ opacity: 0.6, marginBottom: "var(--spacing-sm-2)" }}>Admin Access</p>
        <h1 className="text-display-subhead" style={{ marginBottom: "var(--spacing-md-2)" }}>Login</h1>
        <p className="text-body-default" style={{ marginBottom: "var(--spacing-md-2)" }}>
          This build uses a local demo portal. Connect Supabase Auth when you are ready to deploy the protected admin workflow.
        </p>
        <Link href="/admin/inquiries" className="btn-primary">Open Inquiries Dashboard</Link>
      </div>
    </div>
  );
}