import Layout from "@/components/layout/Layout";
import HeroCarousel from "@/components/home/HeroCarousel";
import AboutPreview from "@/components/home/AboutPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PremiumServicesCarousel from "@/components/home/PremiumServicesCarousel";
import Testimonials from "@/components/home/Testimonials";
import TeamMembers from "@/components/home/TeamMembers";
import BlogPreview from "@/components/home/BlogPreview";
import AppointmentBanner from "@/components/home/AppointmentBanner";
import CTASection from "@/components/home/CTASection";
import InspirationalMarquee from "@/components/shared/InspirationalMarquee";
import HealthTalkVideo from "@/components/home/HealthTalkVideo";
import FeedbackRatings from "@/components/home/FeedbackRatings";
import useSEO from "@/hooks/useSEO";

const Index = () => {
  useSEO(
    "Midway Health Inc. | Compassionate Home Healthcare in Chicago",
    "Midway Health Inc. provides trusted home healthcare services in Chicago including skilled nursing, physical therapy, personal care, companionship, and post-surgical care."
  );
  return (
    <Layout>
      <HeroCarousel />
      <AboutPreview />
      <WhyChooseUs />
      <PremiumServicesCarousel />
      <InspirationalMarquee />
      <HealthTalkVideo />
      <FeedbackRatings />
      <Testimonials />
      <TeamMembers />
      <BlogPreview />
      <AppointmentBanner />
      <CTASection />
    </Layout>
  );
};

export default Index;
