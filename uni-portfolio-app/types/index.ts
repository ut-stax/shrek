/**
 * TypeScript Interfaces — Database Entities & API Contracts
 * Derived from: PRD 03 (03-data-models-api-contracts.md)
 */

/* --- Entity: categories (Discipline Taxonomies) --- */
export interface CategoryEntity {
  id: string;
  name: string;
  slug: string;
  display_order: number;
}

/* --- Entity: tags --- */
export interface TagEntity {
  id: string;
  name: string;
  slug: string;
}

/* --- Entity: media_assets (Project Media Deliverables) --- */
export interface MediaAssetEntity {
  id: string;
  project_id: string;
  asset_type: "image" | "video" | "interactive_embed";
  url: string;
  poster_url?: string;
  alt_text: string;
  width?: number;
  height?: number;
  display_order: number;
}

/* --- Entity: projects (Case Studies) --- */
export interface ProjectEntity {
  id: string;
  title: string;
  slug: string;
  client_name: string;
  category_id: string;
  summary: string;
  challenge_description?: string;
  solution_description?: string;
  completion_year: number;
  is_featured: boolean;
  status: "draft" | "published" | "archived";
  external_url?: string;
  created_at: string;
  updated_at: string;
}

/* --- Expanded project detail with relations --- */
export interface ProjectDetailEntity extends ProjectEntity {
  category: CategoryEntity;
  tags: string[];
  media_assets: MediaAssetEntity[];
  related_projects: RelatedProjectRef[];
  outcome_highlights?: string[];
}

export interface RelatedProjectRef {
  title: string;
  slug: string;
  category_slug: string;
}

/* --- Entity: inquiries (Client Leads) --- */
export interface InquiryEntity {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  services: string[];
  budget_range: "<25k" | "25k-50k" | "50k-100k" | "100k+";
  estimated_timeline?: string;
  project_description: string;
  attachment_url?: string;
  status: "new" | "read" | "contacted" | "archived" | "email_failed";
  ip_address: string;
  created_at: string;
}

/* --- Entity: articles (Insights & Posts) --- */
export interface ArticleEntity {
  id: string;
  title: string;
  slug: string;
  author_name: string;
  body_content: string;
  reading_time_minutes: number;
  published_at: string;
  status: "draft" | "published";
  excerpt?: string;
  topics?: string[];
}

/* --- Entity: awards --- */
export interface AwardEntity {
  id: string;
  title: string;
  organization: string;
  project_name: string;
  year: number;
  verification_url?: string;
  display_order?: number;
}

/* --- API Response Wrappers --- */
export interface ApiListResponse<T> {
  success: boolean;
  count: number;
  data: T[];
}

export interface ApiDetailResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiPaginatedResponse<T> {
  success: boolean;
  total: number;
  page: number;
  data: T[];
}

export interface InquirySubmissionResponse {
  success: boolean;
  inquiry_id: string;
  message: string;
}

/* --- Service/Methodology types (for /about) --- */
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  display_order?: number;
}

export interface MethodologyStep {
  id: string;
  step_number: number;
  title: string;
  description: string;
}

export interface ClientItem {
  id: string;
  name: string;
  industry: string;
  display_order?: number;
}

/* --- Entity: profile --- */
export interface Profile {
  id: string;
  full_name: string;
  pronouns?: string;
  headline: string;
  tagline?: string;
  bio?: string;
  email?: string;
  phone?: string;
  location?: string;
  avatar_url?: string;
  social_links?: Record<string, string>;
  created_at: string;
  updated_at: string;
}

/* --- Entity: experiences --- */
export interface Experience {
  id: string;
  company_name: string;
  company_logo_url?: string;
  role: string;
  employment_type: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  location?: string;
  description?: string;
  skills: string[];
  external_url?: string;
  display_order?: number;
  created_at: string;
}

/* --- Entity: skills --- */
export interface Skill {
  id: string;
  name: string;
  category?: string;
  display_order?: number;
  created_at: string;
}
