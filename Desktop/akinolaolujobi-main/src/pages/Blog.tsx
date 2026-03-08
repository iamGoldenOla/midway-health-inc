import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePosts } from '@/hooks/useWordPress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/blog/BlogCard';
import BlogSidebar from '@/components/blog/BlogSidebar';
import Pagination from '@/components/blog/Pagination';
import { Skeleton } from '@/components/ui/skeleton';
import PageHero from '@/components/shared/PageHero';
import CTASection from '@/components/shared/CTASection';
import SEOHead from '@/components/shared/SEOHead';

const POSTS_PER_PAGE = 9;

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = usePosts(currentPage, POSTS_PER_PAGE);

  // Blog listing structured data
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Akinola Olujobi Blog',
    description: 'Insights, stories, and thoughts on content creation, digital marketing, and personal growth.',
    url: 'https://akinolaolujobi.com/blog',
    author: {
      '@type': 'Person',
      name: 'Akinola Olujobi',
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <SEOHead 
        title="Blog"
        description="Insights, stories, and thoughts on content creation, digital marketing, and personal growth by Akinola Olujobi."
        url="https://akinolaolujobi.com/blog"
        keywords="Akinola Olujobi blog, digital marketing tips, content creation, personal growth, public speaking"
      />
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <PageHero 
          title="My Blog"
          subtitle="Insights, stories, and thoughts on content creation, digital marketing, and personal growth."
          backgroundImage="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1920&q=80"
        />

        {/* Blog Posts + Sidebar */}
        <section className="section-padding">
          <div className="container-custom px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {error && (
                  <div className="text-center py-12">
                    <p className="text-destructive">Failed to load posts. Please try again later.</p>
                  </div>
                )}

                {isLoading && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="space-y-4">
                        <Skeleton className="aspect-video w-full rounded-xl" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-20 w-full" />
                      </div>
                    ))}
                  </div>
                )}

                {data && data.posts.length > 0 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                      {data.posts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                      ))}
                    </div>

                    {data.totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={data.totalPages}
                        onPageChange={setCurrentPage}
                      />
                    )}
                  </>
                )}

                {data && data.posts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No posts found.</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <BlogSidebar />
              </div>
            </div>
          </div>
        </section>

        <CTASection 
          title="Want to Stay Updated?"
          subtitle="Subscribe to my newsletter for the latest insights, tips, and stories."
          buttonText="Get In Touch"
        />

        {/* Blog structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      </main>
      <Footer />
    </motion.div>
  );
}
