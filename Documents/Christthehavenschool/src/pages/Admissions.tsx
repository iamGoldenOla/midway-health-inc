<<<<<<< HEAD
import { motion } from "framer-motion";
=======
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
import { 
  FileText, 
  UserCheck, 
  CreditCard, 
  ClipboardCheck, 
  GraduationCap,
  Phone,
  Mail,
<<<<<<< HEAD
  Calendar
=======
  Calendar,
  ChevronDown
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ApplicationForm from "@/components/admissions/ApplicationForm";
<<<<<<< HEAD
=======
import heroBg from "@/assets/hero-4.jpg";
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44

const admissionSteps = [
  {
    step: 1,
    title: "Submit Application",
    description: "Complete the online application form or visit our admissions office to obtain a physical form. Provide all required personal and academic information.",
    icon: FileText,
    details: [
      "Fill out the application form completely",
      "Attach passport photographs",
      "Provide previous academic records (if applicable)",
      "Submit birth certificate or age declaration"
    ]
  },
  {
    step: 2,
    title: "Assessment & Interview",
    description: "Prospective students will undergo an assessment to determine their academic level. Parents may also be invited for a brief interview.",
    icon: UserCheck,
    details: [
      "Written assessment in core subjects",
      "Oral interview for older students",
      "Parent/guardian consultation",
      "Tour of school facilities"
    ]
  },
  {
    step: 3,
    title: "Payment of Fees",
    description: "Upon successful assessment, parents will receive a fee schedule. Complete payment to secure your child's admission.",
    icon: CreditCard,
    details: [
      "Receive official fee structure",
      "Choose payment plan if available",
      "Make payment via bank transfer or cash",
      "Obtain payment receipt"
    ]
  },
  {
    step: 4,
    title: "Documentation & Registration",
    description: "Submit all required documents and complete the registration process at the school's administrative office.",
    icon: ClipboardCheck,
    details: [
      "Submit original documents for verification",
      "Complete student registration form",
      "Provide emergency contact information",
      "Sign parent-school agreement"
    ]
  },
  {
    step: 5,
    title: "Orientation & Enrollment",
    description: "Attend the orientation program to familiarize with school rules, routines, and receive uniforms and learning materials.",
    icon: GraduationCap,
    details: [
      "Attend parent-student orientation",
      "Collect school uniform and materials",
      "Meet class teacher and tour classrooms",
      "Receive school calendar and handbook"
    ]
  }
];

const requirements = [
  "Completed application form",
  "Birth certificate or age declaration",
  "4 recent passport photographs",
  "Previous school report cards (for transfer students)",
  "Immunization records",
  "Parent/Guardian valid ID"
];

<<<<<<< HEAD
=======
const faqs = [
  {
    question: "What age groups do you accept?",
    answer: "We accept students from age 2 (creche) through primary school. Our programs cater to early years (creche and nursery) and primary education."
  },
  {
    question: "Is there an entrance examination?",
    answer: "Yes, prospective students undergo a simple assessment to determine their academic level and ensure proper class placement. This is not an elimination test but a placement tool."
  },
  {
    question: "What are the school fees?",
    answer: "School fees vary by class level. Please contact our admissions office or visit the school to receive a detailed fee structure for your child's intended class."
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes, we understand that education is an investment. We offer flexible payment options to help parents manage their finances while ensuring quality education for their children."
  }
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto grid gap-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-card rounded-xl shadow-sm border border-border overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-accent/50 transition-colors"
          >
            <h4 className="font-serif text-lg font-bold text-foreground pr-4">
              {faq.question}
            </h4>
            <ChevronDown 
              className={`w-5 h-5 text-secondary shrink-0 transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`} 
            />
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-0">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
const Admissions = () => {
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
            <h1 className="heading-display mb-4">Admissions</h1>
            <p className="text-lg opacity-90">
              Join our community of learners. Follow these simple steps to enroll your child at Christ The Haven School.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Registration Steps */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              How To Apply
            </span>
            <h2 className="heading-section text-foreground mt-3 mb-4">
              Registration <span className="text-secondary">Steps</span>
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Our admission process is designed to be straightforward and welcoming. Follow these steps to begin your child's educational journey with us.
            </p>
          </motion.div>

          {/* Steps Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>

            {admissionSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative mb-12 md:mb-16 ${
                  index % 2 === 0 ? "md:pr-[52%]" : "md:pl-[52%]"
                }`}
              >
                {/* Step Number Circle */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-primary text-primary-foreground items-center justify-center font-bold text-xl shadow-lg z-10">
                  {step.step}
                </div>

                {/* Content Card */}
                <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="md:hidden w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shrink-0">
                      {step.step}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-sky/20 flex items-center justify-center shrink-0 hidden md:flex">
                      <step.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 ml-0 md:ml-16">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-secondary font-medium text-sm uppercase tracking-wider">
                What You Need
              </span>
              <h2 className="heading-section text-foreground mt-3 mb-6">
                Required <span className="text-secondary">Documents</span>
              </h2>
              <p className="text-body mb-8">
                Please ensure you have the following documents ready before starting the admission process. This will help expedite your child's enrollment.
              </p>
              
              <ul className="space-y-4">
                {requirements.map((req, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                      <ClipboardCheck className="w-5 h-5 text-secondary" />
                    </div>
                    <span className="text-foreground font-medium">{req}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary rounded-2xl p-8 text-primary-foreground"
            >
              <h3 className="font-serif text-2xl font-bold mb-6">
                Ready to <span className="text-secondary">Enroll?</span>
              </h3>
              <p className="opacity-90 mb-8">
                Contact our admissions office today to begin your child's journey with Christ The Haven School. We're here to answer all your questions.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Call Us</p>
<<<<<<< HEAD
                    <p className="font-semibold">+234 123 456 7890</p>
=======
                    <p className="font-semibold">+234 802 335 7800</p>
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Email Us</p>
<<<<<<< HEAD
                    <p className="font-semibold">admissions@christthehaven.edu</p>
=======
                    <p className="font-semibold">admissions@christthehavenschool.com</p>
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Office Hours</p>
                    <p className="font-semibold">Mon - Fri: 8:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button variant="sky" size="lg" className="w-full sm:w-auto">
                    Schedule a Visit
                  </Button>
                </Link>
<<<<<<< HEAD
                <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
=======
                <Button variant="outline" size="lg" className="border-primary-foreground/30 text-foreground bg-primary-foreground hover:bg-primary-foreground/90 hover:text-primary-foreground">
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
                  Download Form
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Online Application Form */}
      <section id="apply-form" className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Start Your Application
            </span>
            <h2 className="heading-section text-foreground mt-3 mb-4">
              Apply <span className="text-secondary">Online</span>
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Complete the form below to submit your application. You'll be prompted to send an email with your details and attach required documents.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <ApplicationForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Common Questions
            </span>
            <h2 className="heading-section text-foreground mt-3">
              Admission <span className="text-secondary">FAQs</span>
            </h2>
          </motion.div>

<<<<<<< HEAD
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What age groups do you accept?",
                answer: "We accept students from age 2 (creche) through primary school. Our programs cater to early years (creche and nursery) and primary education."
              },
              {
                question: "Is there an entrance examination?",
                answer: "Yes, prospective students undergo a simple assessment to determine their academic level and ensure proper class placement. This is not an elimination test but a placement tool."
              },
              {
                question: "What are the school fees?",
                answer: "School fees vary by class level. Please contact our admissions office or visit the school to receive a detailed fee structure for your child's intended class."
              },
              {
                question: "Do you offer payment plans?",
                answer: "Yes, we understand that education is an investment. We offer flexible payment options to help parents manage their finances while ensuring quality education for their children."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-sm border border-border"
              >
                <h4 className="font-serif text-lg font-bold text-foreground mb-2">
                  {faq.question}
                </h4>
                <p className="text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
=======
          <FAQAccordion />
>>>>>>> 98271f71a22a8faca0d2bd1b328d48a7f7b2bf44
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Admissions;
