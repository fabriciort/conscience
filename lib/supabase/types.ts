// Database Types - Generated from Supabase Schema

export type UserRole = 'viewer' | 'researcher' | 'admin';
export type SubscriptionTier = 'free' | 'essential' | 'advanced' | 'corporate';
export type ResearcherStatus = 'pending' | 'under_review' | 'approved' | 'rejected';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  subscription_tier: SubscriptionTier;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ResearcherProfile {
  id: string;
  user_id: string;
  bio: string | null;
  expertise: string[] | null;
  institution: string | null;
  verification_status: ResearcherStatus;
  verification_documents: any | null;
  contract_signed_at: string | null;
  approved_at: string | null;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: string;
  researcher_id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  duration_seconds: number | null;
  required_tier: SubscriptionTier;
  tags: string[] | null;
  view_count: number;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  researcher_id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image_url: string | null;
  required_tier: SubscriptionTier;
  tags: string[] | null;
  read_count: number;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  tier: SubscriptionTier;
  starts_at: string;
  expires_at: string;
  is_active: boolean;
  payment_provider: string | null;
  payment_id: string | null;
  created_at: string;
}

export interface ViewHistory {
  id: string;
  user_id: string | null;
  video_id: string;
  watched_duration_seconds: number | null;
  completed: boolean;
  created_at: string;
}

// Extended types with relations
export interface VideoWithResearcher extends Video {
  researcher?: Profile;
}

export interface PostWithResearcher extends Post {
  researcher?: Profile;
}

export interface ProfileWithResearcherData extends Profile {
  researcher_profile?: ResearcherProfile;
}

// Database table names
export type Tables = {
  profiles: Profile;
  researcher_profiles: ResearcherProfile;
  videos: Video;
  posts: Post;
  subscriptions: Subscription;
  view_history: ViewHistory;
}

// Supabase Database type
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      researcher_profiles: {
        Row: ResearcherProfile;
        Insert: Omit<ResearcherProfile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ResearcherProfile, 'id' | 'created_at'>>;
      };
      videos: {
        Row: Video;
        Insert: Omit<Video, 'id' | 'created_at' | 'updated_at' | 'view_count'>;
        Update: Partial<Omit<Video, 'id' | 'created_at'>>;
      };
      posts: {
        Row: Post;
        Insert: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'read_count'>;
        Update: Partial<Omit<Post, 'id' | 'created_at'>>;
      };
      subscriptions: {
        Row: Subscription;
        Insert: Omit<Subscription, 'id' | 'created_at'>;
        Update: Partial<Omit<Subscription, 'id' | 'created_at'>>;
      };
      view_history: {
        Row: ViewHistory;
        Insert: Omit<ViewHistory, 'id' | 'created_at'>;
        Update: Partial<Omit<ViewHistory, 'id' | 'created_at'>>;
      };
    };
  };
};

