import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/shared/PageHero';
import TestimonialSection from '@/components/shared/TestimonialSection';
import CTASection from '@/components/shared/CTASection';
import ParallaxSection from '@/components/shared/ParallaxSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Users, Award } from 'lucide-react';

const courses = [
  {
    title: 'Content Creation Masterclass',
    description: 'Learn how to create compelling content that engages and converts.',
    duration: '6 weeks',
    format: 'Online',
  },
  {
    title: 'Digital Marketing Fundamentals',
    description: 'Master the basics of digital marketing for business growth.',
    duration: '4 weeks',
    format: 'Hybrid',
  },
  {
    title: 'Personal Branding Workshop',
    description: 'Build a powerful personal brand that stands out.',
    duration: '2 days',
    format: 'In-person',
  },
  {
    title: 'Copywriting for Beginners',
    description: 'Write persuasive copy that sells and tells great stories.',
    duration: '3 weeks',
    format: 'Online',
  },
];

export default function ITeach() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <PageHero 
          title="I Teach"
          subtitle="Empowering the next generation of content creators and marketers."
          backgroundImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80"
        />

        {/* About Teaching */}
        <section className="section-padding">
          <div className="container-custom px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <GraduationCap className="w-16 h-16 text-primary mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                  Learn From Experience
                </h2>
                <p className="text-muted-foreground mb-4">
                  Education is transformation. Through my courses, workshops, and training programs, 
                  I share years of experience in content creation, digital marketing, and brand building 
                  with aspiring professionals and businesses.
                </p>
                <p className="text-muted-foreground mb-6">
                  My teaching philosophy combines theory with practice, ensuring that every participant 
                  leaves with actionable skills they can apply immediately.
                </p>
                <Link to="/contact">
                  <Button size="lg">Enroll Now</Button>
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80"
                  alt="Teaching session"
                  className="rounded-xl shadow-lg-custom"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Parallax Stats */}
        <ParallaxSection backgroundImage="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&q=80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Users className="w-8 h-8 text-primary-foreground/80 mx-auto mb-2" />
              <p className="text-3xl font-bold text-primary-foreground">500+</p>
              <p className="text-primary-foreground/70 text-sm">Students Trained</p>
            </div>
            <div className="text-center">
              <BookOpen className="w-8 h-8 text-primary-foreground/80 mx-auto mb-2" />
              <p className="text-3xl font-bold text-primary-foreground">25+</p>
              <p className="text-primary-foreground/70 text-sm">Workshops</p>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 text-primary-foreground/80 mx-auto mb-2" />
              <p className="text-3xl font-bold text-primary-foreground">95%</p>
              <p className="text-primary-foreground/70 text-sm">Satisfaction Rate</p>
            </div>
            <div className="text-center">
              <GraduationCap className="w-8 h-8 text-primary-foreground/80 mx-auto mb-2" />
              <p className="text-3xl font-bold text-primary-foreground">10+</p>
              <p className="text-primary-foreground/70 text-sm">Courses</p>
            </div>
          </div>
        </ParallaxSection>

        {/* Courses */}
        <section className="section-padding">
          <div className="container-custom px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-12">
              Available Courses
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {courses.map((course) => (
                <div key={course.title} className="bg-card p-8 rounded-xl shadow-card card-hover">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">{course.title}</h3>
                  <p className="text-muted-foreground mb-4">{course.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">{course.duration}</span>
                    <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full">{course.format}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
