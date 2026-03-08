import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import WhatIDoSection from '@/components/home/WhatIDoSection';
import ContentCTASection from '@/components/home/ContentCTASection';
import PortfolioSection from '@/components/home/PortfolioSection';
import MyStorySection from '@/components/home/MyStorySection';
import ScrollingQuotesSection from '@/components/home/ScrollingQuotesSection';
import FeaturedBlogSection from '@/components/home/FeaturedBlogSection';
import FeaturedEbooksSection from '@/components/home/FeaturedEbooksSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import VideoShowreel from '@/components/home/VideoShowreel';
import StatsSection from '@/components/home/StatsSection';
import CaseStudiesSection from '@/components/home/CaseStudiesSection';
import FeaturedInSection from '@/components/home/FeaturedInSection';
import FreelanceBanner from '@/components/shared/FreelanceBanner';
import TestimonialSection from '@/components/shared/TestimonialSection';
import CTASection from '@/components/shared/CTASection';
import ClientLogos from '@/components/shared/ClientLogos';
import SEOHead from '@/components/shared/SEOHead';
import WelcomePopup from '@/components/shared/WelcomePopup';

const Index = () => {
  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <SEOHead />
      <WelcomePopup />
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <HeroSection />
        <FeaturedInSection />
        <MyStorySection />
        <StatsSection />
        <FreelanceBanner />
        <WhatIDoSection />
        <VideoShowreel />
        <ContentCTASection />
        <FeaturedEbooksSection />
        <CaseStudiesSection />
        <PortfolioSection />
        <ScrollingQuotesSection />
        <TestimonialSection />
        <ClientLogos />
        <FeaturedBlogSection />
        <NewsletterSection />
        <CTASection showTypewriter />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
