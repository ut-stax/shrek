import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility Helpers
 * Derived from: PRD 02, Feature 5.1 — reading time calculation
 */

/**
 * Merge class names with clsx and tailwind-merge.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate estimated reading time in minutes.
 * Formula: total words / 200 wpm (as specified in PRD 02, Feature 5.1).
 */
export function calculateReadingTime(text: string): number {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

/**
 * Format an ISO date string to a human-readable format.
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Convert a string to kebab-case slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/--+/g, "-");
}

/**
 * Sanitize search input to prevent regex breakage.
 * Referenced in PRD 02, Feature 1.2 — special character sanitization.
 */
export function sanitizeSearchInput(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
