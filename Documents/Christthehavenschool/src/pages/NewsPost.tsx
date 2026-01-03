import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Share2, MessageCircle, Send, User } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const newsArticles = [
  {
    id: 1,
    title: "End of Year Party - A Memorable Celebration!",
    excerpt: "What a fantastic way to wrap up the school year! On Wednesday, 10th December 2025, our school premises came alive with joy, laughter, and celebration.",
    content: `What a fantastic way to wrap up the school year! On Wednesday, 10th December 2025, our school premises came alive with joy, laughter, and celebration. The children danced to upbeat music, enjoyed delicious treats, and had an absolutely wonderful time together.

It was a day filled with fun activities that left beautiful memories for everyone. The students participated in various games and competitions, showcasing their talents and teamwork. Parents who attended were thrilled to see their children so happy and engaged.

The celebration included:
• Musical performances by different class groups
• Dance competitions with amazing prizes
• Delicious refreshments and treats
• Fun games and activities for all age groups
• Photo sessions to capture the memorable moments

We want to thank all the parents, teachers, and staff who made this event possible. Your support and dedication to our school community is truly appreciated. Here's to more wonderful celebrations in the coming year!`,
    date: "December 10, 2025",
    category: "Celebration",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=500&fit=crop",
  },
  {
    id: 2,
    title: "School Concert - A Glorious Evening!",
    excerpt: "Thursday, 11th December 2025 marked the peak of our term's extracurricular activities.",
    content: `Thursday, 11th December 2025 marked the peak of our term's extracurricular activities. The concert kicked off at 4:30 PM at Starizo Event Centre, where parents, friends, and families gathered for this glorious celebration.

The evening was a magnificent showcase of our students' talents, marking the birth of our Lord Jesus Christ with songs, dances, and dramatic performances. Every child had an opportunity to shine on stage, demonstrating the skills they've developed throughout the term.

Highlights of the evening included:
• Christmas carol performances by the school choir
• Nativity play by the nursery and primary students
• Traditional and contemporary dance performances
• Instrumental performances by our music students
• Drama presentations with powerful messages

The audience was captivated by the dedication and talent displayed by our young performers. Many parents expressed their pride and joy at seeing their children perform with such confidence and skill.

We extend our heartfelt gratitude to all the teachers who trained the students, the parents who supported them, and everyone who attended to make this evening truly special.`,
    date: "December 11, 2025",
    category: "Concert",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=500&fit=crop",
  },
  {
    id: 3,
    title: "Annual Sports Day Celebration",
    excerpt: "Students showcase their athletic prowess at the annual inter-house sports competition with amazing performances.",
    content: `Our Annual Sports Day was a tremendous success! Students from all houses participated with enthusiasm and sportsmanship that made everyone proud.

The event featured various athletic competitions including:
• Track and field events (100m, 200m, relay races)
• Field events (long jump, high jump, shot put)
• Fun races for younger students
• Team sports competitions

The inter-house competition was fierce but friendly, with all four houses giving their best performances. The day concluded with prize distributions and recognition of outstanding athletes.

Congratulations to all participants and winners! Your dedication to physical fitness and teamwork is commendable.`,
    date: "December 5, 2025",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=500&fit=crop",
  },
  {
    id: 4,
    title: "Art Exhibition Showcases Student Creativity",
    excerpt: "The annual art exhibition displayed artworks created by students from all classes.",
    content: `The annual art exhibition was a beautiful display of creativity and artistic talent from students across all classes. The exhibition showcased various forms of art including paintings, drawings, sculptures, and crafts.

Parents and visitors were amazed at the level of creativity and skill demonstrated by our young artists. Each piece told a unique story and reflected the artistic journey of our students throughout the year.

The exhibition featured:
• Paintings and drawings on various themes
• Sculptures and 3D art pieces
• Craft works and recycled art
• Digital art presentations
• Collaborative class projects

We congratulate all our budding artists and thank the art department for nurturing their talents. Keep creating and expressing yourselves through art!`,
    date: "November 28, 2025",
    category: "Arts",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=500&fit=crop",
  },
];

interface Comment {
  id: number;
  name: string;
  message: string;
  date: string;
}

const sampleComments: Comment[] = [
  {
    id: 1,
    name: "Mrs. Adebayo",
    message: "What a wonderful event! My children had so much fun. Thank you to all the staff for organizing this.",
    date: "December 12, 2025",
  },
  {
    id: 2,
    name: "Mr. Okonkwo",
    message: "The performances were amazing! So proud of all the students.",
    date: "December 11, 2025",
  },
];

