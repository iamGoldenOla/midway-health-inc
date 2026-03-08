import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/shared/PageHero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar, Send, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BookingWidget from '@/components/shared/BookingWidget';
import { supabase } from '@/lib/supabase';

const serviceOptions = [
  { value: 'speaking', label: 'I Speak', description: 'Keynote speaking, MC, event hosting' },
  { value: 'teaching', label: 'I Teach', description: 'Training, workshops, coaching sessions' },
  { value: 'writing', label: 'I Write', description: 'Content writing, copywriting, ghostwriting' },
  { value: 'singing', label: 'I Sing', description: 'Music performances, jingles, vocals' },
  { value: 'digital', label: 'I Digital', description: 'Web development, digital marketing, SEO' },
  { value: 'inspire', label: 'I Inspire', description: 'Motivational sessions, mentorship' },
];

const baseSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Please enter a valid email').max(255),
  phone: z.string().trim().min(7, 'Please enter a valid phone number').max(20),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

// Service-specific fields
const speakingSchema = baseSchema.extend({
  eventType: z.string().min(1, 'Please specify the event type'),
  eventDate: z.string().min(1, 'Please provide the event date'),
  audienceSize: z.string().min(1, 'Please estimate audience size'),
  eventLocation: z.string().min(1, 'Please provide the location'),
  topic: z.string().max(500).optional(),
});

const teachingSchema = baseSchema.extend({
  trainingTopic: z.string().min(1, 'Please specify the training topic'),
  participants: z.string().min(1, 'How many participants?'),
  duration: z.string().min(1, 'Preferred duration?'),
  format: z.string().min(1, 'Online or in-person?'),
  objectives: z.string().max(500).optional(),
});

const writingSchema = baseSchema.extend({
  contentType: z.string().min(1, 'What type of content?'),
  wordCount: z.string().optional(),
  targetAudience: z.string().min(1, 'Who is the target audience?'),
  projectBrief: z.string().min(10, 'Please provide a brief (min 10 chars)').max(1000),
});

const singingSchema = baseSchema.extend({
  performanceType: z.string().min(1, 'What type of performance?'),
  eventDate: z.string().min(1, 'When is the event?'),
  venue: z.string().min(1, 'Where is the venue?'),
  specialRequests: z.string().max(500).optional(),
});

const digitalSchema = baseSchema.extend({
  projectType: z.string().min(1, 'What type of project?'),
  currentWebsite: z.string().optional(),
  goals: z.string().min(10, 'Please describe your goals (min 10 chars)').max(1000),
  platforms: z.string().optional(),
});

const inspireSchema = baseSchema.extend({
  sessionType: z.string().min(1, 'What type of session?'),
  groupSize: z.string().min(1, 'How many people?'),
  focusArea: z.string().min(1, 'What area would you like to focus on?'),
  additionalInfo: z.string().max(500).optional(),
});

type FormData = z.infer<typeof speakingSchema> | z.infer<typeof teachingSchema> | z.infer<typeof writingSchema> | z.infer<typeof singingSchema> | z.infer<typeof digitalSchema> | z.infer<typeof inspireSchema>;

function getSchema(service: string) {
  switch (service) {
    case 'speaking': return speakingSchema;
    case 'teaching': return teachingSchema;
    case 'writing': return writingSchema;
    case 'singing': return singingSchema;
    case 'digital': return digitalSchema;
    case 'inspire': return inspireSchema;
    default: return baseSchema;
  }
}

