import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ePub, { Book as EPUBBook, Rendition } from 'epubjs';
import type { Book } from '@/types/reader';
import type { ReaderSettings } from '@/types/reader';

interface EPUBViewerProps {
  book: Book;
  currentLocation?: string;
  settings: ReaderSettings;
  onLocationChange: (location: string, percentage: number) => void;
}

export default function EPUBViewer({ 
  book, 
  currentLocation, 
  settings,
  onLocationChange 
}: EPUBViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const epubRef = useRef<EPUBBook | null>(null);
  const renditionRef = useRef<Rendition | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentChapter, setCurrentChapter] = useState('');

  useEffect(() => {
    if (!viewerRef.current) return;

    const initEpub = async () => {
      setLoading(true);

      try {
        // Clean up previous instance
        if (renditionRef.current) {
          renditionRef.current.destroy();
        }
        if (epubRef.current) {
          epubRef.current.destroy();
        }

        // Handle base64 data URL
        const epubData = book.fileData.startsWith('data:')
          ? book.fileData.split(',')[1]
          : book.fileData;

        // Create ArrayBuffer from base64
        const binaryString = atob(epubData);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const epub = ePub(bytes.buffer);
        epubRef.current = epub;

        await epub.ready;

        const rendition = epub.renderTo(viewerRef.current!, {
          width: '100%',
          height: '100%',
          spread: 'none',
        });

        renditionRef.current = rendition;

        // Apply theme
        applyTheme(rendition, settings);

        // Navigate to saved location or start
        if (currentLocation) {
          await rendition.display(currentLocation);
        } else {
          await rendition.display();
        }

        // Listen for location changes
        rendition.on('relocated', (location: any) => {
          const percentage = epub.locations.percentageFromCfi(location.start.cfi) * 100;
          onLocationChange(location.start.cfi, percentage);

          // Get chapter info
          epub.loaded.navigation.then((nav) => {
            const chapter = nav.toc.find((item: any) => 
              item.href && location.start.href.includes(item.href.split('#')[0])
            );
            if (chapter) {
              setCurrentChapter(chapter.label);
            }
          });
        });

        // Generate locations for progress tracking
        await epub.locations.generate(1024);

        setLoading(false);
      } catch (error) {
        console.error('Error loading EPUB:', error);
        setLoading(false);
      }
    };

    initEpub();

    return () => {
      if (renditionRef.current) {
        renditionRef.current.destroy();
      }
      if (epubRef.current) {
        epubRef.current.destroy();
      }
    };
  }, [book.fileData]);

  // Apply theme changes
  useEffect(() => {
    if (renditionRef.current) {
      applyTheme(renditionRef.current, settings);
    }
  }, [settings]);

  const applyTheme = (rendition: Rendition, settings: ReaderSettings) => {
    const themeColors: Record<string, { bg: string; color: string }> = {
      light: { bg: '#ffffff', color: '#1a1a1a' },
      dark: { bg: '#1a1a1a', color: '#e5e5e5' },
      sepia: { bg: '#f4ecd8', color: '#5b4636' },
    };

    const colors = themeColors[settings.theme] || themeColors.light;

    rendition.themes.default({
      body: {
        'background': colors.bg,
        'color': colors.color,
        'font-family': settings.fontFamily,
        'font-size': `${settings.fontSize}px`,
        'line-height': '1.6',
        'padding': '20px',
      },
      'p, div, span': {
        'font-family': `${settings.fontFamily} !important`,
      },
    });
  };

  const prevPage = () => {
    renditionRef.current?.prev();
  };

  const nextPage = () => {
    renditionRef.current?.next();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevPage();
      if (e.key === 'ArrowRight') nextPage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chapter indicator */}
      {currentChapter && (
        <div className="p-2 border-b text-center text-sm text-muted-foreground bg-background/95 backdrop-blur">
          {currentChapter}
        </div>
      )}

      {/* EPUB Content */}
      <div className="flex-1 relative">
        <div 
          ref={viewerRef} 
          className="absolute inset-0"
          style={{
            backgroundColor: settings.theme === 'dark' ? '#1a1a1a' : 
                           settings.theme === 'sepia' ? '#f4ecd8' : '#ffffff'
          }}
        />

        {/* Navigation buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 h-16 w-10 opacity-50 hover:opacity-100"
          onClick={prevPage}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-16 w-10 opacity-50 hover:opacity-100"
          onClick={nextPage}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
