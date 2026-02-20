import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, Clock, MessageCircle, Share2, Heart, Tag, ChevronRight, CheckCircle } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import NewsletterSubscribe from "@/components/shared/NewsletterSubscribe";
import BlogAdBanner from "@/components/shared/BlogAdBanner";
import { useToast } from "@/hooks/use-toast";
import { commentsApi } from "@/services/api";

interface Comment {
  id: string;
  name: string;
  created_at: string;
  comment: string;
}

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [honeypot, setHoneypot] = useState(""); // spam trap

  // Load real comments from Supabase
  useEffect(() => {
    if (slug) {
      commentsApi.getBySlug(slug)
        .then((data) => setComments((data ?? []) as Comment[]))
        .catch(console.error)
        .finally(() => setCommentsLoading(false));
    }
  }, [slug]);

  // Dynamic page title for SEO
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Midway Health Inc. Blog`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", post.excerpt);
    }
    return () => {
      document.title = "Midway Health Inc. | Compassionate Home Healthcare";
    };
  }, [post]);

  if (!post) {
    return (
      <Layout>
        <div className="pt-32 pb-20 text-center container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
        </div>
      </Layout>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot check — bots fill this, humans don't
    if (honeypot) return;
    if (!commentName.trim() || !commentText.trim() || !slug) return;
    setCommentSubmitting(true);
    try {
      await commentsApi.create({
        post_slug: slug,
        name: commentName.trim(),
        email: commentEmail.trim() || undefined,
        comment: commentText.trim(),
      });
      setCommentName("");
      setCommentEmail("");
      setCommentText("");
      setCommentSubmitted(true);
      toast({ title: "Comment submitted!", description: "Your comment is awaiting moderation and will appear shortly." });
    } catch (err: any) {
      toast({ title: "Error submitting comment", description: err.message, variant: "destructive" });
    } finally {
      setCommentSubmitting(false);
    }
  };

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Midway Health Inc.",
    },
  };

  return (
    <Layout>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Image */}
      <header className="relative h-[45vh] min-h-[360px] overflow-hidden">
        <div
          className="absolute inset-0 parallax-bg"
          style={{ backgroundImage: `url(${post.image})`, backgroundPosition: "center top" }}
        />
        {/* Minimal bottom fade for breadcrumb readability only */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Breadcrumb overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container mx-auto px-4 pb-6">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/80">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white font-medium truncate max-w-[200px]">{post.title}</span>
            </nav>
          </div>
        </div>
      </header>

      <main className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 max-w-6xl mx-auto">
            {/* Main Article */}
            <article itemScope itemType="https://schema.org/BlogPosting">
              {/* Back link */}
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-8 transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>

              {/* Category & Meta */}
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                  <Tag className="h-3 w-3" />
                  {post.category}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {post.readTime}
                </span>
              </div>

              {/* Title - H1 */}
              <h1
                itemProp="headline"
                className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-[1.15]"
              >
                {post.title}
              </h1>

              {/* Author Card */}
              <div className="flex items-center justify-between py-6 mb-10 border-y border-border">
                <div className="flex items-center gap-4">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                    loading="lazy"
                  />
                  <div>
                    <p itemProp="author" className="text-sm font-bold text-foreground">
                      {post.author}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-0.5">
                      <time itemProp="datePublished" className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {post.date}
                      </time>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Article Content — well-spaced prose */}
              <div
                itemProp="articleBody"
                className="prose prose-lg max-w-none
                  prose-headings:font-display prose-headings:text-foreground prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:leading-tight prose-h2:pt-4 prose-h2:border-t prose-h2:border-border/50
                  prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-12 prose-h3:mb-5
                  prose-p:text-muted-foreground prose-p:leading-[1.85] prose-p:mb-7 prose-p:text-base prose-p:md:text-lg
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground
                  prose-ul:my-6 prose-ul:space-y-2
                  prose-li:text-muted-foreground prose-li:leading-relaxed
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8
                  prose-img:rounded-2xl prose-img:shadow-card prose-img:my-10
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags / Share Strip */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">Tags:</span>
                  <span className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground font-medium">{post.category}</span>
                  <span className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground font-medium">Home Healthcare</span>
                  <span className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground font-medium">Midway Health</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Share:</span>
                  <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 hover:bg-primary/10">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Author Bio Card */}
              <div className="mt-10 bg-muted/50 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-5 items-start">
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20 shrink-0"
                  loading="lazy"
                />
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">About the Author</p>
                  <h3 className="text-lg font-bold text-foreground mb-2">{post.author}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A dedicated healthcare professional at Midway Health Inc., committed to sharing knowledge and
                    empowering patients and families through educational content about home healthcare.
                  </p>
                </div>
              </div>

              {/* Comments Section */}
              <section className="mt-16 pt-10 border-t border-border" aria-label="Comments">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                  <MessageCircle className="h-7 w-7 text-primary" />
                  Comments ({comments.length})
                </h2>

                <div className="space-y-6 mb-10">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-muted/50 rounded-2xl p-6 border border-border">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                          {comment.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{comment.name}</p>
                          <p className="text-xs text-muted-foreground">{comment.date}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed pl-[52px]">{comment.text}</p>
                    </div>
                  ))}
                </div>

                {/* Comment Form */}
                <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">Leave a Comment</h3>
                  <p className="text-sm text-muted-foreground mb-6">Share your thoughts and experiences.</p>
                  <form onSubmit={handleCommentSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        placeholder="Your name *"
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                        required
                        className="rounded-xl h-12"
                        maxLength={100}
                      />
                      <Input
                        type="email"
                        placeholder="Your email *"
                        value={commentEmail}
                        onChange={(e) => setCommentEmail(e.target.value)}
                        required
                        className="rounded-xl h-12"
                        maxLength={255}
                      />
                    </div>
                    <Textarea
                      placeholder="Write your comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      required
                      className="rounded-xl min-h-[140px]"
                      maxLength={1000}
                    />
                    <Button type="submit" className="bg-primary text-primary-foreground border-0 rounded-xl px-8 py-5 hover:opacity-90 transition-opacity font-semibold">
                      Post Comment
                    </Button>
                  </form>
                </div>
              </section>

              {/* Related Posts */}
              <section className="mt-16 pt-10 border-t border-border" aria-label="Related articles">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {relatedPosts.map((rp) => (
                    <Link key={rp.slug} to={`/blog/${rp.slug}`} className="group">
                      <div className="rounded-xl overflow-hidden mb-3 aspect-[16/10]">
                        <img
                          src={rp.image}
                          alt={rp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-xs text-primary font-semibold uppercase tracking-wide">{rp.category}</span>
                      <h3 className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug mt-1.5 line-clamp-2">
                        {rp.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">{rp.date}</p>
                    </Link>
                  ))}
                </div>
              </section>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
              {/* Ad Banner */}
              <BlogAdBanner size="tall" />

              <NewsletterSubscribe />

              {/* Recent Posts */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-5">Recent Posts</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 4).map((p) => (
                    <Link key={p.slug} to={`/blog/${p.slug}`} className="group flex gap-3">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-16 h-16 rounded-lg object-cover shrink-0"
                        loading="lazy"
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                          {p.title}
                        </h4>
                        <span className="text-xs text-muted-foreground mt-1 block">{p.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-5">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(blogPosts.map((p) => p.category))).map((cat) => (
                    <Link
                      key={cat}
                      to="/blog"
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Ad Banner 2 */}
              <BlogAdBanner size="medium" />
            </aside>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default BlogPost;
