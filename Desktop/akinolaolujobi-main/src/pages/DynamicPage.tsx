import { useParams } from 'react-router-dom';
import { usePage } from '@/hooks/useWordPress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';

export default function DynamicPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: page, isLoading, error } = usePage(slug || '');

  const featuredImage = page?._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        {isLoading && (
          <div className="container-custom px-4 md:px-8 py-12">
            <Skeleton className="h-12 w-64 mb-8" />
            <div className="space-y-4 max-w-3xl">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        )}

        {error && (
          <div className="container-custom px-4 md:px-8 py-12 text-center">
            <p className="text-destructive">Failed to load page.</p>
          </div>
        )}

        {page && (
          <article>
            {/* Hero */}
            <div className="bg-primary py-16 md:py-24">
              <div className="container-custom px-4 md:px-8 text-center">
                <h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground"
                  dangerouslySetInnerHTML={{ __html: page.title.rendered }}
                />
              </div>
            </div>

            {/* Featured Image */}
            {featuredImage && (
              <div className="container-custom px-4 md:px-8 -mt-8">
                <img
                  src={featuredImage}
                  alt={page.title.rendered}
                  className="w-full max-w-4xl mx-auto rounded-xl shadow-lg-custom"
                />
              </div>
            )}

            {/* Content */}
            <div className="container-custom px-4 md:px-8 py-12 md:py-16">
              <div 
                className="prose prose-lg max-w-4xl mx-auto prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-img:rounded-lg prose-img:shadow-card"
                dangerouslySetInnerHTML={{ __html: page.content.rendered }}
              />
            </div>
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
}
