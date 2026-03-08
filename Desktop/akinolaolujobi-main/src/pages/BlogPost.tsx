import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePost } from '@/hooks/useWordPress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogSidebar from '@/components/blog/BlogSidebar';
import CommentSection from '@/components/blog/CommentSection';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, ArrowLeft, Share2, Facebook, Twitter, Clock } from 'lucide-react';
import { formatDate, stripHtml } from '@/lib/wordpress';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/shared/SEOHead';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

function estimateReadingTime(html: string): number {
  const text = stripHtml(html);
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = usePost(slug || '');

  const featuredImage = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const readingTime = post ? estimateReadingTime(post.content.rendered) : 0;
  const plainTitle = post ? stripHtml(post.title.rendered) : '';
  const plainExcerpt = post ? stripHtml(post.excerpt.rendered).slice(0, 160) : '';

  // Article structured data for SEO
  const articleSchema = post ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: plainTitle,
    description: plainExcerpt,
    image: featuredImage || 'https://akinolaolujobi.com/og-image.jpg',
    author: {
      '@type': 'Person',
      name: 'Akinola Olujobi',
      url: 'https://akinolaolujobi.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'Akinola Olujobi',
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://akinolaolujobi.com/blog/${slug}`,
    },
    wordCount: stripHtml(post.content.rendered).split(/\s+/).length,
  } : null;

  // BreadcrumbList structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://akinolaolujobi.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://akinolaolujobi.com/blog' },
      ...(post ? [{ '@type': 'ListItem', position: 3, name: plainTitle, item: `https://akinolaolujobi.com/blog/${slug}` }] : []),
    ],
  };

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {post && (
        <SEOHead
          title={plainTitle}
          description={plainExcerpt}
          image={featuredImage}
          url={`https://akinolaolujobi.com/blog/${slug}`}
          type="article"
          publishedTime={post.date}
          modifiedTime={post.date}
        />
      )}
      
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        {isLoading && (
          <div className="container-custom px-4 md:px-8 py-12">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-12 w-full max-w-2xl mb-8" />
            <Skeleton className="aspect-video w-full max-w-4xl mb-8" />
          </div>
        )}

        {error && (
          <div className="container-custom px-4 md:px-8 py-12 text-center">
            <p className="text-destructive mb-4">Failed to load post.</p>
            <Link to="/blog">
              <Button variant="outline">Back to Blog</Button>
            </Link>
          </div>
        )}

        {post && (
          <article>
            {/* Breadcrumbs */}
            <div className="container-custom px-4 md:px-8 pt-4">
              <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
                <ol className="flex items-center gap-2 flex-wrap">
                  <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                  <li>/</li>
                  <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                  <li>/</li>
                  <li className="text-foreground font-medium truncate max-w-[200px]" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                </ol>
              </nav>
            </div>

            <div className="bg-primary py-12 md:py-20 mt-4">
              <div className="container-custom px-4 md:px-8">
                <Link to="/blog" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors">
                  <ArrowLeft size={16} />
                  Back to Blog
                </Link>
                <h1 
                  className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground max-w-4xl"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div className="flex flex-wrap items-center gap-4 text-primary-foreground/80 mt-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{readingTime} min read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Share2 size={16} />
                    <span>Share:</span>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=https://akinolaolujobi.com/blog/${slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-foreground"
                      aria-label="Share on Facebook"
                    >
                      <Facebook size={16} />
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=https://akinolaolujobi.com/blog/${slug}&text=${encodeURIComponent(plainTitle)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-foreground"
                      aria-label="Share on Twitter"
                    >
                      <Twitter size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {featuredImage && (
              <div className="container-custom px-4 md:px-8 -mt-8">
                <img 
                  src={featuredImage} 
                  alt={plainTitle} 
                  className="w-full max-w-4xl rounded-xl shadow-lg-custom"
                  loading="eager"
                />
              </div>
            )}

            <div className="container-custom px-4 md:px-8 py-12">
              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <div 
                    className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                  />
                  <CommentSection />
                </div>
                <BlogSidebar />
              </div>
            </div>

            {/* Article & Breadcrumb structured data */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
          </article>
        )}
      </main>
      <Footer />
    </motion.div>
  );
}
