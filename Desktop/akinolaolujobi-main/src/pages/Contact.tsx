import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Mail, Phone, MessageCircle } from 'lucide-react';
import ContactHero from '@/components/shared/ContactHero';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in your name, email, and message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Split name into first and last roughly
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ' ';

      // The subject is being stored inside the message field for now since our schema
      // doesn't have a dedicated subject column. We just prepend it.
      const fullMessage = formData.subject
        ? `Subject: ${formData.subject}\n\n${formData.message}`
        : formData.message;

      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            first_name: firstName,
            last_name: lastName,
            email: formData.email,
            message: fullMessage,
            phone: null // Phone isn't gathered in this specific UI form yet, but exists in schema
          }
        ]);

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you shortly.",
      });

      // Clear the form
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Something went wrong",
        description: "Failed to send your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-[5.75rem] md:pt-[6.25rem]">
        <ContactHero />

        {/* Contact Section */}
        <section className="section-padding">
          <div className="container-custom px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                  Get In Touch
                </h2>
                <p className="text-muted-foreground mb-8">
                  I'd love to hear from you. Whether you have a question about my services,
                  need content strategy advice, or just want to connect, feel free to reach out.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="text-primary-foreground" size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground mb-1">Location</h3>
                      <p className="text-muted-foreground">Lagos, Nigeria</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="text-primary-foreground" size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground mb-1">Email</h3>
                      <a href="mailto:connect@akinolaolujobi.com" className="text-primary font-medium hover:underline">
                        connect@akinolaolujobi.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="text-primary-foreground" size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground mb-1">Phone</h3>
                      <p className="text-muted-foreground">+234 906 813 3874</p>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/2349068133874?text=Hello%20Akinola%2C%20I%27d%20like%20to%20connect%20with%20you."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#25D366] rounded-lg flex items-center justify-center shrink-0 group-hover:shadow-lg transition-shadow">
                      <MessageCircle className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground mb-1">WhatsApp</h3>
                      <p className="text-primary font-medium group-hover:underline">Chat with me on WhatsApp</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card rounded-2xl p-8 shadow-card border border-coral/10">
                <h3 className="text-xl font-heading font-bold text-foreground mb-6">
                  Send a Message
                </h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="focus:ring-coral focus:border-coral"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Your Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="focus:ring-coral focus:border-coral"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="How can I help you?"
                      className="focus:ring-coral focus:border-coral"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      className="focus:ring-coral focus:border-coral"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Google Map Section */}
        <section className="section-padding bg-muted">
          <div className="container-custom px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-8">
              Find Me
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.46310832852!2d3.1191195!3d6.5483123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1704067200000!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map - Lagos, Nigeria"
                className="w-full"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
