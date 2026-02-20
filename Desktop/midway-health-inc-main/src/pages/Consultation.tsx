import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Send,
  User,
  Phone,
  Mail,
  Heart,
  Clock,
  MessageSquare,
  Shield,
  CheckCircle,
  Stethoscope,
  ArrowRight,
  Star,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { consultationsApi } from "@/services/api";
import consultationHero from "@/assets/consultation-hero.jpg";

const consultationSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  age: z.string().optional(),
  phone: z.string().trim().min(7, "Valid phone number is required").max(20),
  email: z.string().trim().email("Invalid email address").max(255),
  careType: z.string().min(1, "Please select a care type"),
  description: z
    .string()
    .trim()
    .min(10, "Please describe the situation (at least 10 characters)")
    .max(2000),
  urgency: z.string().min(1, "Please select urgency level"),
  preferredContact: z.string().min(1, "Please select preferred contact method"),
});

type ConsultationFormData = z.infer<typeof consultationSchema>;

const careTypes = [
  "Skilled Nursing",
  "Personal Care Assistance",
  "Home Health Aide",
  "Physical Therapy",
  "Occupational Therapy",
  "Speech Therapy",
  "Companionship Care",
  "Medication Management",
  "Post-Surgical Care",
  "Chronic Disease Management",
  "Not Sure – Need Guidance",
];

const urgencyLevels = [
  { value: "immediate", label: "Immediate Assistance", desc: "Need help now", color: "border-destructive/40 bg-destructive/5" },
  { value: "few-days", label: "Within a Few Days", desc: "Somewhat urgent", color: "border-warm/40 bg-warm/5" },
  { value: "week", label: "Within a Week", desc: "Can wait a bit", color: "border-primary/40 bg-primary/5" },
  { value: "exploring", label: "Exploring Options", desc: "Just researching", color: "border-accent/40 bg-accent/5" },
];

const contactMethods = [
  { value: "phone", label: "Phone Call", icon: Phone, desc: "We'll call you directly" },
  { value: "email", label: "Email", icon: Mail, desc: "Detailed response via email" },
];

const trustPoints = [
  { icon: Shield, text: "HIPAA Compliant" },
  { icon: CheckCircle, text: "Licensed Professionals" },
  { icon: Clock, text: "24/7 Support Available" },
  { icon: Star, text: "98% Satisfaction Rate" },
];

const steps = [
  { number: "01", title: "Submit Your Request", desc: "Fill out the form with your care needs" },
  { number: "02", title: "Care Team Review", desc: "Our specialists assess your situation" },
  { number: "03", title: "Personalized Plan", desc: "Receive a tailored care recommendation" },
  { number: "04", title: "Begin Care", desc: "Start your journey to better health" },
];

