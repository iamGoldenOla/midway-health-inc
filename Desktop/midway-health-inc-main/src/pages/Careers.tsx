import useSEO from "@/hooks/useSEO";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, MapPin, Clock, Upload, Send, Heart, Users, TrendingUp, Shield } from "lucide-react";
import InspirationalMarquee from "@/components/shared/InspirationalMarquee";
import { useToast } from "@/hooks/use-toast";
import { jobApplicationsApi } from "@/services/api";
import heroImg from "@/assets/midway_14.jpg";
import parallaxImg from "@/assets/midway_6.jpg";

const openPositions = [
  { title: "Registered Nurse (RN)", type: "Full-Time", location: "Field / Home Visits", description: "Provide skilled nursing care to patients in their homes, including assessments, wound care, medication management, and patient education." },
  { title: "Certified Home Health Aide (CHHA)", type: "Full-Time / Part-Time", location: "Field / Home Visits", description: "Assist patients with daily living activities, personal care, and basic health monitoring under the supervision of a nurse." },
  { title: "Certified Nursing Assistant (CNA)", type: "Full-Time / Part-Time", location: "Field / Home Visits", description: "Provide compassionate patient care, assisting with daily living activities and monitoring patient well-being under the guidance of the nursing team." },
  { title: "Physical Therapist (PT)", type: "Full-Time", location: "Field / Home Visits", description: "Evaluate and treat patients to help restore movement, manage pain, and prevent disability through individualized home-based therapy." },
  { title: "Occupational Therapist (OT)", type: "Part-Time", location: "Field / Home Visits", description: "Help patients develop, recover, and improve skills needed for daily living and working through therapeutic activities." },
  { title: "Speech-Language Pathologist", type: "Per Diem", location: "Field / Home Visits", description: "Evaluate and treat patients with speech, language, cognitive, and swallowing disorders in a home setting." },
  { title: "Care Coordinator", type: "Full-Time", location: "Office", description: "Coordinate patient care across services, manage schedules, communicate with families, and ensure seamless care delivery." },
];

const benefits = [
  { icon: Heart, title: "Health Benefits", desc: "Comprehensive medical, dental, and vision coverage" },
  { icon: TrendingUp, title: "Growth Opportunities", desc: "Ongoing training and career advancement programs" },
  { icon: Clock, title: "Flexible Scheduling", desc: "Work-life balance with flexible hours" },
  { icon: Shield, title: "Competitive Pay", desc: "Industry-leading compensation packages" },
];

const Careers = () => {
  useSEO("Careers | Midway Health Inc.", "Join the Midway Health team. Browse open positions for nurses, therapists, home health aides, and care coordinators in Chicago.");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        toast({ title: "Invalid file type", description: "Please upload a PDF or Word document.", variant: "destructive" });
        e.target.value = "";
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File too large", description: "Maximum file size is 5MB.", variant: "destructive" });
        e.target.value = "";
        return;
      }
      setFileName(file.name);
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      // Upload resume to Supabase storage (if provided)
      let resumePath = "";
      if (resumeFile) {
        try {
          resumePath = await jobApplicationsApi.uploadResume(resumeFile);
        } catch (uploadError: any) {
          console.error("Resume upload failed:", uploadError);
          // Continue without resume if upload fails due to network issues
          toast({
            title: "Resume Upload Failed",
            description: "Continuing without resume. Network/proxy may be blocking upload. Try mobile hotspot or submit without file.",
            variant: "destructive",
          });
        }
      }

      // Submit application to database
      await jobApplicationsApi.submit({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        position: formData.get("position") as string,
        resume_url: resumePath || null,
        cover_letter: formData.get("cover_letter") as string || null,
      });

      toast({
        title: "Application Submitted!",
        description: resumePath
          ? "Thank you for your interest. We'll review your application and get back to you soon."
          : "Application received (resume upload failed - please email resume separately)."
      });

      setFileName("");
      setSelectedJob("");
      setResumeFile(null);
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      console.error("Failed to submit application:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Network/proxy may be blocking connection. Try mobile hotspot or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <PageHero image={heroImg} title="Join Our Team" subtitle="Start your journey as a caregiver — make a difference in people's lives every day." />

      {/* Why Work With Us */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-warm text-sm font-semibold tracking-wider uppercase">Why Midway Health</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">A Rewarding Career in Healthcare</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-card rounded-2xl border border-border p-6 text-center shadow-card hover:shadow-elevated transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-warm flex items-center justify-center mx-auto mb-4">
                  <b.icon className="h-7 w-7 text-warm-foreground" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Inspirational */}
      <section
        className="h-[300px] parallax-bg relative"
        style={{ backgroundImage: `url(${parallaxImg})` }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center px-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
              Make a <span className="text-warm">Difference</span> Every Day
            </h2>
            <p className="text-secondary-foreground/70 text-lg max-w-2xl mx-auto">
              Join a team that believes in compassionate care, professional growth, and making a lasting impact in the lives of patients and families.
            </p>
          </div>
        </div>
      </section>

      <InspirationalMarquee />

      {/* Open Positions */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-warm/5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-warm/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-warm/10 text-warm text-sm font-semibold tracking-wider uppercase mb-4 border border-warm/20">
              Open Positions
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Current <span className="text-primary">Opportunities</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Find the role that fits your passion. We are always looking for dedicated professionals to join our growing family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {openPositions.map((job) => (
              <div
                key={job.title}
                className="group relative bg-card rounded-2xl p-8 border border-border/50 shadow-card hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                {/* Accent Border */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary to-warm opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          <Clock className="h-3.5 w-3.5" /> {job.type}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full border border-border">
                          <MapPin className="h-3.5 w-3.5" /> {job.location}
                        </span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                      <Briefcase className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6 flex-grow border-t border-border/50 pt-6">
                    {job.description}
                  </p>

                  <Button
                    className="w-full bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-xl font-semibold h-11"
                    onClick={() => {
                      setSelectedJob(job.title);
                      document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Apply for this Position
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-warm text-sm font-semibold tracking-wider uppercase">Apply Now</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">Submit Your Application</h2>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-card border border-border p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name *</label>
                <Input name="name" required placeholder="John Doe" className="rounded-xl" maxLength={100} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                <Input name="email" required type="email" placeholder="john@example.com" className="rounded-xl" maxLength={255} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Phone *</label>
                <Input name="phone" required type="tel" placeholder="(312) 298-9124" className="rounded-xl" maxLength={20} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Position *</label>
                <select
                  name="position"
                  required
                  value={selectedJob}
                  onChange={(e) => setSelectedJob(e.target.value)}
                  className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select a position</option>
                  {openPositions.map((job) => (
                    <option key={job.title} value={job.title}>{job.title}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Resume / CV (Optional - upload may fail due to network)</label>
              <div className="relative border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-warm/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  {fileName ? (
                    <span className="text-warm font-medium">{fileName}</span>
                  ) : (
                    "Click to upload or drag & drop (PDF, DOC, DOCX — max 5MB)"
                  )}
                </p>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                If upload fails, you can email your resume to us separately
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Cover Letter / Message</label>
              <Textarea name="cover_letter" placeholder="Tell us why you'd be a great fit..." className="rounded-xl min-h-[120px]" maxLength={2000} />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-warm text-warm-foreground border-0 rounded-xl shadow-soft hover:opacity-90 transition-opacity"
            >
              {loading ? "Submitting..." : <> Submit Application <Send className="ml-2 h-4 w-4" /></>}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
