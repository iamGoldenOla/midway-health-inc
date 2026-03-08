import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, MessageCircle } from 'lucide-react';
import workspace from '@/assets/workspace.jpg';
import ebooksCourses from '@/assets/ebooks-courses.jpg';
import AnimatedSection from '@/components/shared/AnimatedSection';

export default function ContentCTASection() {
  return (
    <section className="section-padding bg-muted/40">
      <div className="container-custom px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {/* Let's Chat */}
          <AnimatedSection animation="fadeRight">
            <div className="bg-primary rounded-2xl overflow-hidden h-full relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-navy opacity-90" />
              <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center mb-6">
                  <MessageCircle className="w-6 h-6 text-coral" />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-4">
                  Let's chat strategy!
                </h2>
                <p className="text-primary-foreground/80 mb-8 leading-relaxed">
                  Schedule a call and see how Akinola Olujobi can take your content and brand to the next level with strategic storytelling.
                </p>
                <Link to="/contact" className="mt-auto">
                  <Button
                    variant="outline"
                    className="border-coral/40 text-coral hover:bg-coral hover:text-foreground group/btn"
                  >
                    Book a Call
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>
              <div className="relative z-10 px-8 pb-8">
                <img
                  src={workspace}
                  alt="Premium workspace"
                  className="rounded-xl w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* E-Books */}
          <AnimatedSection animation="fadeLeft">
            <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 h-full flex flex-col">
              <div className="aspect-video overflow-hidden">
                <img
                  src={ebooksCourses}
                  alt="E-Books and Courses"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col flex-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                  Our e-Books & Courses
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Unlock your potential. Dive into our collection of ebooks and exclusive courses designed to empower your journey.
                </p>
                <Link to="/e-books" className="mt-auto">
                  <Button className="group/btn">
                    Explore More
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
