import { motion } from "framer-motion";
<<<<<<< HEAD
import { Calendar, ArrowRight, Search, Bell, Megaphone } from "lucide-react";
=======
import { ArrowRight } from "lucide-react";
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
=======
import heroBg from "@/assets/hero-6.jpg";
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44

const newsArticles = [
  {
    id: 1,
    title: "End of Year Party - A Memorable Celebration!",
    excerpt: "What a fantastic way to wrap up the school year! On Wednesday, 10th December 2025, our school premises came alive with joy, laughter, and celebration. The children danced to upbeat music, enjoyed delicious treats, and had an absolutely wonderful time together. It was a day filled with fun activities that left beautiful memories for everyone.",
    content: "Full article content here...",
    date: "December 10, 2025",
    category: "Celebration",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=500&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "School Concert - A Glorious Evening!",
    excerpt: "Thursday, 11th December 2025 marked the peak of our term's extracurricular activities. The concert kicked off at 4:30 PM at Starizo Event Centre, where parents, friends, and families gathered for this glorious celebration. The evening was a magnificent showcase of our students' talents, marking the birth of our Lord Jesus Christ with songs, dances, and dramatic performances.",
    content: "Full article content here...",
    date: "December 11, 2025",
    category: "Concert",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    id: 3,
    title: "Annual Sports Day Celebration",
    excerpt: "Students showcase their athletic prowess at the annual inter-house sports competition with amazing performances. The event was a testament to the physical education program at our school.",
    content: "Full article content here...",
    date: "December 5, 2025",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    id: 4,
    title: "Art Exhibition Showcases Student Creativity",
    excerpt: "The annual art exhibition displayed artworks created by students from all classes, demonstrating the vibrant creative culture at Christ The Haven School.",
    content: "Full article content here...",
    date: "November 28, 2025",
    category: "Arts",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=500&fit=crop",
    featured: false,
  },
];

const informationDesk = [
  {
    id: 1,
    title: "Second Term Resumption",
    message: "School resumes for second term on Monday, January 6th, 2026. All students should be in school by 8:00 AM.",
    date: "December 2025",
    type: "Important",
  },
  {
    id: 2,
    title: "Fee Payment Reminder",
    message: "Parents are reminded to complete school fees payment before resumption. Contact the school office for more information.",
    date: "December 2025",
    type: "Reminder",
  },
  {
    id: 3,
    title: "New School Uniform",
    message: "New school uniforms are available at the school store. Please ensure your child has the correct uniform for the new term.",
    date: "December 2025",
    type: "Notice",
  },
];

const categories = ["All", "Celebration", "Concert", "Sports", "Arts"];

const News = () => {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
<<<<<<< HEAD
      <section className="pt-32 pb-16 bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
=======
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-primary/85" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto text-primary-foreground"
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
          >
            <h1 className="heading-display mb-4">News & Blog</h1>
            <p className="text-lg opacity-90">
              Stay updated with the latest news, events, and stories from Christ The Haven School
            </p>
          </motion.div>
        </div>
      </section>

      {/* Information Desk */}
<<<<<<< HEAD
      <section className="py-8 bg-yellow">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Megaphone className="text-yellow" size={20} />
            </div>
            <h2 className="font-serif text-xl font-bold text-primary">Information Desk</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {informationDesk.map((info, index) => (
              <motion.div
                key={info.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-primary/10 rounded-xl p-4 border border-primary/20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Bell size={14} className="text-primary" />
                  <span className="text-xs font-medium text-primary">{info.type}</span>
                  <span className="text-xs text-primary/60 ml-auto">{info.date}</span>
                </div>
                <h3 className="font-semibold text-primary mb-1">{info.title}</h3>
                <p className="text-sm text-primary/80">{info.message}</p>
              </motion.div>
            ))}
=======
      <section className="py-16 bg-gradient-to-br from-primary via-primary to-navy-dark relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="container-custom relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 bg-yellow/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-yellow/30">
              <h2 className="font-serif text-2xl font-bold text-white">Information Desk</h2>
            </div>
            <p className="text-white/80 max-w-xl mx-auto">
              Stay informed with the latest announcements and important updates from Christ The Haven School
            </p>
          </motion.div>
          
          {/* Information Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {informationDesk.map((info, index) => {
              const getTypeColor = (type: string) => {
                switch(type) {
                  case 'Important': return 'bg-red-500/15 text-red-300 border-red-400/20';
                  case 'Reminder': return 'bg-yellow/15 text-yellow/90 border-yellow/20';
                  default: return 'bg-blue-500/10 text-blue-300 border-blue-400/20';
                }
              };
              
              return (
                <motion.div
                  key={info.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group relative bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-yellow/30 transition-all duration-300 hover:shadow-xl hover:shadow-yellow/5"
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    {/* Type Badge & Date */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${getTypeColor(info.type)}`}>
                        {info.type}
                      </span>
                      <span className="text-xs text-white/60 font-medium">{info.date}</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-yellow transition-colors">
                      {info.title}
                    </h3>
                    
                    {/* Divider */}
                    <div className="w-12 h-1 bg-gradient-to-r from-yellow to-secondary rounded-full mb-4" />
                    
                    {/* Message */}
                    <p className="text-white/80 leading-relaxed text-sm">
                      {info.message}
                    </p>
                  </div>
                  
                  {/* Corner Number */}
                  <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="font-serif text-5xl font-bold text-yellow">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </motion.div>
              );
            })}
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-muted border-b border-border">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
<<<<<<< HEAD
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-secondary"
=======
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-secondary"
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    category === "All"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground hover:bg-primary/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {newsArticles.filter(a => a.featured).map((article) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-8 items-center"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <span className="absolute top-4 left-4 px-4 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                  Featured
                </span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">
                    {article.category}
                  </span>
<<<<<<< HEAD
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={14} />
                    <span>{article.date}</span>
                  </div>
=======
                  <span className="text-sm text-muted-foreground">
                    {article.date}
                  </span>
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
                </div>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {article.title}
                </h2>
                <p className="text-body mb-6">
                  {article.excerpt}
                </p>
                <Link to={`/news/${article.id}`}>
                  <Button className="bg-primary text-primary-foreground hover:bg-navy-light">
                    Read Full Article
                    <ArrowRight size={18} />
                  </Button>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* All Articles */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="heading-section text-foreground">
              Latest <span className="text-secondary">Articles</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.filter(a => !a.featured).map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-lg transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                    {article.category}
                  </span>
                </div>
                <div className="p-6">
<<<<<<< HEAD
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar size={14} />
                    <span>{article.date}</span>
                  </div>
=======
                  <span className="text-sm text-muted-foreground mb-3 block">
                    {article.date}
                  </span>
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  <Link 
                    to={`/news/${article.id}`}
                    className="inline-flex items-center text-sm font-medium text-secondary hover:underline"
                  >
                    Read More
                    <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="heading-section mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-lg opacity-90 mb-8">
              Stay informed about school news, events, and important announcements
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:border-yellow"
              />
              <Button className="bg-yellow text-primary hover:bg-yellow-dark">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default News;