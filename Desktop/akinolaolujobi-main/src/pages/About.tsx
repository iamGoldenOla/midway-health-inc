import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import akinolaPortrait from '@/assets/akin-portrait2.jpg';
import AboutHero from '@/components/shared/AboutHero';
import CTASection from '@/components/shared/CTASection';
import TestimonialSection from '@/components/shared/TestimonialSection';
import Typewriter from '@/components/shared/Typewriter';
import VisionMission from '@/components/shared/VisionMission';
import ClientLogos from '@/components/shared/ClientLogos';
import { 
  Heart, Star, Zap, Award, BookOpen, Mic, PenTool, TrendingUp, 
  Calendar, CheckCircle, Globe, Users, Lightbulb, Shield
} from 'lucide-react';

const coreValues = [
  {
    icon: Heart,
    letter: 'A',
    title: 'Authenticity',
    description: 'Creating content that is genuine, relatable, and true to your brand\'s identity. No shortcuts, no pretense.',
    color: 'primary',
  },
  {
    icon: Star,
    letter: 'E', 
    title: 'Excellence',
    description: 'Every piece of content is crafted with meticulous attention to detail and an unwavering commitment to quality.',
    color: 'coral',
  },
  {
    icon: Zap,
    letter: 'I',
    title: 'Impact',
    description: 'Content that doesn\'t just engage — it inspires action, drives results, and creates lasting change.',
    color: 'primary',
  },
  {
    icon: Lightbulb,
    letter: 'C',
    title: 'Creativity',
    description: 'Pushing boundaries with innovative ideas and fresh perspectives that set your brand apart from the crowd.',
    color: 'coral',
  },
  {
    icon: Shield,
    letter: 'I',
    title: 'Integrity',
    description: 'Building trust through honest communication, transparent processes, and delivering on every promise made.',
    color: 'primary',
  },
  {
    icon: Users,
    letter: 'C',
    title: 'Collaboration',
    description: 'Working closely with clients as partners, ensuring every voice is heard and every vision is realized.',
    color: 'coral',
  },
];

const journeyMilestones = [
  { year: '2015', title: 'The Beginning', description: 'Started my journey in content creation and digital storytelling.', icon: BookOpen },
  { year: '2017', title: 'First Major Client', description: 'Secured partnerships with leading brands and organizations.', icon: TrendingUp },
  { year: '2019', title: 'Speaking Career', description: 'Began speaking at conferences and events across the country.', icon: Mic },
  { year: '2021', title: 'Digital Expansion', description: 'Launched digital marketing services and online courses.', icon: Globe },
  { year: '2023', title: 'Published Author', description: 'Released multiple ebooks and educational content resources.', icon: PenTool },
  { year: '2025', title: 'Multi-Service Brand', description: 'Established a full-service personal brand serving clients globally.', icon: Award },
  { year: '2026', title: 'Global Reach', description: 'Expanding impact internationally with new partnerships and platforms.', icon: Globe },
];

