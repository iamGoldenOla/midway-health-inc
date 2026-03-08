import { Link } from 'react-router-dom';
import { usePosts } from '@/hooks/useWordPress';
import { stripHtml } from '@/lib/wordpress';

const categories = [
  { name: 'Content Marketing', count: 12 },
  { name: 'Digital Strategy', count: 8 },
  { name: 'Spoken Word', count: 5 },
  { name: 'Personal Growth', count: 10 },
  { name: 'Business Tips', count: 7 },
  { name: 'Creative Writing', count: 6 },
];

export default function BlogSidebar() {
  const { data } = usePosts(1, 5);

  return (
    <aside className="space-y-8">
      {/* Search */}
      <div className="bg-card p-6 rounded-xl shadow-card">
        <h3 className="font-heading font-bold text-foreground mb-4">Search</h3>
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Categories */}
      <div className="bg-card p-6 rounded-xl shadow-card">
        <h3 className="font-heading font-bold text-foreground mb-4">Categories</h3>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category.name}>
              <Link
                to={`/blog?category=${encodeURIComponent(category.name)}`}
                className="flex items-center justify-between text-muted-foreground hover:text-primary transition-colors"
              >
                <span>{category.name}</span>
                <span className="bg-muted px-2 py-0.5 rounded text-xs">{category.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="bg-card p-6 rounded-xl shadow-card">
        <h3 className="font-heading font-bold text-foreground mb-4">Recent Posts</h3>
        <ul className="space-y-4">
          {data?.posts.slice(0, 4).map((post) => (
            <li key={post.id}>
              <Link
                to={`/blog/${post.slug}`}
                className="group block"
              >
                <h4 
                  className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {stripHtml(post.excerpt.rendered).slice(0, 60)}...
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Ad Space 1 */}
      <div className="bg-muted border-2 border-dashed border-border rounded-xl p-8 text-center">
        <p className="text-muted-foreground text-sm">Advertisement</p>
        <div className="w-full h-[250px] bg-muted-foreground/10 rounded-lg mt-2 flex items-center justify-center">
          <span className="text-muted-foreground">300 x 250</span>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-primary p-6 rounded-xl text-primary-foreground">
        <h3 className="font-heading font-bold mb-2">Subscribe to Newsletter</h3>
        <p className="text-sm text-primary-foreground/80 mb-4">
          Get the latest posts delivered straight to your inbox.
        </p>
        <input
          type="email"
          placeholder="Your email address"
          className="w-full px-4 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 mb-3"
        />
        <button className="w-full bg-primary-foreground text-primary font-medium py-2 rounded-lg hover:bg-primary-foreground/90 transition-colors">
          Subscribe
        </button>
      </div>

      {/* Ad Space 2 */}
      <div className="bg-muted border-2 border-dashed border-border rounded-xl p-8 text-center">
        <p className="text-muted-foreground text-sm">Advertisement</p>
        <div className="w-full h-[400px] bg-muted-foreground/10 rounded-lg mt-2 flex items-center justify-center">
          <span className="text-muted-foreground">300 x 600</span>
        </div>
      </div>
    </aside>
  );
}
