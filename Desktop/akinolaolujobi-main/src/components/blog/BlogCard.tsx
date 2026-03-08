import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { WPPost, formatDate, stripHtml } from '@/lib/wordpress';

interface BlogCardProps {
  post: WPPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 150) + '...';
  
  // Fallback placeholder for posts without featured images
  const placeholderImage = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80';
  const imageToShow = featuredImage || placeholderImage;

  return (
    <article className="bg-card rounded-xl overflow-hidden shadow-card card-hover">
      <Link to={`/blog/${post.slug}`}>
        <div className="aspect-video overflow-hidden">
          <img
            src={imageToShow}
            alt={post.title.rendered}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar size={14} />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <Link to={`/blog/${post.slug}`}>
          <h2 
            className="text-lg font-heading font-bold text-foreground mb-3 hover:text-primary transition-colors line-clamp-2"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-3">
          {excerpt}
        </p>
        <Link 
          to={`/blog/${post.slug}`}
          className="inline-block mt-4 text-primary font-medium text-sm hover:underline"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}
