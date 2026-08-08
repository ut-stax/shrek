"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function SearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialSearch = searchParams.get("search") || "";
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    const debounceId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchTerm.length >= 2) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }
      
      // Prevent unnecessary push if nothing changed
      const oldSearch = searchParams.get("search") || "";
      if ((searchTerm.length >= 2 ? searchTerm : "") !== oldSearch) {
        router.push(`/work?${params.toString()}`, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(debounceId);
  }, [searchTerm, searchParams, router]);

  // Sync state if URL changes externally
  useEffect(() => {
    const nextSearch = searchParams.get("search") || "";

    if (nextSearch !== searchTerm) {
      const syncId = window.setTimeout(() => {
        setSearchTerm(nextSearch);
      }, 0);

      return () => window.clearTimeout(syncId);
    }
  }, [searchParams, searchTerm]);

  return (
    <div style={{ marginBottom: "var(--spacing-md-2)", maxWidth: "400px" }}>
      <input
        type="text"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="text-body-default"
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "var(--radius-subtle)",
          border: "1px solid var(--color-pale-gray)",
          backgroundColor: "var(--color-white)",
          color: "var(--color-near-black)",
          outline: "none"
        }}
      />
    </div>
  );
}
