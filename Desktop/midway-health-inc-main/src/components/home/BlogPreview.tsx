import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { blogPosts } from "@/data/blogPosts";

const posts = blogPosts.slice(0, 3);

const BlogPreview = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 lg:py-28 bg-muted" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header row: title left, description right */}
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <div>
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Our News
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mt-3 leading-[1.1]">
              Insights That Care as<br />Much as We Do
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md leading-relaxed">
            Explore helpful tips, health advice, and stories that inspire better caregiving and healthier living — all from the heart of compassionate care.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-3 leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/blog">
            <Button
              variant="outline"
              className="rounded-xl px-8 border-border hover:bg-muted"
            >
              View All Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
