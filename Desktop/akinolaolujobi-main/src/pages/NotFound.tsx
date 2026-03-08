import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home, Search, BookOpen, Briefcase, Mail, ArrowRight } from "lucide-react";

const popularLinks = [
  { title: "About Us", href: "/about-us", icon: <Search className="w-4 h-4" /> },
  { title: "Our Services", href: "/our-services", icon: <Briefcase className="w-4 h-4" /> },
  { title: "e-Books & Courses", href: "/e-books", icon: <BookOpen className="w-4 h-4" /> },
  { title: "Blog", href: "/blog", icon: <Search className="w-4 h-4" /> },
  { title: "Contact Us", href: "/contact", icon: <Mail className="w-4 h-4" /> },
  { title: "Book a Session", href: "/booking", icon: <Briefcase className="w-4 h-4" /> },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <section className="min-h-[70vh] flex items-center justify-center section-padding">
          <div className="container-custom px-4 md:px-8 max-w-3xl mx-auto text-center">
            {/* Big 404 */}
            <div className="relative mb-8">
              <span className="text-[8rem] md:text-[12rem] font-heading font-bold text-primary/10 leading-none select-none">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Search className="w-10 h-10 text-primary" />
                </div>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
              Page Not Found
            </h1>
            <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
              Sorry, the page <code className="bg-muted px-2 py-0.5 rounded text-sm">{location.pathname}</code> doesn't exist or has been moved.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <Button size="lg" asChild>
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Us
                </Link>
              </Button>
            </div>

            {/* Popular Links */}
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Popular Pages</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {popularLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-card transition-all group"
                  >
                    <span className="text-primary">{link.icon}</span>
                    <span className="text-sm font-medium text-foreground flex-1">{link.title}</span>
                    <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