const NewsPost = () => {
  const { id } = useParams();
  const article = newsArticles.find((a) => a.id === Number(id));
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newComment: Comment = {
      id: comments.length + 1,
      name: name.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    setComments([newComment, ...comments]);
    setName("");
    setMessage("");
    toast({
      title: "Comment Added",
      description: "Your comment has been posted successfully!",
    });
  };

  if (!article) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="pt-32 pb-16 bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h1 className="heading-display mb-4">Article Not Found</h1>
            <p className="text-lg opacity-90 mb-8">
              The article you are looking for does not exist.
            </p>
            <Link to="/news">
              <Button variant="sky">
                <ArrowLeft size={18} />
                Back to News
              </Button>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-8 bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-secondary hover:underline mb-6"
            >
              <ArrowLeft size={18} />
              Back to News
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                {article.category}
              </span>
              <div className="flex items-center gap-2 text-sm opacity-80">
                <Calendar size={14} />
                <span>{article.date}</span>
              </div>
            </div>
            <h1 className="heading-display mb-4">{article.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Article Content with Sidebar */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <div className="rounded-2xl overflow-hidden mb-8">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-80 md:h-96 object-cover"
                />
              </div>

              <div className="prose prose-lg max-w-none">
                {article.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-body mb-4 whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
                <p className="text-muted-foreground">Share this article</p>
                <Button variant="outline" size="sm">
                  <Share2 size={16} />
                  Share
                </Button>
              </div>

              {/* Comments Section */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-2 mb-6">
                  <MessageCircle className="text-secondary" size={24} />
                  <h3 className="font-serif text-2xl font-bold text-foreground">
                    Comments ({comments.length})
                  </h3>
                </div>

                {/* Comment Form */}
                <form onSubmit={handleSubmitComment} className="bg-muted rounded-xl p-6 mb-8">
                  <h4 className="font-medium text-foreground mb-4">Leave a Comment</h4>
                  <div className="space-y-4">
                    <Input
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-background"
                    />
                    <Textarea
                      placeholder="Write your comment..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="bg-background resize-none"
                    />
                    <Button type="submit" className="w-full sm:w-auto">
                      <Send size={16} />
                      Post Comment
                    </Button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-card rounded-xl p-5 shadow-sm"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <User size={20} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-foreground">{comment.name}</h5>
                            <span className="text-xs text-muted-foreground">{comment.date}</span>
                          </div>
                          <p className="text-body text-sm">{comment.message}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Advertisement 1 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground"
              >
                <span className="text-xs uppercase tracking-wider opacity-70">Advertisement</span>
                <h4 className="font-serif text-xl font-bold mt-2 mb-3">
                  Enroll Your Child Today!
                </h4>
                <p className="text-sm opacity-90 mb-4">
                  Give your child the best education at Christ The Haven School. Admissions now open for 2026 session.
                </p>
                <Link to="/admissions">
                  <Button variant="sky" size="sm" className="w-full">
                    Apply Now
                  </Button>
                </Link>
              </motion.div>

              {/* Advertisement 2 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border"
              >
                <span className="text-xs uppercase tracking-wider text-muted-foreground">Sponsored</span>
                <h4 className="font-serif text-lg font-bold text-foreground mt-2 mb-3">
                  Summer Camp 2026
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Fun-filled activities, learning adventures, and new friendships await!
                </p>
                <div className="bg-secondary/10 rounded-lg p-4 text-center">
                  <span className="text-secondary font-bold text-2xl">50% OFF</span>
                  <p className="text-xs text-muted-foreground mt-1">Early Bird Registration</p>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-muted rounded-2xl p-6"
              >
                <h4 className="font-serif text-lg font-bold text-foreground mb-4">Quick Links</h4>
                <ul className="space-y-3">
                  <li>
                    <Link to="/about" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                      → About Our School
                    </Link>
                  </li>
                  <li>
                    <Link to="/academics" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                      → Academic Programs
                    </Link>
                  </li>
                  <li>
                    <Link to="/events" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                      → Upcoming Events
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                      → Contact Us
                    </Link>
                  </li>
                </ul>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20"
              >
                <h4 className="font-serif text-lg font-bold text-foreground mb-2">Stay Updated</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Subscribe to our newsletter for latest news and updates.
                </p>
                <Input placeholder="Your email" className="mb-3 bg-background" />
                <Button variant="default" size="sm" className="w-full">
                  Subscribe
                </Button>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="heading-section text-foreground mb-8">
            More <span className="text-secondary">Articles</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {newsArticles
              .filter((a) => a.id !== article.id)
              .slice(0, 3)
              .map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/news/${relatedArticle.id}`}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-lg transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-muted-foreground">
                      {relatedArticle.date}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-foreground mt-2 group-hover:text-secondary transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default NewsPost;
