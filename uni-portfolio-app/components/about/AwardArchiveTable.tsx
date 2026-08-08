import type { AwardEntity } from "@/types";

interface AwardArchiveTableProps {
  awards: AwardEntity[];
}

export function AwardArchiveTable({ awards }: AwardArchiveTableProps) {
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <table style={{ width: "100%", minWidth: "600px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid var(--color-near-black)", textAlign: "left" }}>
            <th className="text-filter-label" style={{ padding: "var(--spacing-sm-3) 0" }}>Award Title</th>
            <th className="text-filter-label" style={{ padding: "var(--spacing-sm-3) 0" }}>Organization</th>
            <th className="text-filter-label" style={{ padding: "var(--spacing-sm-3) 0" }}>Project</th>
            <th className="text-filter-label" style={{ padding: "var(--spacing-sm-3) 0" }}>Year</th>
            <th className="text-filter-label" style={{ padding: "var(--spacing-sm-3) 0" }}>Link</th>
          </tr>
        </thead>
        <tbody>
          {awards.map((award) => (
            <tr key={award.id} style={{ borderBottom: "1px solid var(--color-light-silver)" }}>
              <td className="text-body-large" style={{ padding: "var(--spacing-md-1) 0", fontWeight: 500 }}>{award.title}</td>
              <td className="text-body-default" style={{ padding: "var(--spacing-md-1) 0" }}>{award.organization}</td>
              <td className="text-body-default" style={{ padding: "var(--spacing-md-1) 0", opacity: 0.8 }}>{award.project_name}</td>
              <td className="text-caption-small" style={{ padding: "var(--spacing-md-1) 0" }}>{award.year}</td>
              <td className="text-caption-small" style={{ padding: "var(--spacing-md-1) 0" }}>
                {award.verification_url ? (
                  <a href={award.verification_url} target="_blank" rel="noopener noreferrer" className="text-link-underlined">View ↗</a>
                ) : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
