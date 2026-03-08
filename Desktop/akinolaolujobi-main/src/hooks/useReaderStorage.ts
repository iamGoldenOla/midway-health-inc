// Hook for accessing reader storage
// Uses LocalStorageProvider now, can switch to SupabaseProvider later

import { useState, useEffect, useCallback } from 'react';
import { storageProvider } from '@/lib/localStorageProvider';
import type { Book, ReadingProgress, Bookmark, ReaderSettings } from '@/types/reader';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBooks = useCallback(async () => {
    setLoading(true);
    const data = await storageProvider.getBooks();
    setBooks(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const addBook = async (book: Book) => {
    await storageProvider.addBook(book);
    await loadBooks();
  };

  const removeBook = async (bookId: string) => {
    await storageProvider.removeBook(bookId);
    await loadBooks();
  };

  return { books, loading, addBook, removeBook, refreshBooks: loadBooks };
}

export function useReadingProgress(bookId: string | null) {
  const [progress, setProgress] = useState<ReadingProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookId) {
      setProgress(null);
      setLoading(false);
      return;
    }

    const loadProgress = async () => {
      setLoading(true);
      const data = await storageProvider.getProgress(bookId);
      setProgress(data);
      setLoading(false);
    };

    loadProgress();
  }, [bookId]);

  const saveProgress = async (newProgress: Partial<ReadingProgress>) => {
    if (!bookId) return;
    
    const fullProgress: ReadingProgress = {
      id: progress?.id || crypto.randomUUID(),
      bookId,
      currentPage: newProgress.currentPage ?? progress?.currentPage ?? 1,
      currentLocation: newProgress.currentLocation ?? progress?.currentLocation,
      percentage: newProgress.percentage ?? progress?.percentage ?? 0,
      lastReadAt: new Date().toISOString(),
    };

    await storageProvider.saveProgress(fullProgress);
    setProgress(fullProgress);
  };

  return { progress, loading, saveProgress };
}

export function useBookmarks(bookId: string | null) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBookmarks = useCallback(async () => {
    if (!bookId) {
      setBookmarks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const data = await storageProvider.getBookmarks(bookId);
    setBookmarks(data);
    setLoading(false);
  }, [bookId]);

  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  const addBookmark = async (bookmark: Omit<Bookmark, 'id' | 'bookId' | 'createdAt'>) => {
    if (!bookId) return;

    const fullBookmark: Bookmark = {
      ...bookmark,
      id: crypto.randomUUID(),
      bookId,
      createdAt: new Date().toISOString(),
    };

    await storageProvider.addBookmark(fullBookmark);
    await loadBookmarks();
  };

  const removeBookmark = async (bookmarkId: string) => {
    await storageProvider.removeBookmark(bookmarkId);
    await loadBookmarks();
  };

  return { bookmarks, loading, addBookmark, removeBookmark };
}

export function useReaderSettings() {
  const [settings, setSettings] = useState<ReaderSettings>({
    fontSize: 16,
    theme: 'light',
    fontFamily: 'Georgia',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      const data = await storageProvider.getSettings();
      setSettings(data);
      setLoading(false);
    };

    loadSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<ReaderSettings>) => {
    const updated = { ...settings, ...newSettings };
    await storageProvider.saveSettings(updated);
    setSettings(updated);
  };

  return { settings, loading, updateSettings };
}
