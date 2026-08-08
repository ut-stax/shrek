import { createClient as createPublicSupabaseClient } from "@/lib/supabase-public";
import type {
  AwardEntity,
  CategoryEntity,
  ClientItem,
  Experience,
  InquiryEntity,
  MethodologyStep,
  Profile,
  ProjectDetailEntity,
  ServiceItem,
  ArticleEntity,
  MediaAssetEntity,
  Skill,
} from "@/types";

type ProjectRow = {
  id: string;
  title: string;
  slug: string;
  client_name: string;
  category_id: string;
  summary: string;
  challenge_description: string | null;
  solution_description: string | null;
  completion_year: number;
  is_featured: boolean;
  status: "draft" | "published" | "archived";
  external_url: string | null;
  created_at: string;
  updated_at: string;
  tags: string[] | null;
  related_projects: { title: string; slug: string; category_slug: string }[] | null;
  outcome_highlights: string[] | null;
};

type ArticleRow = {
  id: string;
  title: string;
  slug: string;
  author_name: string;
  body_content: string;
  reading_time_minutes: number;
  published_at: string;
  status: "draft" | "published";
  excerpt: string | null;
  topics: string[] | null;
};

async function getPublicSupabase() {
  return createPublicSupabaseClient();
}

async function fetchRows<T>(table: string) {
  const supabase = await getPublicSupabase();
  const result = await supabase.from(table).select("*");

  if (result.error) {
    return [] as T[];
  }

  return result.data as T[];
}

function normalizeMediaAssets(mediaAssets: MediaAssetEntity[], projectId: string): MediaAssetEntity[] {
  return mediaAssets
    .filter((asset) => asset.project_id === projectId)
    .sort((left, right) => left.display_order - right.display_order);
}

async function loadProjectDetails(): Promise<ProjectDetailEntity[]> {
  const supabase = await getPublicSupabase();
  const [projectRowsResult, categoryRowsResult, mediaRowsResult] = await Promise.all([
    supabase.from("projects").select("*").eq("status", "published").order("completion_year", { ascending: false }),
    supabase.from("categories").select("*").order("display_order", { ascending: true }),
    supabase.from("media_assets").select("*").order("display_order", { ascending: true }),
  ]);

  if (projectRowsResult.error || categoryRowsResult.error || mediaRowsResult.error) {
    return [];
  }

  const categories = categoryRowsResult.data as CategoryEntity[];
  const mediaAssets = mediaRowsResult.data as MediaAssetEntity[];

  return (projectRowsResult.data as ProjectRow[]).map((projectRow) => {
    const category = categories.find((item) => item.id === projectRow.category_id);

    if (!category) {
      throw new Error(`Missing category for project ${projectRow.slug}`);
    }

    return {
      id: projectRow.id,
      title: projectRow.title,
      slug: projectRow.slug,
      client_name: projectRow.client_name,
      category_id: projectRow.category_id,
      summary: projectRow.summary,
      challenge_description: projectRow.challenge_description || undefined,
      solution_description: projectRow.solution_description || undefined,
      completion_year: projectRow.completion_year,
      is_featured: projectRow.is_featured,
      status: projectRow.status,
      external_url: projectRow.external_url || undefined,
      created_at: projectRow.created_at,
      updated_at: projectRow.updated_at,
      category,
      tags: projectRow.tags || [],
      related_projects: projectRow.related_projects || [],
      media_assets: normalizeMediaAssets(mediaAssets, projectRow.id),
      outcome_highlights: projectRow.outcome_highlights || [],
    } satisfies ProjectDetailEntity;
  });
}

async function loadArticles(): Promise<ArticleEntity[]> {
  const supabase = await getPublicSupabase();
  const result = await supabase.from("articles").select("*").eq("status", "published").order("published_at", { ascending: false });

  if (result.error) {
    return [];
  }

  return (result.data as ArticleRow[]).map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    author_name: row.author_name,
    body_content: row.body_content,
    reading_time_minutes: row.reading_time_minutes,
    published_at: row.published_at,
    status: row.status,
    excerpt: row.excerpt || undefined,
    topics: row.topics || [],
  }));
}

