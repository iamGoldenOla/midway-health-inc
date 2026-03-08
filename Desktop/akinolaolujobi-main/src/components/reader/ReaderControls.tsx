import { useState } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  BookmarkPlus, 
  Settings, 
  Sun, 
  Moon, 
  Type,
  List,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import type { Book, Bookmark as BookmarkType, ReaderSettings } from '@/types/reader';

interface ReaderControlsProps {
  book: Book;
  progress: number;
  bookmarks: BookmarkType[];
  settings: ReaderSettings;
  onBack: () => void;
  onAddBookmark: (title: string, note?: string) => void;
  onRemoveBookmark: (id: string) => void;
  onGoToBookmark: (bookmark: BookmarkType) => void;
  onUpdateSettings: (settings: Partial<ReaderSettings>) => void;
}

export default function ReaderControls({
  book,
  progress,
  bookmarks,
  settings,
  onBack,
  onAddBookmark,
  onRemoveBookmark,
  onGoToBookmark,
  onUpdateSettings,
}: ReaderControlsProps) {
  const [bookmarkTitle, setBookmarkTitle] = useState('');
  const [bookmarkNote, setBookmarkNote] = useState('');

  const handleAddBookmark = () => {
    if (bookmarkTitle.trim()) {
      onAddBookmark(bookmarkTitle.trim(), bookmarkNote.trim() || undefined);
      setBookmarkTitle('');
      setBookmarkNote('');
    }
  };

  const fonts = [
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Verdana', label: 'Verdana' },
    { value: 'Merriweather', label: 'Merriweather' },
  ];

  return (
    <div className="flex items-center justify-between p-3 border-b bg-background/95 backdrop-blur sticky top-0 z-10">
      {/* Left: Back & Title */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="min-w-0">
          <h1 className="font-semibold truncate text-sm">{book.title}</h1>
          <p className="text-xs text-muted-foreground">
            {Math.round(progress)}% complete
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        {/* Bookmarks */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bookmark className="w-5 h-5" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <List className="w-5 h-5" />
                Bookmarks
              </SheetTitle>
            </SheetHeader>
            
            <div className="mt-6 space-y-4">
              {/* Add bookmark form */}
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <BookmarkPlus className="w-4 h-4" />
                  Add Bookmark
                </div>
                <Input
                  placeholder="Bookmark title"
                  value={bookmarkTitle}
                  onChange={(e) => setBookmarkTitle(e.target.value)}
                />
                <Input
                  placeholder="Note (optional)"
                  value={bookmarkNote}
                  onChange={(e) => setBookmarkNote(e.target.value)}
                />
                <Button 
                  onClick={handleAddBookmark} 
                  disabled={!bookmarkTitle.trim()}
                  className="w-full"
                >
                  Save Bookmark
                </Button>
              </div>

              <Separator />

              {/* Bookmark list */}
              <ScrollArea className="h-[400px]">
                {bookmarks.length > 0 ? (
                  <div className="space-y-2">
                    {bookmarks.map((bm) => (
                      <div 
                        key={bm.id}
                        className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <button
                            className="text-left flex-1 min-w-0"
                            onClick={() => onGoToBookmark(bm)}
                          >
                            <p className="font-medium text-sm truncate">{bm.title}</p>
                            {bm.note && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {bm.note}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(bm.createdAt).toLocaleDateString()}
                            </p>
                          </button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100"
                            onClick={() => onRemoveBookmark(bm.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground text-sm py-8">
                    No bookmarks yet. Add one to save your place!
                  </p>
                )}
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>

        {/* Settings */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Reading Settings
              </SheetTitle>
            </SheetHeader>
            
            <div className="mt-6 space-y-6">
              {/* Theme */}
              <div className="space-y-3">
                <Label>Theme</Label>
                <div className="flex gap-2">
                  {[
                    { value: 'light', icon: Sun, label: 'Light' },
                    { value: 'dark', icon: Moon, label: 'Dark' },
                    { value: 'sepia', icon: Type, label: 'Sepia' },
                  ].map(({ value, icon: Icon, label }) => (
                    <Button
                      key={value}
                      variant={settings.theme === value ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => onUpdateSettings({ theme: value as ReaderSettings['theme'] })}
                    >
                      <Icon className="w-4 h-4 mr-1" />
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Font Size</Label>
                  <span className="text-sm text-muted-foreground">{settings.fontSize}px</span>
                </div>
                <Slider
                  value={[settings.fontSize]}
                  min={12}
                  max={28}
                  step={1}
                  onValueChange={([value]) => onUpdateSettings({ fontSize: value })}
                />
              </div>

              {/* Font Family */}
              <div className="space-y-3">
                <Label>Font</Label>
                <Select 
                  value={settings.fontFamily}
                  onValueChange={(value) => onUpdateSettings({ fontFamily: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map((font) => (
                      <SelectItem 
                        key={font.value} 
                        value={font.value}
                        style={{ fontFamily: font.value }}
                      >
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
