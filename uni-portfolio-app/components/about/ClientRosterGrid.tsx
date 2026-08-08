import type { ClientItem } from "@/types";

interface ClientRosterGridProps {
  clients: ClientItem[];
}

export function ClientRosterGrid({ clients }: ClientRosterGridProps) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "var(--spacing-md-2)"
    }}>
      {clients.map((client) => (
        <div key={client.id} style={{
          padding: "var(--spacing-md-2)",
          backgroundColor: "var(--color-white)",
          borderRadius: "var(--radius-subtle)",
          border: "1px solid var(--color-pale-gray)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-xs)"
        }}>
          <span className="text-body-large" style={{ fontWeight: 500 }}>{client.name}</span>
          <span className="text-caption-small" style={{ opacity: 0.6 }}>{client.industry}</span>
        </div>
      ))}
    </div>
  );
}
