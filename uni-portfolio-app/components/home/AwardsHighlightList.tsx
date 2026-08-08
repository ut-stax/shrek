import type { AwardEntity } from "@/types";

interface AwardsHighlightListProps {
  awards: AwardEntity[];
}

export function AwardsHighlightList({ awards }: AwardsHighlightListProps) {
  return (
    <section className="section container">
       <h2 className="text-display-subhead" style={{ marginBottom: "var(--spacing-lg-1)" }}>Recent Recognition</h2>
       
       <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
        {awards.slice(0, 4).map((award) => (
          <div key={award.id} style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr auto",
            gap: "var(--spacing-md-1)",
            padding: "var(--spacing-md-1) 0",
            borderBottom: "1px solid var(--color-light-silver)",
            alignItems: "center"
          }}>
            <span className="text-body-large" style={{ fontWeight: 500 }}>{award.title}</span>
            <span className="text-body-default">{award.organization}</span>
            <span className="text-body-default" style={{ opacity: 0.7 }}>{award.project_name}</span>
            <span className="text-caption-small">{award.year}</span>
          </div>
        ))}
       </div>
    </section>
  );
}
