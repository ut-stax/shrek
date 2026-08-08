import { getInquiries } from "@/lib/data";
import { InquiriesTable } from "@/components/admin/InquiriesTable";

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <div className="container" style={{ paddingBlock: "var(--spacing-section)" }}>
      <header style={{ marginBottom: "var(--spacing-md-2)" }}>
        <p className="text-caption-small" style={{ opacity: 0.6, marginBottom: "var(--spacing-sm-2)" }}>Admin Dashboard</p>
        <h1 className="text-display-hero">Inquiries</h1>
      </header>

      <InquiriesTable inquiries={inquiries} />
    </div>
  );
}