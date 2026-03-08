import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookLibrary from '@/components/reader/BookLibrary';
import PDFViewer from '@/components/reader/PDFViewer';
import EPUBViewer from '@/components/reader/EPUBViewer';
import ReaderControls from '@/components/reader/ReaderControls';
import { useReadingProgress, useBookmarks, useReaderSettings } from '@/hooks/useReaderStorage';
import type { Book, Bookmark } from '@/types/reader';

export default function EbookReader() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { progress, saveProgress } = useReadingProgress(selectedBook?.id || null);
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks(selectedBook?.id || null);
  const { settings, updateSettings } = useReaderSettings();

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
  };

  const handleBack = () => {
    setSelectedBook(null);
  };

  // PDF page change handler
  const handlePDFPageChange = useCallback((page: number, totalPages: number) => {
    const percentage = (page / totalPages) * 100;
    saveProgress({
      currentPage: page,
      percentage,
    });
  }, [saveProgress]);

  // EPUB location change handler
  const handleEPUBLocationChange = useCallback((location: string, percentage: number) => {
    saveProgress({
      currentLocation: location,
      percentage,
    });
  }, [saveProgress]);

  // Bookmark handlers
  const handleAddBookmark = (title: string, note?: string) => {
    addBookmark({
      title,
      note,
      page: progress?.currentPage,
      location: progress?.currentLocation,
    });
  };

  const handleGoToBookmark = (bookmark: Bookmark) => {
    // The viewer will handle navigation based on bookmark data
    // For PDF, we update page; for EPUB, we update location
    if (bookmark.page) {
      saveProgress({ currentPage: bookmark.page });
    } else if (bookmark.location) {
      saveProgress({ currentLocation: bookmark.location });
    }
  };

  return (
    <>
      <Helmet>
        <title>Ebook Reader - Read PDF & EPUB Books | Akinola Josiah</title>
        <meta 
          name="description" 
          content="Read your PDF and EPUB books online. Track your reading progress, add bookmarks, and customize your reading experience." 
        />
      </Helmet>

      {!selectedBook ? (
        <>
          <Header />
          <main className="min-h-screen pt-20 pb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Ebook Reader
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Upload and read your PDF and EPUB books. Your reading progress and bookmarks 
                    are saved automatically so you can pick up where you left off.
                  </p>
                </div>
                
                <BookLibrary onSelectBook={handleSelectBook} />
              </div>
            </div>
          </main>
          <Footer />
        </>
      ) : (
        <div className="h-screen flex flex-col bg-background">
          <ReaderControls
            book={selectedBook}
            progress={progress?.percentage || 0}
            bookmarks={bookmarks}
            settings={settings}
            onBack={handleBack}
            onAddBookmark={handleAddBookmark}
            onRemoveBookmark={removeBookmark}
            onGoToBookmark={handleGoToBookmark}
            onUpdateSettings={updateSettings}
          />
          
          <div className="flex-1 overflow-hidden">
            {selectedBook.fileType === 'pdf' ? (
              <PDFViewer
                book={selectedBook}
                currentPage={progress?.currentPage || 1}
                onPageChange={handlePDFPageChange}
              />
            ) : (
              <EPUBViewer
                book={selectedBook}
                currentLocation={progress?.currentLocation}
                settings={settings}
                onLocationChange={handleEPUBLocationChange}
              />
            )}
          </div>
          
          {/* Progress bar */}
          <div className="h-1 bg-muted">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress?.percentage || 0}%` }}
            />
          </div>
        </div>
      )}
    </>
  );
}
