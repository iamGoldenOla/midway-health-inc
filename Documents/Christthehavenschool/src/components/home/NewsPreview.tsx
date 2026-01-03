import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const news = [
  {
    id: 1,
    title: "End of Year Party - A Memorable Celebration!",
    excerpt: "What a fantastic way to wrap up the school year! On Wednesday, 10th December 2025, our school premises came alive with joy, laughter, and celebration. Children danced to upbeat music, enjoyed delicious treats, and had an absolutely wonderful time together.",
    date: "December 10, 2025",
    category: "Celebration",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "School Concert - A Glorious Evening!",
    excerpt: "Thursday, 11th December 2025 marked the peak of our term's extracurricular activities. The concert kicked off at 4:30 PM at Starizo Event Centre, where parents, friends, and families gathered to witness this glorious celebration of talent marking the birth of our Lord Jesus Christ.",
    date: "December 11, 2025",
    category: "Concert",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Annual Sports Day Celebration",
    excerpt: "Students showcase their athletic prowess at the annual inter-house sports competition with record-breaking performances. The event was a testament to the physical education program at our school.",
    date: "December 5, 2025",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop",
  },
];

const NewsPreview = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Latest Updates
            </span>
            <h2 className="heading-section text-foreground mt-3">
              News & <span className="text-primary">Blog</span>
            </h2>
          </div>
          <Link to="/news">
            <Button variant="outline" className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              View All News
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </Link>
        </motion.div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-lg transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                  {item.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar size={14} />
                  <span>{item.date}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {item.excerpt}
                </p>
                <Link 
                  to={`/news/${item.id}`}
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Read More
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsPreview;