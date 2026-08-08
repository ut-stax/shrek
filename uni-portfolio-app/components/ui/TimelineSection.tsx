'use client';

import dynamic from "next/dynamic";

const TimelineDemo = dynamic(() => import("@/components/ui/timeline-demo"), {
  ssr: false,
  loading: () => (
    <div style={{ padding: "var(--spacing-section) 0", textAlign: "center" }}>
      <p className="text-body-large" style={{ opacity: 0.6 }}>Loading experience...</p>
    </div>
  ),
});

export function TimelineSection() {
  return <TimelineDemo />;
}
