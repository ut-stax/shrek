"use client";

import { useMemo, useState } from "react";
import type { InquiryEntity } from "@/types";

type StatusFilter = "all" | InquiryEntity["status"];

interface InquiriesTableProps {
  inquiries: InquiryEntity[];
}

export function InquiriesTable({ inquiries }: InquiriesTableProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [rows, setRows] = useState(inquiries);

  const filteredRows = useMemo(() => {
    if (statusFilter === "all") {
      return rows;
    }

    return rows.filter((row) => row.status === statusFilter);
  }, [rows, statusFilter]);

  const updateStatus = async (id: string, status: InquiryEntity["status"]) => {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, status } : row)));

    await fetch(`/api/v1/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  const exportCsv = () => {
    const header = ["Received Date", "Client Name", "Email", "Company", "Services", "Budget", "Status"];
    const csvRows = filteredRows.map((row) => [
      row.created_at,
      row.name,
      row.email,
      row.company || "",
      row.services.join("; "),
      row.budget_range,
      row.status,
    ]);

    const csv = [header, ...csvRows]
      .map((line) => line.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "inquiries.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-sm-2)", alignItems: "center", marginBottom: "var(--spacing-md-2)" }}>
        <label className="text-body-default">
          Status filter{" "}
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as StatusFilter)} style={{ marginLeft: "8px", padding: "8px 10px", borderRadius: "var(--radius-subtle)", border: "1px solid var(--color-light-silver)" }}>
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="contacted">Contacted</option>
            <option value="archived">Archived</option>
          </select>
        </label>

        <button type="button" onClick={exportCsv} className="btn-primary">Export CSV</button>
      </div>

      <div style={{ overflowX: "auto", border: "1px solid var(--color-pale-gray)", borderRadius: "var(--radius-card)", backgroundColor: "var(--color-warm-cream)" }}>
        <table style={{ width: "100%", minWidth: "900px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-light-silver)" }}>
              <th className="text-filter-label" style={{ textAlign: "left", padding: "16px" }}>Received Date</th>
              <th className="text-filter-label" style={{ textAlign: "left", padding: "16px" }}>Client</th>
              <th className="text-filter-label" style={{ textAlign: "left", padding: "16px" }}>Email</th>
              <th className="text-filter-label" style={{ textAlign: "left", padding: "16px" }}>Company</th>
              <th className="text-filter-label" style={{ textAlign: "left", padding: "16px" }}>Service</th>
              <th className="text-filter-label" style={{ textAlign: "left", padding: "16px" }}>Budget</th>
              <th className="text-filter-label" style={{ textAlign: "left", padding: "16px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id} style={{ borderBottom: "1px solid var(--color-pale-gray)" }}>
                <td className="text-caption-small" style={{ padding: "16px" }}>{new Date(row.created_at).toLocaleDateString("en-US")}</td>
                <td className="text-body-default" style={{ padding: "16px" }}>{row.name}</td>
                <td className="text-body-default" style={{ padding: "16px" }}>{row.email}</td>
                <td className="text-body-default" style={{ padding: "16px" }}>{row.company || "—"}</td>
                <td className="text-body-default" style={{ padding: "16px" }}>{row.services.join(", ")}</td>
                <td className="text-body-default" style={{ padding: "16px" }}>{row.budget_range}</td>
                <td style={{ padding: "16px" }}>
                  <select value={row.status} onChange={(event) => updateStatus(row.id, event.target.value as InquiryEntity["status"])} style={{ padding: "8px 10px", borderRadius: "var(--radius-subtle)", border: "1px solid var(--color-light-silver)" }}>
                    <option value="new">new</option>
                    <option value="read">read</option>
                    <option value="contacted">contacted</option>
                    <option value="archived">archived</option>
                    <option value="email_failed">email_failed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}