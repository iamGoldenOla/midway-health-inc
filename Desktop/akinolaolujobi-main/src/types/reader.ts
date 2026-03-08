// Types for the ebook reader - structured for easy Supabase migration

export interface Book {
  id: string;
  title: string;
  author?: string;
  coverUrl?: string;
  fileType: 'pdf' | 'epub';
  fileData: string; // Base64 encoded file data (localStorage) or URL (Supabase)
  addedAt: string;
  totalPages?: number;
  totalLocations?: number; // For EPUB
}

export interface ReadingProgress {
  id: string;
  bookId: string;
  userId?: string; // For future Supabase integration
  currentPage: number;
  currentLocation?: string; // For EPUB CFI
  percentage: number;
  lastReadAt: string;
}

export interface Bookmark {
  id: string;
  bookId: string;
  userId?: string; // For future Supabase integration
  page?: number;
  location?: string; // For EPUB CFI
  title: string;
  note?: string;
  createdAt: string;
}

export interface ReaderSettings {
  fontSize: number;
  theme: 'light' | 'dark' | 'sepia';
  fontFamily: string;
}

// Storage interface - implement for localStorage now, Supabase later
export interface IStorageProvider {
  // Books
  getBooks(): Promise<Book[]>;
  addBook(book: Book): Promise<void>;
  removeBook(bookId: string): Promise<void>;
  
  // Progress
  getProgress(bookId: string): Promise<ReadingProgress | null>;
  saveProgress(progress: ReadingProgress): Promise<void>;
  
  // Bookmarks
  getBookmarks(bookId: string): Promise<Bookmark[]>;
  addBookmark(bookmark: Bookmark): Promise<void>;
  removeBookmark(bookmarkId: string): Promise<void>;
  
  // Settings
  getSettings(): Promise<ReaderSettings>;
  saveSettings(settings: ReaderSettings): Promise<void>;
}