export default function Booking() {
  const [step, setStep] = useState(1); // 1=service select, 2=details form, 3=success
  const [selectedService, setSelectedService] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const schema = getSchema(selectedService);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: { service: selectedService },
  });

  const handleServiceSelect = (value: string) => {
    setSelectedService(value);
    setValue('service', value);
    setStep(2);
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const serviceLabel = serviceOptions.find(s => s.value === data.service)?.label || data.service;

      // Store all the extra specific fields into the generic notes column as JSON text
      const { name, email, phone, service, budget, timeline, ...extraFields } = data;
      const additionalNotes = JSON.stringify({
        budget,
        timeline,
        ...extraFields
      });

      // Insert into Supabase
      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            client_name: data.name,
            client_email: data.email,
            service_requested: serviceLabel,
            preferred_date: data.eventDate || new Date().toISOString().split('T')[0], // Default if no eventDate in schema
            preferred_time: '09:00:00', // Default generic time, user picks real time in step 3
            additional_notes: additionalNotes
          }
        ]);

      if (error) throw error;

      toast({
        title: "Brief submitted!",
        description: "Your details have been securely saved. You can now schedule a meeting time.",
      });
      setStep(3);
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Error",
        description: "Something went wrong saving your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedService('');
    reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <PageHero
          title="Book a Session"
          subtitle="Tell us about your project, then pick a time that works for you."
          backgroundImage="https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1920&q=80"
        />

        <section className="section-padding">
          <div className="container-custom px-4 md:px-8 max-w-3xl mx-auto">

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                    {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && <div className={`w-12 md:w-20 h-0.5 ${step > s ? 'bg-primary' : 'bg-muted'}`} />}
                </div>
              ))}
            </div>

            {/* Step 1: Service Selection */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-2">
                  What service are you looking for?
                </h2>
                <p className="text-muted-foreground text-center mb-8">Select the service that best fits your needs</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {serviceOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleServiceSelect(opt.value)}
                      className="group p-6 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg transition-all text-left"
                    >
                      <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors text-lg mb-1">
                        {opt.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">{opt.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Service-specific form */}
            {step === 2 && (
              <div className="animate-fade-in">
                <button onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back to services
                </button>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                  Tell us about your project
                </h2>
                <p className="text-muted-foreground mb-8">
                  Service: <span className="font-semibold text-primary">{serviceOptions.find(s => s.value === selectedService)?.label}</span>
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Common fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" placeholder="Your name" {...register('name')} />
                      {errors.name && <p className="text-sm text-destructive">{String(errors.name.message)}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="your@email.com" {...register('email')} />
                      {errors.email && <p className="text-sm text-destructive">{String(errors.email.message)}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" placeholder="+234..." {...register('phone')} />
                      {errors.phone && <p className="text-sm text-destructive">{String(errors.phone.message)}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range</Label>
                      <Input id="budget" placeholder="e.g. ₦100,000 - ₦500,000" {...register('budget')} />
                    </div>
                  </div>

                  {/* Service-specific fields */}
                  {selectedService === 'speaking' && (
                    <div className="space-y-4 border-t border-border pt-6">
                      <h3 className="font-heading font-semibold text-foreground">Speaking Event Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Event Type *</Label>
                          <Input placeholder="e.g. Conference, Wedding, Corporate" {...register('eventType')} />
                          {errors.eventType && <p className="text-sm text-destructive">{String(errors.eventType.message)}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Event Date *</Label>
                          <Input type="date" {...register('eventDate')} />
                          {errors.eventDate && <p className="text-sm text-destructive">{String(errors.eventDate.message)}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Audience Size *</Label>
                          <Input placeholder="e.g. 50-100 people" {...register('audienceSize')} />
                          {errors.audienceSize && <p className="text-sm text-destructive">{String(errors.audienceSize.message)}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Location *</Label>
                          <Input placeholder="City, Venue" {...register('eventLocation')} />
                          {errors.eventLocation && <p className="text-sm text-destructive">{String(errors.eventLocation.message)}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Preferred Topic / Theme</Label>
                        <Textarea placeholder="Any specific topic or theme you'd like covered?" {...register('topic')} />
                      </div>
                    </div>
                  )}

                  {selectedService === 'teaching' && (
                    <div className="space-y-4 border-t border-border pt-6">
                      <h3 className="font-heading font-semibold text-foreground">Training Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Training Topic *</Label>
                          <Input placeholder="e.g. Content Marketing, SEO" {...register('trainingTopic')} />
                          {errors.trainingTopic && <p className="text-sm text-destructive">{String(errors.trainingTopic.message)}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Number of Participants *</Label>
                          <Input placeholder="e.g. 10-20" {...register('participants')} />
                          {errors.participants && <p className="text-sm text-destructive">{String(errors.participants.message)}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Preferred Duration *</Label>
                          <Input placeholder="e.g. 2 hours, Full day" {...register('duration')} />
                          {errors.duration && <p className="text-sm text-destructive">{String(errors.duration.message)}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Format *</Label>
                          <Input placeholder="Online / In-person / Hybrid" {...register('format')} />
                          {errors.format && <p className="text-sm text-destructive">{String(errors.format.message)}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Learning Objectives</Label>
                        <Textarea placeholder="What should participants learn?" {...register('objectives')} />
                      </div>
                    </div>
                  )}

                  {selectedService === 'writing' && (
                    <div className="space-y-4 border-t border-border pt-6">
                      <h3 className="font-heading font-semibold text-foreground">Writing Project Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Content Type *</Label>
                          <Input placeholder="e.g. Blog, Website Copy, Ebook" {...register('contentType')} />
                          {errors.contentType && <p className="text-sm text-destructive">{String(errors.contentType.message)}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Estimated Word Count</Label>
                          <Input placeholder="e.g. 1,000 - 5,000 words" {...register('wordCount')} />
                        </div>
                        <div className="space-y-2">
                          <Label>Target Audience *</Label>
                          <Input placeholder="Who will read this?" {...register('targetAudience')} />
                          {errors.targetAudience && <p className="text-sm text-destructive">{String(errors.targetAudience.message)}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Timeline</Label>
                          <Input placeholder="When do you need it?" {...register('timeline')} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Project Brief *</Label>
                        <Textarea placeholder="Describe what you need written, tone, style, key points..." {...register('projectBrief')} rows={4} />
                        {errors.projectBrief && <p className="text-sm text-destructive">{String(errors.projectBrief.message)}</p>}
                      </div>
                    </div>
                  )}

                  {selectedService === 'singing' && (
                    <div className="space-y-4 border-t border-border pt-6">
                      <h3 className="font-heading font-semibold text-foreground">Performance Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Performance Type *</Label>
                          <Input placeholder="e.g. Live event, Studio, Jingle" {...register('performanceType')} />
                          {errors.performanceType && <p className="text-sm text-destructive">{String(errors.performanceType.message)}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Event Date *</Label>
                          <Input type="date" {...register('eventDate')} />
                          {errors.eventDate && <p className="text-sm text-destructive">{String(errors.eventDate.message)}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Venue *</Label>
                          <Input placeholder="Venue name and location" {...register('venue')} />
                          {errors.venue && <p className="text-sm text-destructive">{String(errors.venue.message)}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Special Requests</Label>
                        <Textarea placeholder="Any special songs, themes, or requirements?" {...register('specialRequests')} />
                      </div>
                    </div>
                  )}

                  {selectedService === 'digital' && (
                    <div className="space-y-4 border-t border-border pt-6">
                      <h3 className="font-heading font-semibold text-foreground">Digital Project Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Project Type *</Label>
                          <Input placeholder="e.g. Website, SEO, Social Media" {...register('projectType')} />
                          {errors.projectType && <p className="text-sm text-destructive">{String(errors.projectType.message)}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Current Website</Label>
                          <Input placeholder="https://..." {...register('currentWebsite')} />
                        </div>
                        <div className="space-y-2">
                          <Label>Target Platforms</Label>
                          <Input placeholder="e.g. Instagram, LinkedIn, Google" {...register('platforms')} />
                        </div>
                        <div className="space-y-2">
                          <Label>Timeline</Label>
                          <Input placeholder="When do you need this?" {...register('timeline')} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Project Goals *</Label>
                        <Textarea placeholder="What do you want to achieve? Be specific about your goals..." {...register('goals')} rows={4} />
                        {errors.goals && <p className="text-sm text-destructive">{String(errors.goals.message)}</p>}
                      </div>
                    </div>
                  )}

                  {selectedService === 'inspire' && (
                    <div className="space-y-4 border-t border-border pt-6">
                      <h3 className="font-heading font-semibold text-foreground">Inspiration Session Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Session Type *</Label>
                          <Input placeholder="e.g. Mentorship, Motivational Talk" {...register('sessionType')} />
                          {errors.sessionType && <p className="text-sm text-destructive">{String(errors.sessionType.message)}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Group Size *</Label>
                          <Input placeholder="e.g. 1-on-1, 10-20 people" {...register('groupSize')} />
                          {errors.groupSize && <p className="text-sm text-destructive">{String(errors.groupSize.message)}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Focus Area *</Label>
                          <Input placeholder="e.g. Career, Leadership, Faith" {...register('focusArea')} />
                          {errors.focusArea && <p className="text-sm text-destructive">{String(errors.focusArea.message)}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Additional Information</Label>
                        <Textarea placeholder="Anything else we should know?" {...register('additionalInfo')} />
                      </div>
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                    <Send className="w-5 h-5" />
                    {isSubmitting ? 'Sending...' : 'Submit Brief & Schedule Meeting'}
                  </Button>
                </form>
              </div>
            )}

            {/* Step 3: Success + Cal.com Booking */}
            {step === 3 && (
              <div className="animate-fade-in text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                  Brief Submitted Successfully!
                </h2>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                  Now let's find a time to discuss your project. Pick a slot that works for you below.
                </p>

                <div className="bg-card border border-border rounded-xl p-6 mb-8">
                  <BookingWidget
                    calUsername="your-username"
                    buttonText="Pick a Meeting Time"
                  />
                </div>

                <button onClick={handleReset} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  ← Submit another booking request
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
