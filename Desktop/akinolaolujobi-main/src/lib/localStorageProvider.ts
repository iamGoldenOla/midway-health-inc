// LocalStorage implementation of IStorageProvider
// This can be swapped for SupabaseProvider later

import type { 
  IStorageProvider, 
  Book, 
  ReadingProgress, 
  Bookmark, 
  ReaderSettings 
} from '@/types/reader';

const STORAGE_KEYS = {
  BOOKS: 'ebook_reader_books',
  PROGRESS: 'ebook_reader_progress',
  BOOKMARKS: 'ebook_reader_bookmarks',
  SETTINGS: 'ebook_reader_settings',
};

const DEFAULT_SETTINGS: ReaderSettings = {
  fontSize: 16,
  theme: 'light',
  fontFamily: 'Georgia',
};

export class LocalStorageProvider implements IStorageProvider {
  // Books
  async getBooks(): Promise<Book[]> {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKS);
    return data ? JSON.parse(data) : [];
  }

  async addBook(book: Book): Promise<void> {
    const books = await this.getBooks();
    const existingIndex = books.findIndex(b => b.id === book.id);
    if (existingIndex >= 0) {
      books[existingIndex] = book;
    } else {
      books.push(book);
    }
    localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
  }

  async removeBook(bookId: string): Promise<void> {
    const books = await this.getBooks();
    const filtered = books.filter(b => b.id !== bookId);
    localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(filtered));
    
    // Also remove associated progress and bookmarks
    const allProgress = this.getAllProgress();
    const filteredProgress = allProgress.filter(p => p.bookId !== bookId);
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(filteredProgress));
    
    const allBookmarks = this.getAllBookmarks();
    const filteredBookmarks = allBookmarks.filter(b => b.bookId !== bookId);
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(filteredBookmarks));
  }

  // Progress
  private getAllProgress(): ReadingProgress[] {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : [];
  }

  async getProgress(bookId: string): Promise<ReadingProgress | null> {
    const allProgress = this.getAllProgress();
    return allProgress.find(p => p.bookId === bookId) || null;
  }

  async saveProgress(progress: ReadingProgress): Promise<void> {
    const allProgress = this.getAllProgress();
    const existingIndex = allProgress.findIndex(p => p.bookId === progress.bookId);
    if (existingIndex >= 0) {
      allProgress[existingIndex] = progress;
    } else {
      allProgress.push(progress);
    }
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(allProgress));
  }

  // Bookmarks
  private getAllBookmarks(): Bookmark[] {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return data ? JSON.parse(data) : [];
  }

  async getBookmarks(bookId: string): Promise<Bookmark[]> {
    const allBookmarks = this.getAllBookmarks();
    return allBookmarks.filter(b => b.bookId === bookId);
  }

  async addBookmark(bookmark: Bookmark): Promise<void> {
    const allBookmarks = this.getAllBookmarks();
    allBookmarks.push(bookmark);
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(allBookmarks));
  }

  async removeBookmark(bookmarkId: string): Promise<void> {
    const allBookmarks = this.getAllBookmarks();
    const filtered = allBookmarks.filter(b => b.id !== bookmarkId);
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(filtered));
  }

  // Settings
  async getSettings(): Promise<ReaderSettings> {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
  }

  async saveSettings(settings: ReaderSettings): Promise<void> {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }
}

// Singleton instance
export const storageProvider = new LocalStorageProvider();