const Consultation = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState(""); // Spam protection

  const form = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      fullName: "",
      age: "",
      phone: "",
      email: "",
      careType: "",
      description: "",
      urgency: "",
      preferredContact: "",
    },
  });

  const onSubmit = async (data: ConsultationFormData) => {
    if (honeypot) return; // Silent rejection for bots
    try {
      setIsSubmitting(true);

      // Submit to Supabase
      await consultationsApi.submit({
        full_name: data.fullName,
        age: data.age || null,
        phone: data.phone,
        email: data.email,
        care_type: data.careType,
        description: data.description,
        urgency: data.urgency,
        preferred_contact: data.preferredContact,
      });

      setSubmitted(true);
      toast({
        title: "Consultation Request Received",
        description: "Thank you. Our care team will contact you shortly.",
      });
      form.reset();
    } catch (error: any) {
      console.error("Failed to submit consultation:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <PageHero
          title="Request a Care Consultation"
          subtitle="Professional guidance for your healthcare journey."
          image={consultationHero}
        />
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-3xl shadow-elevated p-14 border border-border relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-warm to-primary" />
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Request Submitted
              </h2>
              <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
                Your consultation request has been received. Our care coordination team will review your information and reach out within <span className="font-semibold text-foreground">24 hours</span>.
              </p>
              <div className="bg-muted/50 rounded-2xl p-6 mb-8">
                <p className="text-sm text-muted-foreground">
                  For immediate assistance, call us at{" "}
                  <a href="tel:+13122989124" className="text-primary font-semibold hover:underline">
                    (312) 298-9124
                  </a>
                </p>
              </div>
              <Button
                onClick={() => setSubmitted(false)}
                className="bg-primary text-primary-foreground rounded-xl px-10 py-6 font-semibold text-base"
              >
                Submit Another Request
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero
        title="Request a Care Consultation"
        subtitle="Professional guidance for your healthcare journey."
        image={consultationHero}
      />

      {/* Trust Bar */}
      <section className="bg-secondary py-5 border-b border-secondary-foreground/10 overflow-hidden">
        <div className="hidden md:flex items-center justify-center gap-14 container mx-auto px-4">
          {trustPoints.map((point) => (
            <div key={point.text} className="flex items-center gap-2.5">
              <point.icon className="h-5 w-5 text-warm" />
              <span className="text-secondary-foreground text-sm font-semibold tracking-wide">
                {point.text}
              </span>
            </div>
          ))}
        </div>
        <div className="md:hidden relative">
          <div className="flex animate-[trust-scroll_12s_linear_infinite] w-max gap-10">
            {[...trustPoints, ...trustPoints].map((point, i) => (
              <div key={i} className="flex items-center gap-2.5 shrink-0">
                <point.icon className="h-5 w-5 text-warm" />
                <span className="text-secondary-foreground text-sm font-semibold tracking-wide whitespace-nowrap">
                  {point.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-warm font-semibold text-sm uppercase tracking-widest mb-2">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              How It Works
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative text-center"
              >
                <div className="text-5xl font-bold text-primary/10 mb-3">{step.number}</div>
                <h3 className="text-base font-bold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-3 top-8 h-5 w-5 text-primary/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_340px] gap-10 max-w-5xl mx-auto">
            {/* Form Column */}
            <div>
              <motion.div
                className="mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-warm font-semibold text-sm uppercase tracking-widest mb-2">
                  Care Consultation
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Tell Us About Your <span className="text-primary">Care Needs</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Complete the form below and a care coordinator will reach out to discuss
                  your personalized care plan.
                </p>
              </motion.div>

              {/* Step Indicator */}
              <div className="flex items-center gap-1 mb-8">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${step <= currentStep ? "bg-primary" : "bg-border"
                      }`}
                  />
                ))}
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Honeypot field - invisible to humans */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  {/* Section 1 */}
                  <motion.div
                    className="bg-card rounded-2xl shadow-card border border-border overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-secondary px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-warm/20 flex items-center justify-center">
                        <User className="h-4 w-4 text-warm" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-secondary-foreground">
                          Personal Information
                        </h3>
                        <p className="text-xs text-secondary-foreground/60">Your contact details</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                Full Name <span className="text-destructive">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John Doe"
                                  className="rounded-xl h-12 border-border focus:border-primary"
                                  onFocus={() => setCurrentStep(1)}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                Patient Age
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. 65"
                                  className="rounded-xl h-12 border-border"
                                  type="number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                Phone Number <span className="text-destructive">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="(312) 555-0100"
                                  className="rounded-xl h-12 border-border"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                Email Address <span className="text-destructive">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="you@example.com"
                                  className="rounded-xl h-12 border-border"
                                  type="email"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Section 2 */}
                  <motion.div
                    className="bg-card rounded-2xl shadow-card border border-border overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="bg-secondary px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-warm/20 flex items-center justify-center">
                        <Stethoscope className="h-4 w-4 text-warm" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-secondary-foreground">
                          Type of Care Needed
                        </h3>
                        <p className="text-xs text-secondary-foreground/60">Select the service that fits</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <FormField
                        control={form.control}
                        name="careType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                              Care Type <span className="text-destructive">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={(v) => { field.onChange(v); setCurrentStep(2); }}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="rounded-xl h-12 border-border">
                                  <SelectValue placeholder="Choose care type..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {careTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>

                  {/* Section 3 */}
                  <motion.div
                    className="bg-card rounded-2xl shadow-card border border-border overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                  >
                    <div className="bg-secondary px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-warm/20 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-warm" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-secondary-foreground">
                          Describe the Situation
                        </h3>
                        <p className="text-xs text-secondary-foreground/60">Help us understand your needs</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                              Current Condition & Needs <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please describe the patient's current health condition, specific care requirements, mobility needs, medical history, or any other relevant details that will help us create the best care plan..."
                                className="rounded-xl min-h-[160px] border-border resize-none"
                                onFocus={() => setCurrentStep(3)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>

                  {/* Section 4: Urgency */}
                  <motion.div
                    className="bg-card rounded-2xl shadow-card border border-border overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="bg-secondary px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-warm/20 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-warm" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-secondary-foreground">
                          Urgency Level
                        </h3>
                        <p className="text-xs text-secondary-foreground/60">How soon do you need care?</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <FormField
                        control={form.control}
                        name="urgency"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(v) => { field.onChange(v); setCurrentStep(4); }}
                                value={field.value}
                                className="grid sm:grid-cols-2 gap-3"
                              >
                                {urgencyLevels.map((level) => (
                                  <Label
                                    key={level.value}
                                    htmlFor={`urgency-${level.value}`}
                                    className={`flex flex-col gap-1 p-5 rounded-xl border-2 cursor-pointer transition-all ${field.value === level.value
                                      ? "border-primary bg-primary/5 shadow-soft"
                                      : "border-border hover:border-primary/30"
                                      }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <RadioGroupItem
                                        value={level.value}
                                        id={`urgency-${level.value}`}
                                      />
                                      <span className="text-sm font-bold text-foreground">
                                        {level.label}
                                      </span>
                                    </div>
                                    <span className="text-xs text-muted-foreground pl-6">
                                      {level.desc}
                                    </span>
                                  </Label>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>

                  {/* Section 5: Contact Method */}
                  <motion.div
                    className="bg-card rounded-2xl shadow-card border border-border overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                  >
                    <div className="bg-secondary px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-warm/20 flex items-center justify-center">
                        <Phone className="h-4 w-4 text-warm" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-secondary-foreground">
                          Preferred Contact Method
                        </h3>
                        <p className="text-xs text-secondary-foreground/60">How should we reach you?</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <FormField
                        control={form.control}
                        name="preferredContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(v) => { field.onChange(v); setCurrentStep(5); }}
                                value={field.value}
                                className="grid sm:grid-cols-2 gap-4"
                              >
                                {contactMethods.map((method) => (
                                  <Label
                                    key={method.value}
                                    htmlFor={`contact-${method.value}`}
                                    className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${field.value === method.value
                                      ? "border-primary bg-primary/5 shadow-soft"
                                      : "border-border hover:border-primary/30"
                                      }`}
                                  >
                                    <RadioGroupItem
                                      value={method.value}
                                      id={`contact-${method.value}`}
                                    />
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                      <method.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-bold text-foreground">{method.label}</p>
                                      <p className="text-xs text-muted-foreground">{method.desc}</p>
                                    </div>
                                  </Label>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>

                  {/* Submit */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="pt-2"
                  >
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Submit Consultation Request
                        </>
                      )}
                    </Button>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <Shield className="h-4 w-4 text-primary" />
                      <p className="text-muted-foreground text-sm">
                        Your information is encrypted and kept strictly confidential.
                      </p>
                    </div>
                  </motion.div>
                </form>
              </Form>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6 lg:pt-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-secondary rounded-2xl p-6 text-secondary-foreground"
              >
                <Stethoscope className="h-8 w-8 text-warm mb-4" />
                <h3 className="text-lg font-bold mb-2">Need Immediate Help?</h3>
                <p className="text-secondary-foreground/70 text-sm mb-4 leading-relaxed">
                  Our care coordinators are available 24/7 for urgent situations.
                </p>
                <a
                  href="tel:+13122989124"
                  className="inline-flex items-center gap-2 bg-warm text-warm-foreground rounded-xl px-5 py-3 font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  <Phone className="h-4 w-4" />
                  Call (312) 298-9124
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-2xl border border-border p-6"
              >
                <h3 className="text-base font-bold text-foreground mb-4">What to Expect</h3>
                <ul className="space-y-3">
                  {[
                    "Free initial consultation",
                    "Response within 24 hours",
                    "Personalized care assessment",
                    "Insurance verification assistance",
                    "No obligation to proceed",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-primary/5 rounded-2xl border border-primary/20 p-6"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warm text-warm" />
                  ))}
                </div>
                <p className="text-sm text-foreground italic leading-relaxed mb-3">
                  "The team at Midway Health made everything so easy. From the first call,
                  I knew my mother was in good hands."
                </p>
                <p className="text-xs text-muted-foreground font-semibold">
                  — Patricia M., Family Member
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Consultation;
