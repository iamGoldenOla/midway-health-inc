import { useQuery } from '@tanstack/react-query';
import { 
  fetchPosts, 
  fetchPost, 
  fetchPages, 
  fetchPage, 
  fetchMedia,
  fetchAllMedia,
  WPPost,
  WPPage,
  WPMedia,
  PostsResponse
} from '@/lib/wordpress';

export function usePosts(page: number = 1, perPage: number = 10) {
  return useQuery<PostsResponse>({
    queryKey: ['posts', page, perPage],
    queryFn: () => fetchPosts(page, perPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function usePost(slug: string) {
  return useQuery<WPPost | null>({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePages() {
  return useQuery<WPPage[]>({
    queryKey: ['pages'],
    queryFn: fetchPages,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function usePage(slug: string) {
  return useQuery<WPPage | null>({
    queryKey: ['page', slug],
    queryFn: () => fetchPage(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
}

export function useMedia(id: number) {
  return useQuery<WPMedia | null>({
    queryKey: ['media', id],
    queryFn: () => fetchMedia(id),
    enabled: !!id,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

export function useAllMedia() {
  return useQuery<WPMedia[]>({
    queryKey: ['allMedia'],
    queryFn: fetchAllMedia,
    staleTime: 30 * 60 * 1000,
  });
}
