import useSEO from "@/hooks/useSEO";
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Search, User } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import NewsletterSubscribe from "@/components/shared/NewsletterSubscribe";
import heroImg from "@/assets/blog-hero.jpg";

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

const Blog = () => {
  useSEO("Blog | Midway Health Inc.", "Read expert articles on home healthcare, recovery tips, senior care, and wellness from the Midway Health Inc. team.");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = blogPosts.filter((post) => {
    const matchesCat = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <Layout>
      <PageHero image={heroImg} title="Our Blog" subtitle="Insights, tips, and updates from our healthcare professionals." />

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl"
                    maxLength={100}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-10">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-warm text-warm-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Blog Cards */}
              <div className="space-y-8">
                {filtered.map((post) => (
                  <Link key={post.slug} to={`/blog/${post.slug}`} className="group block">
                    <article className="bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-elevated transition-shadow">
                      <div className="md:flex">
                        <div className="md:w-2/5 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-60 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <div className="md:w-3/5 p-6 flex flex-col justify-center">
                          <span className="text-xs font-semibold text-warm uppercase tracking-wider mb-2">
                            {post.category}
                          </span>
                          <h2 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 leading-snug">
                            {post.title}
                          </h2>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" /> {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="h-3.5 w-3.5" /> {post.author}
                            </span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}

                {filtered.length === 0 && (
                  <div className="bg-muted rounded-2xl p-12 text-center">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">No articles found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filter.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Ad Space */}
              <div className="bg-muted rounded-2xl border border-border p-6 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Advertisement</p>
                <div className="bg-border/50 rounded-xl h-64 flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Ad Space Available</span>
                </div>
              </div>

              {/* Newsletter */}
              <NewsletterSubscribe />

              {/* Recent Posts */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 4).map((post) => (
                    <Link key={post.slug} to={`/blog/${post.slug}`} className="group flex gap-3">
                      <img src={post.image} alt={post.title} className="w-16 h-16 rounded-lg object-cover shrink-0" loading="lazy" />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h4>
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Ad Space 2 */}
              <div className="bg-muted rounded-2xl border border-border p-6 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Advertisement</p>
                <div className="bg-border/50 rounded-xl h-48 flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Ad Space Available</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
