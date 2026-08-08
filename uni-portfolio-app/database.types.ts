export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          display_order: number;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          display_order?: number;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          display_order?: number;
        };
        Relationships: [];
      };
      projects: {
        Row: {
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
          tags: string[];
          related_projects: { title: string; slug: string; category_slug: string }[];
          outcome_highlights: string[];
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          client_name: string;
          category_id: string;
          summary: string;
          challenge_description?: string | null;
          solution_description?: string | null;
          completion_year: number;
          is_featured?: boolean;
          status?: "draft" | "published" | "archived";
          external_url?: string | null;
          created_at?: string;
          updated_at?: string;
          tags?: string[];
          related_projects?: { title: string; slug: string; category_slug: string }[];
          outcome_highlights?: string[];
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          client_name?: string;
          category_id?: string;
          summary?: string;
          challenge_description?: string | null;
          solution_description?: string | null;
          completion_year?: number;
          is_featured?: boolean;
          status?: "draft" | "published" | "archived";
          external_url?: string | null;
          created_at?: string;
          updated_at?: string;
          tags?: string[];
          related_projects?: { title: string; slug: string; category_slug: string }[];
          outcome_highlights?: string[];
        };
        Relationships: [];
      };
      media_assets: {
        Row: {
          id: string;
          project_id: string;
          asset_type: "image" | "video" | "interactive_embed";
          url: string;
          poster_url: string | null;
          alt_text: string;
          width: number | null;
          height: number | null;
          display_order: number;
        };
        Insert: {
          id?: string;
          project_id: string;
          asset_type: "image" | "video" | "interactive_embed";
          url: string;
          poster_url?: string | null;
          alt_text: string;
          width?: number | null;
          height?: number | null;
          display_order?: number;
        };
        Update: {
          id?: string;
          project_id?: string;
          asset_type?: "image" | "video" | "interactive_embed";
          url?: string;
          poster_url?: string | null;
          alt_text?: string;
          width?: number | null;
          height?: number | null;
          display_order?: number;
        };
        Relationships: [];
      };
      articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          author_name: string;
          body_content: string;
          reading_time_minutes: number;
          published_at: string;
          status: "draft" | "published";
          excerpt: string | null;
          topics: string[];
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          author_name: string;
          body_content: string;
          reading_time_minutes: number;
          published_at: string;
          status?: "draft" | "published";
          excerpt?: string | null;
          topics?: string[];
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          author_name?: string;
          body_content?: string;
          reading_time_minutes?: number;
          published_at?: string;
          status?: "draft" | "published";
          excerpt?: string | null;
          topics?: string[];
        };
        Relationships: [];
      };
      awards: {
        Row: {
          id: string;
          title: string;
          organization: string;
          project_name: string;
          year: number;
          verification_url: string | null;
          display_order: number;
        };
        Insert: {
          id?: string;
          title: string;
          organization: string;
          project_name: string;
          year: number;
          verification_url?: string | null;
          display_order?: number;
        };
        Update: {
          id?: string;
          title?: string;
          organization?: string;
          project_name?: string;
          year?: number;
          verification_url?: string | null;
          display_order?: number;
        };
        Relationships: [];
      };
      services: {
        Row: {
          id: string;
          title: string;
          description: string;
          display_order: number;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          display_order?: number;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          display_order?: number;
        };
        Relationships: [];
      };
      methodology_steps: {
        Row: {
          id: string;
          step_number: number;
          title: string;
          description: string;
        };
        Insert: {
          id?: string;
          step_number: number;
          title: string;
          description: string;
        };
        Update: {
          id?: string;
          step_number?: number;
          title?: string;
          description?: string;
        };
        Relationships: [];
      };
      clients: {
        Row: {
          id: string;
          name: string;
          industry: string;
          display_order: number;
        };
        Insert: {
          id?: string;
          name: string;
          industry: string;
          display_order?: number;
        };
        Update: {
          id?: string;
          name?: string;
          industry?: string;
          display_order?: number;
        };
        Relationships: [];
      };
      experiences: {
        Row: {
          id: string;
          company_name: string;
          company_logo_url: string | null;
          role: string;
          employment_type: string;
          start_date: string;
          end_date: string | null;
          is_current: boolean;
          location: string | null;
          description: string | null;
          skills: string[];
          external_url: string | null;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          company_name: string;
          company_logo_url?: string | null;
          role: string;
          employment_type?: string;
          start_date: string;
          end_date?: string | null;
          is_current?: boolean;
          location?: string | null;
          description?: string | null;
          skills?: string[];
          external_url?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          company_name?: string;
          company_logo_url?: string | null;
          role?: string;
          employment_type?: string;
          start_date?: string;
          end_date?: string | null;
          is_current?: boolean;
          location?: string | null;
          description?: string | null;
          skills?: string[];
          external_url?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      profile: {
        Row: {
          id: string;
          full_name: string;
          pronouns: string | null;
          headline: string;
          tagline: string | null;
          bio: string | null;
          email: string | null;
          phone: string | null;
          location: string | null;
          avatar_url: string | null;
          social_links: Record<string, string> | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          pronouns?: string | null;
          headline?: string;
          tagline?: string | null;
          bio?: string | null;
          email?: string | null;
          phone?: string | null;
          location?: string | null;
          avatar_url?: string | null;
          social_links?: Record<string, string> | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          pronouns?: string | null;
          headline?: string;
          tagline?: string | null;
          bio?: string | null;
          email?: string | null;
          phone?: string | null;
          location?: string | null;
          avatar_url?: string | null;
          social_links?: Record<string, string> | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string | null;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      inquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          phone: string | null;
          services: string[];
          budget_range: "<25k" | "25k-50k" | "50k-100k" | "100k+";
          estimated_timeline: string | null;
          project_description: string;
          attachment_url: string | null;
          status: "new" | "read" | "contacted" | "archived" | "email_failed";
          ip_address: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          company?: string | null;
          phone?: string | null;
          services: string[];
          budget_range: "<25k" | "25k-50k" | "50k-100k" | "100k+";
          estimated_timeline?: string | null;
          project_description: string;
          attachment_url?: string | null;
          status?: "new" | "read" | "contacted" | "archived" | "email_failed";
          ip_address: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          company?: string | null;
          phone?: string | null;
          services?: string[];
          budget_range?: "<25k" | "25k-50k" | "50k-100k" | "100k+";
          estimated_timeline?: string | null;
          project_description?: string;
          attachment_url?: string | null;
          status?: "new" | "read" | "contacted" | "archived" | "email_failed";
          ip_address?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, { Row: never; Insert: never; Update: never }>;
    Functions: Record<string, { Args: never; Returns: never }>;
    Enums: Record<string, unknown>;
  };
}
