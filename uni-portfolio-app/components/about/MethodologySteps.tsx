import type { MethodologyStep } from "@/types";

interface MethodologyStepsProps {
  methodologySteps: MethodologyStep[];
}

export function MethodologySteps({ methodologySteps }: MethodologyStepsProps) {
  return (
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
      gap: "var(--spacing-md-2)" 
    }}>
      {methodologySteps.map((step) => (
        <div key={step.id} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm-2)" }}>
          <div style={{ 
            width: "32px", 
            height: "32px", 
            borderRadius: "50%", 
            border: "1px solid var(--color-near-black)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            fontWeight: 700
          }}>
            {step.step_number}
          </div>
          <h3 className="text-bold-heading">{step.title}</h3>
          <p className="text-body-default" style={{ opacity: 0.8 }}>{step.description}</p>
        </div>
      ))}
    </div>
  );
}
