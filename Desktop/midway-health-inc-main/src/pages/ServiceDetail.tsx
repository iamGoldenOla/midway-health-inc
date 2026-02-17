import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, ArrowLeft } from "lucide-react";

import imgSkilledNursing from "@/assets/service-skilled-nursing.jpg";
import imgPersonalCare from "@/assets/service-personal-care.jpg";
import imgHomeHealthAide from "@/assets/service-home-health-aide.jpg";
import imgPhysicalTherapy from "@/assets/service-physical-therapy.jpg";
import imgOccupationalTherapy from "@/assets/service-occupational-therapy.jpg";
import imgSpeechTherapy from "@/assets/service-speech-therapy.jpg";
import imgCompanionship from "@/assets/service-companionship.jpg";
import imgMedication from "@/assets/service-medication.jpg";
import imgPostSurgical from "@/assets/service-post-surgical.jpg";
import imgChronicDisease from "@/assets/service-chronic-disease.jpg";

const servicesData: Record<string, { name: string; description: string; benefits: string[]; image: string }> = {
  "skilled-nursing": {
    name: "Skilled Nursing",
    description: "Our team of registered and licensed practical nurses delivers expert medical care right in your home. From wound care and IV therapy to health assessments and chronic condition monitoring, we ensure you receive hospital-quality care in a comfortable setting.",
    benefits: ["Wound care & dressing changes", "IV therapy & injections", "Vital signs monitoring", "Disease education & management", "Care coordination with physicians"],
    image: imgSkilledNursing,
  },
  "personal-care": {
    name: "Personal Care",
    description: "Our personal care services help individuals maintain their daily routines with dignity and comfort. Our trained caregivers assist with personal hygiene, meal preparation, and daily activities.",
    benefits: ["Bathing & grooming assistance", "Dressing & personal hygiene", "Meal planning & preparation", "Light housekeeping", "Transportation to appointments"],
    image: imgPersonalCare,
  },
  "home-health-aide": {
    name: "Home Health Aide",
    description: "Our certified home health aides provide hands-on assistance with personal care needs and everyday tasks, supervised by our nursing team to ensure the highest quality of care.",
    benefits: ["Personal care assistance", "Mobility support", "Household task help", "Companionship", "Health monitoring"],
    image: imgHomeHealthAide,
  },
  "physical-therapy": {
    name: "Physical Therapy",
    description: "Our licensed physical therapists create individualized treatment plans to help you restore movement, reduce pain, and improve your overall physical function in the comfort of your home.",
    benefits: ["Customized exercise programs", "Pain management techniques", "Balance & fall prevention", "Post-surgical rehabilitation", "Mobility training"],
    image: imgPhysicalTherapy,
  },
  "occupational-therapy": {
    name: "Occupational Therapy",
    description: "Our occupational therapists help patients regain independence in everyday activities through specialized therapeutic techniques and adaptive strategies.",
    benefits: ["Daily living skills training", "Home safety assessments", "Adaptive equipment training", "Cognitive rehabilitation", "Fine motor skill development"],
    image: imgOccupationalTherapy,
  },
  "speech-therapy": {
    name: "Speech Therapy",
    description: "Our speech-language pathologists provide expert therapy for communication disorders, cognitive challenges, and swallowing difficulties.",
    benefits: ["Speech & language therapy", "Swallowing disorder treatment", "Cognitive-communication rehab", "Voice therapy", "Aphasia treatment"],
    image: imgSpeechTherapy,
  },
  "companionship-care": {
    name: "Companionship Care",
    description: "Our companionship services provide meaningful social interaction and emotional support, helping to combat loneliness and promote overall well-being.",
    benefits: ["Social engagement & conversation", "Recreational activities", "Errand assistance", "Meal companionship", "Emotional support"],
    image: imgCompanionship,
  },
  "medication-management": {
    name: "Medication Management",
    description: "Our medication management services ensure safe and accurate administration of medications, with careful monitoring and physician coordination.",
    benefits: ["Medication administration", "Side effect monitoring", "Prescription coordination", "Medication education", "Pharmacy liaison"],
    image: imgMedication,
  },
  "post-surgical-care": {
    name: "Post-Surgical Care",
    description: "Our post-surgical care services support a smooth recovery after any surgical procedure with professional wound care, pain management, and rehabilitation.",
    benefits: ["Surgical wound care", "Pain management support", "Physical rehabilitation", "Infection prevention", "Recovery progress monitoring"],
    image: imgPostSurgical,
  },
  "chronic-disease-management": {
    name: "Chronic Disease Management",
    description: "We develop comprehensive, ongoing care plans for chronic conditions, helping patients achieve better health outcomes and improved quality of life.",
    benefits: ["Diabetes management", "Heart disease monitoring", "COPD care plans", "Arthritis management", "Regular health assessments"],
    image: imgChronicDisease,
  },
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = slug ? servicesData[slug] : null;

  if (!service) {
    return (
      <Layout>
        <div className="pt-32 pb-20 text-center container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Service Not Found</h1>
          <Link to="/services" className="text-primary hover:underline">← Back to Services</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero
        image={service.image}
        title={service.name}
        subtitle={`Professional ${service.name.toLowerCase()} services delivered with compassion in the comfort of your home.`}
      />

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Back Button */}
          <Link to="/services" className="inline-block mb-8">
            <Button
              variant="outline"
              className="gap-2 rounded-xl border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Services
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-warm text-sm font-semibold tracking-wider uppercase">About This Service</span>
              <h2 className="font-display text-3xl font-bold text-foreground mt-3 mb-6">{service.name}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">{service.description}</p>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-[220px] sm:h-[280px] md:h-[350px] object-cover object-top"
              />
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Key Benefits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.benefits.map((b) => (
                <div key={b} className="flex items-center gap-3 bg-card rounded-xl border border-border p-4 shadow-card">
                  <div className="w-8 h-8 rounded-lg bg-warm/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-5 w-5 text-warm" />
                  </div>
                  <span className="text-foreground font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 bg-warm rounded-2xl p-10 text-center">
            <h3 className="font-display text-2xl font-bold text-warm-foreground mb-3">
              Ready to Get Started?
            </h3>
            <p className="text-warm-foreground/80 mb-6">
              Contact us today to learn how our {service.name.toLowerCase()} services can help you or your loved ones.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-secondary text-secondary-foreground border-0 rounded-xl px-8 hover:bg-secondary/90 transition-colors font-semibold">
                Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetail;
