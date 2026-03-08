import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeNames: Record<string, string> = {
  '': 'Home',
  'about-us': 'About Us',
  'our-services': 'Services',
  'services': 'Services',
  'i-speak': 'I Speak',
  'i-teach': 'I Teach',
  'i-write': 'I Write',
  'i-sing': 'I Sing',
  'i-digital': 'I Digital',
  'i-inspire': 'I Inspire',
  'blog': 'Blog',
  'contact': 'Contact',
  'e-books': 'E-Books',
  'portfolio': 'Portfolio',
  'checkout': 'Checkout',
  'privacy': 'Privacy Policy',
  'terms': 'Terms of Service',
  'faq': 'FAQ',
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        <li>
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const displayName = routeNames[name] || name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

          return (
            <li key={name} className="flex items-center">
              <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
              {isLast ? (
                <span className="text-foreground font-medium" aria-current="page">
                  {displayName}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
