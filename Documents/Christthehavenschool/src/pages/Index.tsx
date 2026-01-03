import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/home/HeroSlider";
import AboutSection from "@/components/home/AboutSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TeamPreview from "@/components/home/TeamPreview";
import ProprietressVideo from "@/components/home/ProprietressVideo";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import NewsPreview from "@/components/home/NewsPreview";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSlider />
      <AboutSection />
      <FeaturesSection />
      <TeamPreview />
      <ProprietressVideo />
      <UpcomingEvents />
      <NewsPreview />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
