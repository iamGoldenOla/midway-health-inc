import useSEO from "@/hooks/useSEO";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { contactApi } from "@/services/api";
import heroImg from "@/assets/midway_2.jpg";

const Contact = () => {
  useSEO("Contact Us | Midway Health Inc.", "Get in touch with Midway Health Inc. for home healthcare services in Chicago. Call (312) 298-9124 or fill out our contact form.");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState(""); // Spam protection

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return; // Silent rejection for bots
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string || null,
      message: formData.get("message") as string,
    };

    try {
      await contactApi.submit(data);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours."
      });
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      console.error("Failed to submit contact form:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <PageHero
        image={heroImg}
        title="Contact Us"
        subtitle="We're here to help. Reach out to schedule a consultation or ask any questions."
      />

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <span className="text-warm text-sm font-semibold tracking-wider uppercase">Reach Out</span>
                <h2 className="font-display text-2xl font-bold text-foreground mt-2 mb-4">Get in Touch</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you need information about our services or want to schedule a free consultation, our team is ready to assist you.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-warm flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-warm-foreground" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Phone</div>
                    <a href="tel:+13122989124" className="text-muted-foreground hover:text-primary transition-colors block">(312) 298-9124</a>
                    <a href="tel:+13122167241" className="text-muted-foreground hover:text-primary transition-colors block">(312) 216-7241</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-warm flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-warm-foreground" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <a href="mailto:Midwayhealthinc@gmail.com" className="text-muted-foreground hover:text-primary transition-colors block">Midwayhealthinc@gmail.com</a>
                    <a href="mailto:info@midwayhealthinc.com" className="text-muted-foreground hover:text-primary transition-colors block">info@midwayhealthinc.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-warm flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-warm-foreground" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Address</div>
                    <p className="text-muted-foreground">1434 W 76th Street<br />Chicago, IL 60620</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-card border border-border p-8 space-y-5">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                    <Input name="name" required placeholder="John Doe" className="rounded-xl" maxLength={100} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <Input name="email" required type="email" placeholder="john@example.com" className="rounded-xl" maxLength={255} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                  <Input name="phone" type="tel" placeholder="(312) 298-9124" className="rounded-xl" maxLength={20} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                  <Textarea name="message" required placeholder="How can we help you?" className="rounded-xl min-h-[120px]" maxLength={1000} />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-warm text-warm-foreground border-0 rounded-xl shadow-soft hover:opacity-90 transition-opacity"
                >
                  {loading ? "Sending..." : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <span className="text-warm text-sm font-semibold tracking-wider uppercase">Common Questions</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
              Before You Reach Out
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Quick answers to help you get started with our services.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {([
              { q: "What's the best way to reach you?", a: "Call us at (312) 298-9124 for the fastest response, or fill out the form above and we'll reply within 24 hours.", Icon: Phone },
              { q: "Do you offer free consultations?", a: "Yes! We provide complimentary in-home assessments to evaluate your care needs and develop a personalized plan.", Icon: CheckCircle },
              { q: "What areas do you serve?", a: "We serve the greater Chicago metropolitan area, including surrounding suburbs. Contact us to confirm coverage for your location.", Icon: MapPin },
              { q: "What are your operating hours?", a: "Our office is open Monday–Friday 8 AM to 6 PM, but our care team provides 24/7 support for existing patients.", Icon: Clock },
            ] as const).map((faq) => (
              <div key={faq.q} className="bg-card rounded-2xl border border-border shadow-card p-6 hover:shadow-elevated transition-shadow">
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-warm/10 flex items-center justify-center shrink-0"><faq.Icon className="h-5 w-5 text-warm" /></span>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-2">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0">
        <div className="w-full h-[400px] bg-muted">
          <iframe
            title="Midway Health Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2974.5!2d-87.665!3d41.756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2e3c5a9c5d3d%3A0x0!2s1434+W+76th+St%2C+Chicago%2C+IL+60620!5e0!3m2!1sen!2sus!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