export async function getCategories(): Promise<CategoryEntity[]> {
  const categories = await fetchRows<CategoryEntity>("categories");
  return categories.sort((left, right) => left.display_order - right.display_order);
}

export async function getFeaturedProjects(): Promise<ProjectDetailEntity[]> {
  return (await loadProjectDetails()).filter((project) => project.is_featured);
}

export async function getProjectsByCategory(categorySlug?: string): Promise<ProjectDetailEntity[]> {
  const projects = await loadProjectDetails();

  if (!categorySlug || categorySlug === "all") {
    return projects;
  }

  return projects.filter((project) => project.category.slug === categorySlug);
}

export async function getProjectBySlug(slug: string): Promise<ProjectDetailEntity | undefined> {
  const projects = await loadProjectDetails();
  return projects.find((project) => project.slug === slug);
}

export async function getPublishedArticles(): Promise<ArticleEntity[]> {
  return loadArticles();
}

export async function getArticleTopics(): Promise<string[]> {
  const articles = await loadArticles();
  return Array.from(new Set(articles.flatMap((article) => article.topics || []).map((topic) => topic.trim()).filter(Boolean))).sort();
}

export async function getArticlesByTopic(topicSlug?: string): Promise<ArticleEntity[]> {
  const articles = await loadArticles();

  if (!topicSlug || topicSlug === "all") {
    return articles;
  }

  return articles.filter((article) => (article.topics || []).some((topic) => topic === topicSlug));
}

export async function getArticleBySlug(slug: string): Promise<ArticleEntity | undefined> {
  const articles = await loadArticles();
  return articles.find((article) => article.slug === slug);
}

export async function getServices(): Promise<ServiceItem[]> {
  const services = await fetchRows<ServiceItem>("services");
  return services.sort((left, right) => (left.display_order || 0) - (right.display_order || 0));
}

export async function getMethodologySteps(): Promise<MethodologyStep[]> {
  const steps = await fetchRows<MethodologyStep>("methodology_steps");
  return steps.sort((left, right) => left.step_number - right.step_number);
}

export async function getClients(): Promise<ClientItem[]> {
  const clients = await fetchRows<ClientItem>("clients");
  return clients.sort((left, right) => (left.display_order || 0) - (right.display_order || 0));
}

export async function getAwards(): Promise<AwardEntity[]> {
  const awards = await fetchRows<AwardEntity>("awards");
  return awards.sort((left, right) => (right.year - left.year) || ((left.display_order || 0) - (right.display_order || 0)));
}

export async function getInquiries(): Promise<InquiryEntity[]> {
  const inquiries = await fetchRows<InquiryEntity>("inquiries");
  return inquiries.sort((left, right) => right.created_at.localeCompare(left.created_at));
}

export async function createInquiry(input: Omit<InquiryEntity, "id" | "status" | "ip_address" | "created_at"> & { ip_address: string }) {
  const client = await getPublicSupabase();

  const record = {
    ...input,
    status: "new" as const,
    created_at: new Date().toISOString(),
    id: crypto.randomUUID(),
  };

  const result = await (client as any).from("inquiries").insert(record).select("*").single();
  return result.error ? { data: null, error: result.error } : { data: result.data as InquiryEntity, error: null };
}

export async function updateInquiryStatus(id: string, status: InquiryEntity["status"]) {
  const client = await getPublicSupabase();

  const result = await (client as any).from("inquiries").update({ status }).eq("id", id).select("*").single();
  return result.error ? { data: null, error: result.error } : { data: result.data as InquiryEntity, error: null };
}

export async function getProfile(): Promise<Profile | null> {
  const supabase = await getPublicSupabase();
  const result = await supabase.from("profile").select("*").limit(1).single();
  if (result.error) return null;
  return result.data as Profile;
}

export async function getExperiences(): Promise<Experience[]> {
  const experiences = await fetchRows<Experience>("experiences");
  return experiences.sort((left, right) => (left.display_order || 0) - (right.display_order || 0));
}

export async function getSkills(): Promise<Skill[]> {
  const skills = await fetchRows<Skill>("skills");
  return skills.sort((left, right) => (left.display_order || 0) - (right.display_order || 0));
}