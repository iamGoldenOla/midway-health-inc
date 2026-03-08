import { supabase } from '@/lib/supabase';

// We keep the WP interfaces the same so the rest of the app doesn't break
export interface WPPost {
  id: number;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export interface WPPage {
  id: number;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  title: { rendered: string };
}

export interface PostsResponse {
  posts: WPPost[];
  totalPages: number;
  totalPosts: number;
}

// Convert Supabase Post format to legacy WP Post format
const adaptPost = (spPost: any): WPPost => {
  return {
    id: spPost.id, // using string UUID as id might cause type issues if strictly number, but usually ok in JS
    date: spPost.created_at,
    title: { rendered: spPost.title },
    content: { rendered: spPost.content },
    excerpt: { rendered: spPost.excerpt || '' },
    slug: spPost.slug,
    featured_media: 1, // mock
    _embedded: {
      'wp:featuredmedia': spPost.featured_image ? [
        {
          source_url: spPost.featured_image,
          alt_text: spPost.title,
        }
      ] : undefined
    }
  };
};

export async function fetchPosts(page: number = 1, perPage: number = 10): Promise<PostsResponse> {
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data, count, error } = await supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .eq('published', true)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  const totalPosts = count || 0;
  const totalPages = Math.ceil(totalPosts / perPage);

  return {
    posts: (data || []).map(adaptPost),
    totalPages,
    totalPosts
  };
}

export async function fetchPost(slug: string): Promise<WPPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !data) return null;

  return adaptPost(data);
}

// Mocks for unused WordPres functions
export async function fetchPages(): Promise<WPPage[]> {
  return [];
}

export async function fetchPage(slug: string): Promise<WPPage | null> {
  return null;
}

export async function fetchMedia(id: number): Promise<WPMedia | null> {
  return null;
}

export async function fetchAllMedia(): Promise<WPMedia[]> {
  return [];
}

export function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
