import { Link } from 'react-router-dom';
import { usePosts } from '@/hooks/useWordPress';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, Calendar } from 'lucide-react';
import { WPPost, formatDate, stripHtml } from '@/lib/wordpress';
import AnimatedSection from '@/components/shared/AnimatedSection';

function PremiumBlogCard({ post, featured = false }: { post: WPPost; featured?: boolean }) {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const placeholderImage = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80';
  const imageToShow = featuredImage || placeholderImage;
  const excerpt = stripHtml(post.excerpt.rendered).slice(0, featured ? 200 : 120) + '...';

  if (featured) {
    return (
      <article className="group relative rounded-2xl overflow-hidden shadow-lg-custom bg-card">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
            <img
              src={imageToShow}
              alt={post.title.rendered}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span className="inline-block px-3 py-1 rounded-full bg-coral/10 text-coral text-xs font-semibold tracking-wider uppercase mb-4 w-fit">
              Featured
            </span>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Calendar size={14} />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <Link to={`/blog/${post.slug}`}>
              <h3
                className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4 hover:text-primary transition-colors leading-tight line-clamp-2"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
            </Link>
            <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
              {excerpt}
            </p>
            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-coral font-semibold hover:gap-3 transition-all duration-300"
            >
              Read Article <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
      <Link to={`/blog/${post.slug}`}>
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={imageToShow}
            alt={post.title.rendered}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar size={14} />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <Link to={`/blog/${post.slug}`}>
          <h3
            className="text-lg font-heading font-bold text-foreground mb-3 hover:text-primary transition-colors line-clamp-2 leading-snug"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {excerpt}
        </p>
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-coral font-medium text-sm hover:gap-3 transition-all duration-300"
        >
          Read More <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}

export default function FeaturedBlogSection() {
  const { data, isLoading, error } = usePosts(1, 3);

  if (error) return null;

  return (
    <section className="section-padding bg-muted/50">
      <div className="container-custom px-4 md:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Blog
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Latest From The Blog
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Insights, stories, and thoughts on content creation, digital marketing, and personal growth.
          </p>
        </AnimatedSection>

        {isLoading && (
          <div className="space-y-8">
            <Skeleton className="aspect-[2/1] w-full rounded-2xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </div>
          </div>
        )}

        {data && data.posts.length > 0 && (
          <div className="space-y-8">
            <AnimatedSection animation="fadeUp">
              <PremiumBlogCard post={data.posts[0]} featured />
            </AnimatedSection>

            {data.posts.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.posts.slice(1).map((post, index) => (
                  <AnimatedSection key={post.id} animation="fadeUp" delay={(index + 1) * 100}>
                    <PremiumBlogCard post={post} />
                  </AnimatedSection>
                ))}
              </div>
            )}

            <AnimatedSection className="text-center pt-4" delay={300}>
              <Link to="/blog">
                <Button variant="default" size="lg" className="px-8 group">
                  View All Posts
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        )}
      </div>
    </section>
  );
}
