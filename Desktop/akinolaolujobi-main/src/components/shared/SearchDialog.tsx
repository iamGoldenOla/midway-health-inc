import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, FileText, BookOpen, Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface SearchResult {
  title: string;
  href: string;
  category: string;
  icon: React.ReactNode;
}

const allPages: SearchResult[] = [
  { title: 'Home', href: '/', category: 'Pages', icon: <FileText className="w-4 h-4" /> },
  { title: 'About Us', href: '/about-us', category: 'Pages', icon: <FileText className="w-4 h-4" /> },
  { title: 'Our Services', href: '/our-services', category: 'Pages', icon: <Briefcase className="w-4 h-4" /> },
  { title: 'I Speak', href: '/services/i-speak', category: 'Services', icon: <Briefcase className="w-4 h-4" /> },
  { title: 'I Teach', href: '/services/i-teach', category: 'Services', icon: <Briefcase className="w-4 h-4" /> },
  { title: 'I Write', href: '/services/i-write', category: 'Services', icon: <Briefcase className="w-4 h-4" /> },
  { title: 'I Sing', href: '/services/i-sing', category: 'Services', icon: <Briefcase className="w-4 h-4" /> },
  { title: 'I Digital', href: '/services/i-digital', category: 'Services', icon: <Briefcase className="w-4 h-4" /> },
  { title: 'I Inspire', href: '/services/i-inspire', category: 'Services', icon: <Briefcase className="w-4 h-4" /> },
  { title: 'Blog', href: '/blog', category: 'Pages', icon: <FileText className="w-4 h-4" /> },
  { title: 'e-Books & Courses', href: '/e-books', category: 'Pages', icon: <BookOpen className="w-4 h-4" /> },
  { title: 'Portfolio', href: '/portfolio', category: 'Pages', icon: <FileText className="w-4 h-4" /> },
  { title: 'Contact', href: '/contact', category: 'Pages', icon: <FileText className="w-4 h-4" /> },
  { title: 'Book a Session', href: '/booking', category: 'Pages', icon: <Briefcase className="w-4 h-4" /> },
  { title: 'FAQ', href: '/faq', category: 'Pages', icon: <FileText className="w-4 h-4" /> },
  { title: 'Privacy Policy', href: '/privacy', category: 'Legal', icon: <FileText className="w-4 h-4" /> },
  { title: 'Terms of Service', href: '/terms', category: 'Legal', icon: <FileText className="w-4 h-4" /> },
];

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('');

  const results = query.trim()
    ? allPages.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : allPages.slice(0, 6);

  const grouped = results.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="sr-only">Search</DialogTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search pages, services..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 border-0 border-b rounded-none focus-visible:ring-0 text-base"
              autoFocus
            />
          </div>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="mb-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">{category}</p>
              {items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => { onOpenChange(false); setQuery(''); }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group"
                >
                  <span className="text-muted-foreground">{item.icon}</span>
                  <span className="flex-1 text-sm font-medium text-foreground">{item.title}</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          ))}
          {query && results.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No results found for "{query}"</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
