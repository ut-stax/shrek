"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CategoryEntity } from "@/types";
import { Button } from "@/components/ui/Button";

interface CategoryFilterBarProps {
  categories: CategoryEntity[];
}

export function CategoryFilterBar({ categories }: CategoryFilterBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const currentCategory = searchParams.get("category") || "all";
  const normalizedCategory = categories.some((category) => category.slug === currentCategory)
    ? currentCategory
    : "all";

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    router.push(`/work?${params.toString()}`, { scroll: false });
  };

  return (
    <div style={{ display: "flex", gap: "var(--spacing-sm-3)", flexWrap: "wrap", marginBottom: "var(--spacing-md-2)" }}>
      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant="filter"
          data-active={normalizedCategory === cat.slug}
          onClick={() => handleCategoryChange(cat.slug)}
        >
          {cat.name}
        </Button>
      ))}
    </div>
  );
}