const skills = [
  { name: 'Content Strategy', level: 95 },
  { name: 'Copywriting', level: 92 },
  { name: 'Digital Marketing', level: 90 },
  { name: 'Public Speaking', level: 88 },
  { name: 'Brand Development', level: 93 },
  { name: 'Social Media', level: 87 },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <AboutHero />

        {/* My Story Section */}
        <section className="section-padding">
          <div className="container-custom px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div className="relative group">
                <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-primary/15 to-coral/10 rounded-2xl group-hover:from-primary/20 group-hover:to-coral/15 transition-all duration-500" />
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/10 rounded-2xl group-hover:border-primary/20 transition-colors duration-500" />
                <img
                  src={akinolaPortrait}
                  alt="Akinola Olujobi"
                  className="relative rounded-2xl w-full max-w-md mx-auto shadow-2xl"
                />
              </div>

              {/* Content */}
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">
                  My Story
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                  Hi, I'm Akinola Olujobi
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-6">
                  I am passionate about{' '}
                  <span className="text-primary font-semibold">
                    <Typewriter 
                      words={['Technology', 'Design', 'Innovation', 'Creativity']}
                      prefix=""
                      typeSpeed={80}
                      deleteSpeed={40}
                      delayBetweenWords={1500}
                    />
                  </span>
                </p>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I am a storyteller, content strategist, and digital marketer with a passion for crafting 
                    compelling narratives that captivate audiences and drive results.
                  </p>
                  <p>
                    With years of experience in content creation, I've had the privilege of working with 
                    brands, businesses, and individuals to help them find their voice and share their 
                    stories with the world.
                  </p>
                  <p>
                    My expertise spans across copywriting, spoken word poetry, digital marketing strategy, 
                    and brand development. I believe that every brand has a unique story to tell, and my 
                    mission is to help you tell yours in the most impactful way possible.
                  </p>
                </div>
                <div className="mt-8">
                  <Link to="/contact">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                      Let's Work Together
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <VisionMission />

        {/* Core Values Section - Premium Redesign */}
        <section className="section-padding relative overflow-hidden bg-muted/50">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[150px]" />
          </div>

          <div className="container-custom px-4 md:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">
                <Heart className="w-3.5 h-3.5" />
                What I Stand For
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                My Core Values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                These principles guide every project, every word, and every relationship I build.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                const isAccent = value.color === 'coral';
                return (
                  <div key={index} className="group relative">
                    <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      isAccent ? 'bg-coral/10' : 'bg-primary/10'
                    }`} />
                    <div className="relative bg-card/80 backdrop-blur-sm p-8 rounded-2xl border border-border/50 hover:border-primary/20 transition-all duration-500 h-full">
                      {/* Number badge */}
                      <span className="absolute top-4 right-4 text-6xl font-heading font-bold text-foreground/[0.03] leading-none select-none">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 ${
                        isAccent 
                          ? 'bg-gradient-to-br from-coral to-coral-dark shadow-lg shadow-coral/20' 
                          : 'bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20'
                      }`}>
                        <Icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      
                      <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                        {value.title}
                      </h3>
                      
                      <div className={`w-8 h-0.5 rounded-full mb-4 ${isAccent ? 'bg-coral/50' : 'bg-primary/50'}`} />
                      
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {value.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Journey Timeline Section - Horizontal */}
        <section className="section-padding relative overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
          {/* Decorative orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[120px]" />
            <div className="absolute bottom-10 right-10 w-[250px] h-[250px] rounded-full bg-coral/5 blur-[100px]" />
          </div>

          <div className="container-custom px-4 md:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">
                <Calendar className="w-3.5 h-3.5" />
                My Journey
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                The Path So Far
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Over a decade of growth, learning, and delivering excellence.
              </p>
            </div>

            {/* Horizontal Timeline */}
            <div className="relative">
              {/* Animated gradient line */}
              <div className="hidden md:block absolute top-[52px] left-[4%] right-[4%] h-[2px]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-coral to-primary opacity-30 blur-sm" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
                {journeyMilestones.slice(0, 4).map((milestone, index) => {
                  const Icon = milestone.icon;
                  const isAccent = index % 2 !== 0;
                  return (
                    <div key={index} className="relative group flex flex-col items-center">
                      {/* Year badge above dot */}
                      <div className={`mb-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest border ${
                        isAccent 
                          ? 'bg-coral/10 border-coral/20 text-coral' 
                          : 'bg-primary/10 border-primary/20 text-primary'
                      }`}>
                        {milestone.year}
                      </div>

                      {/* Dot on line */}
                      <div className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500 mb-5 ${
                        isAccent 
                          ? 'bg-gradient-to-br from-coral to-coral-dark shadow-coral/25' 
                          : 'bg-gradient-to-br from-primary to-primary/70 shadow-primary/25'
                      }`}>
                        <Icon className="w-4.5 h-4.5 text-primary-foreground" />
                      </div>

                      {/* Card */}
                      <div className="w-full bg-card/90 backdrop-blur-sm p-6 rounded-2xl border border-border/50 group-hover:border-primary/25 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-500 text-center h-full">
                        <h3 className="text-lg font-heading font-bold text-foreground mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Second row */}
              <div className="hidden md:block absolute left-[4%] right-[4%] h-[2px]" style={{ marginTop: '52px' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-coral via-primary to-coral opacity-30 blur-sm" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-5 mt-8 lg:mt-12 max-w-4xl mx-auto">
                {journeyMilestones.slice(4).map((milestone, index) => {
                  const Icon = milestone.icon;
                  const isAccent = index % 2 === 0;
                  return (
                    <div key={index} className="relative group flex flex-col items-center">
                      {/* Year badge */}
                      <div className={`mb-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest border ${
                        isAccent 
                          ? 'bg-coral/10 border-coral/20 text-coral' 
                          : 'bg-primary/10 border-primary/20 text-primary'
                      }`}>
                        {milestone.year}
                      </div>

                      {/* Dot */}
                      <div className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500 mb-5 ${
                        isAccent 
                          ? 'bg-gradient-to-br from-coral to-coral-dark shadow-coral/25' 
                          : 'bg-gradient-to-br from-primary to-primary/70 shadow-primary/25'
                      }`}>
                        <Icon className="w-4.5 h-4.5 text-primary-foreground" />
                      </div>

                      {/* Card */}
                      <div className="w-full bg-card/90 backdrop-blur-sm p-6 rounded-2xl border border-border/50 group-hover:border-primary/25 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-500 text-center h-full">
                        <h3 className="text-lg font-heading font-bold text-foreground mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        {/* Skills & Expertise Section */}
        <section className="section-padding bg-muted/50 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-coral/3 blur-[120px]" />
          </div>

          <div className="container-custom px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Header + description */}
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Expertise
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                  Skills & Proficiency
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Years of dedicated practice and real-world experience have refined my skill set across 
                  multiple disciplines. Here's where my strengths lie.
                </p>

                {/* Quick skill highlights */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: PenTool, label: 'Content Writing' },
                    { icon: TrendingUp, label: 'SEO Strategy' },
                    { icon: Mic, label: 'Public Speaking' },
                    { icon: Globe, label: 'Digital Marketing' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-card/60 border border-border/30">
                      <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Skill bars */}
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">{skill.name}</span>
                      <span className="text-sm font-bold text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-primary to-coral transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Fun Facts / Numbers Section */}
        <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-primary to-primary/80">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary-foreground)) 1px, transparent 0)',
                backgroundSize: '32px 32px'
              }}
            />
          </div>

          <div className="container-custom px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '10+', label: 'Years of Experience', icon: Calendar },
                { value: '200+', label: 'Projects Completed', icon: CheckCircle },
                { value: '50+', label: 'Happy Clients', icon: Users },
                { value: '15+', label: 'Awards Won', icon: Award },
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <stat.icon className="w-8 h-8 text-primary-foreground/60 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-foreground/70 tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ClientLogos />
        <TestimonialSection />
        <CTASection 
          title="Want to Know More?"
          subtitle="I'd love to share my journey and discuss how we can work together."
          buttonText="Get In Touch"
        />
      </main>
      <Footer />
    </div>
  );
}