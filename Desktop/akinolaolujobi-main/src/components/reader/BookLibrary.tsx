import { useState, useRef } from 'react';
import { Upload, BookOpen, Trash2, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useBooks, useReadingProgress } from '@/hooks/useReaderStorage';
import type { Book } from '@/types/reader';
import { useToast } from '@/hooks/use-toast';

interface BookLibraryProps {
  onSelectBook: (book: Book) => void;
}

const BookCard = ({ book, onSelect, onDelete }: { 
  book: Book; 
  onSelect: () => void; 
  onDelete: () => void;
}) => {
  const { progress } = useReadingProgress(book.id);
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div 
          className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center cursor-pointer relative"
          onClick={onSelect}
        >
          {book.coverUrl ? (
            <img 
              src={book.coverUrl} 
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center p-4">
              <FileText className="w-12 h-12 mx-auto text-primary/60 mb-2" />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                {book.fileType}
              </span>
            </div>
          )}
          
          {progress && progress.percentage > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
              <div 
                className="h-full bg-primary transition-all"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-sm line-clamp-2 mb-1">{book.title}</h3>
          {book.author && (
            <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {progress ? `${Math.round(progress.percentage)}%` : 'Not started'}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function BookLibrary({ onSelectBook }: BookLibraryProps) {
  const { books, loading, addBook, removeBook } = useBooks();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const processFile = async (file: File) => {
    const fileType = file.name.toLowerCase().endsWith('.epub') ? 'epub' : 'pdf';
    
    // Read file as base64
    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileData = e.target?.result as string;
      
      const book: Book = {
        id: crypto.randomUUID(),
        title: file.name.replace(/\.(pdf|epub)$/i, ''),
        fileType,
        fileData,
        addedAt: new Date().toISOString(),
      };

      await addBook(book);
      toast({
        title: 'Book added',
        description: `"${book.title}" has been added to your library.`,
      });
    };
    
    reader.readAsDataURL(file);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(
      file => file.name.toLowerCase().endsWith('.pdf') || file.name.toLowerCase().endsWith('.epub')
    );

    for (const file of files) {
      await processFile(file);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    for (const file of files) {
      await processFile(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (bookId: string, title: string) => {
    await removeBook(bookId);
    toast({
      title: 'Book removed',
      description: `"${title}" has been removed from your library.`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-primary/50'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">Upload Books</h3>
        <p className="text-muted-foreground mb-4">
          Drag & drop PDF or EPUB files here, or click to browse
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.epub"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
        <Button onClick={() => fileInputRef.current?.click()}>
          <Upload className="w-4 h-4 mr-2" />
          Choose Files
        </Button>
      </div>

      {/* Library Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-0">
                <div className="aspect-[3/4] bg-muted" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : books.length > 0 ? (
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Your Library ({books.length})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onSelect={() => onSelectBook(book)}
                onDelete={() => handleDelete(book.id, book.title)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold mb-2">No books yet</h3>
          <p className="text-muted-foreground">
            Upload your first PDF or EPUB to get started
          </p>
        </div>
      )}
    </div>
  );
}
