import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Calendar, Clock, MapPin, ArrowRight, Star, Heart, CheckCircle2, Plus, Minus, Phone, X } from "lucide-react";
import { eventsApi } from "@/services/api";
import useSEO from "@/hooks/useSEO";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// User-Specified Images
import heroImage from "@/assets/event_hero_section.jpg";

// Feature Cards (Highlights)
import wellnessImg from "@/assets/event_wellness_workshop_card.jpg";
import healthScreenImg from "@/assets/event_health_screen_card.jpg";
import consultImg from "@/assets/event_expert_consultation_card.jpg";

// Grid Events Images
import assessmentImg from "@/assets/Free_Home_Health_Assessment_Day_card.jpg";
import caregiverImg from "@/assets/Caregiver_Support_Workshop_card.jpg";
import seniorImg from "@/assets/Senior_Wellness_Fair_card.jpg";

interface Event {
    id: string;
    title: string;
    description?: string | null;
    event_date: string;
    event_time?: string | null;
    location?: string | null;
    image_url?: string | null;
    is_published: boolean;
}

const Events = () => {
    useSEO(
        "Upcoming Events | Midway Health Inc.",
        "Stay connected with Midway Health Inc. Join our upcoming community health events, free assessments, and educational workshops in Chicago."
    );

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    // Initial Demo Data to showcase the user's images immediately
    const demoEvents: Event[] = [
        {
            id: "demo-1",
            title: "Free Home Health Assessment Day",
            description: "Comprehensive in-home health evaluations provided by our certified nursing team. Open to all seniors in the community. We check vitals, medication adherence, and safety risks.",
            event_date: "2026-03-15",
            event_time: "09:00 AM - 04:00 PM",
            location: "Midway Community Center",
            image_url: assessmentImg,
            is_published: true
        },
        {
            id: "demo-2",
            title: "Caregiver Support Workshop",
            description: "A supportive environment for caregivers to share experiences, learn stress management techniques, and access resources. Led by experienced social workers.",
            event_date: "2026-03-22",
            event_time: "10:00 AM - 12:00 PM",
            location: "Main Conference Room",
            image_url: caregiverImg,
            is_published: true
        },
        {
            id: "demo-3",
            title: "Senior Wellness Fair",
            description: "Join us for a day of fun, fitness, and health education. Featuring local vendors, free screenings, and activities. Prizes and refreshments will be provided!",
            event_date: "2026-04-05",
            event_time: "11:00 AM - 03:00 PM",
            location: "City Park Pavilion",
            image_url: seniorImg,
            is_published: true
        }
    ];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Fetch real published events from Supabase
                const data = await eventsApi.getPublished();

                if (data && data.length > 0) {
                    const realEvents: Event[] = data.map((e: any) => {
                        // Force specific images for known titles to ensure high-quality visuals
                        // This hydrates the API data with local assets if the title matches
                        let forcedImage = e.image_url;
                        const title = e.title?.toLowerCase().trim();

                        if (title?.includes("senior wellness fair")) {
                            forcedImage = seniorImg;
                        } else if (title?.includes("home health assessment")) {
                            forcedImage = assessmentImg;
                        } else if (title?.includes("caregiver support")) {
                            forcedImage = caregiverImg;
                        }

                        return {
                            id: e.id,
                            title: e.title,
                            description: e.description,
                            event_date: e.event_date,
                            event_time: e.event_time,
                            location: e.location,
                            image_url: forcedImage,
                            is_published: e.is_published
                        };
                    });
                    setEvents(realEvents);
                } else {
                    setEvents([...demoEvents]);
                }
            } catch (error) {
                console.error("Failed to fetch events:", error);
                setEvents([...demoEvents]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const highlights = [
        { title: "Health Screenings", image: healthScreenImg, desc: "Free vitals check-up" },
        { title: "Expert Consultation", image: consultImg, desc: "One-on-one sessions" },
        { title: "Wellness Workshops", image: wellnessImg, desc: "Nutrition & Fitness" },
    ];

    const faqs = [
        { q: "Are the health screenings really free?", a: "Yes! All our scheduled community health screenings are completely free of charge. We believe in accessible preventative care for everyone." },
        { q: "Do I need to register in advance?", a: "While walk-ins are welcome for many events, we recommend registering online or calling us to secure your spot, especially for workshops with limited seating." },
        { q: "Can I bring a family member?", a: "Absolutely. We encourage family members and caregivers to attend our workshops and assessments to better support their loved ones." },
        { q: "Is transportation provided?", a: "For select events at our main center, we may offer shuttle services. Please check the specific event details or call our office." },
    ];

    return (
        <Layout>
            <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
                <DialogContent className="max-w-2xl overflow-hidden p-0 rounded-3xl border-0 shadow-2xl">
                    {selectedEvent && (
                        <div className="flex flex-col max-h-[90vh] overflow-y-auto">
                            <div className="relative h-64 sm:h-72 w-full shrink-0">
                                {selectedEvent.image_url ? (
                                    <img
                                        src={selectedEvent.image_url}
                                        alt={selectedEvent.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                        <Calendar className="w-16 h-16 text-primary/30" />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 z-10">
                                    <button
                                        onClick={() => setSelectedEvent(null)}
                                        className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                                    <span className="inline-block px-3 py-1 rounded bg-warm text-white text-xs font-bold mb-2 uppercase tracking-wide">
                                        Upcoming Event
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-display font-bold leading-tight">
                                        {selectedEvent.title}
                                    </h2>
                                </div>
                            </div>

                            <div className="p-6 md:p-8 space-y-6 bg-background">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                                        <Calendar className="w-5 h-5 text-primary mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold text-muted-foreground uppercase">Date</p>
                                            <p className="font-semibold">{new Date(selectedEvent.event_date + "T00:00:00").toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                                        <Clock className="w-5 h-5 text-warm mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold text-muted-foreground uppercase">Time</p>
                                            <p className="font-semibold">{selectedEvent.event_time || "TBA"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl sm:col-span-2">
                                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold text-muted-foreground uppercase">Location</p>
                                            <p className="font-semibold">{selectedEvent.location || "Location to be announced"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="prose max-w-none">
                                    <h3 className="text-lg font-bold mb-2">About This Event</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {selectedEvent.description || "Join us for this community event. More details coming soon."}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-border flex justify-between items-center gap-4">
                                    <Button variant="outline" onClick={() => setSelectedEvent(null)} className="flex-1 rounded-xl py-6">
                                        Close
                                    </Button>
                                    <Link to="/contact" className="flex-1">
                                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl py-6 shadow-soft font-bold">
                                            Register Now
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* HERO - Ultra Premium & "More Beautiful" */}
            <section className="relative bg-secondary min-h-screen flex items-center pt-28 pb-20 md:pt-32 md:pb-24 overflow-hidden">

                {/* Background Decor */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[70vw] h-[70vw] bg-primary/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-warm/5 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 flex flex-col h-full justify-center">

                    {/* Top Content: Text + Main Visual */}
                    <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
                        {/* Text Col */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-5 text-left"
                        >
                            <span className="inline-block px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-warm font-bold text-sm tracking-widest uppercase mb-6 backdrop-blur-md">
                                ★ Community First
                            </span>
                            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-secondary-foreground mb-6 leading-tight">
                                Anticipating <br />
                                <span className="text-primary italic">Better Living.</span>
                            </h1>
                            <p className="text-secondary-foreground/70 text-lg leading-relaxed mb-8 max-w-md">
                                Join us for transformative health events designed to empower, educate, and elevate our community's well-being.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    onClick={() => document.getElementById('events-grid')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="bg-warm text-warm-foreground hover:bg-warm/90 rounded-xl px-8 shadow-xl font-bold h-14"
                                >
                                    Browse Events
                                </Button>
                                <Link to="/contact">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-xl px-8 h-14 font-bold w-full sm:w-auto"
                                    >
                                        Partner With Us
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Main Hero Image Col */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:col-span-7 relative"
                        >
                            <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10">
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent z-10" />
                                <img src={heroImage} alt="Community Event" className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover" loading="eager" />

                                {/* Overlay Content */}
                                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20">
                                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">Community Health Fair</h3>
                                    <div className="flex items-center gap-2 text-white/80 text-sm md:text-base">
                                        <CheckCircle2 className="w-5 h-5 text-warm" />
                                        <span>Confidential & Professional Care</span>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Floating UI - Fixed Position */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-6 right-4 md:-top-10 md:right-10 bg-white p-4 md:p-5 rounded-2xl shadow-xl z-30 hidden sm:block"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                                        <Heart className="w-5 h-5 fill-current" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase">Impact</p>
                                        <p className="text-lg font-bold text-gray-900">500+ Lives Touched</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Feature Cards Row (The "3 Cards" Request) */}
                    <div className="grid md:grid-cols-3 gap-6 transform lg:-translate-y-12 z-20">
                        {highlights.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 + (idx * 0.1) }}
                                className="group relative h-48 rounded-3xl overflow-hidden shadow-lg border border-white/10"
                            >
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10" />
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                                    <h4 className="text-xl font-bold text-white mb-1 group-hover:text-warm transition-colors">{item.title}</h4>
                                    <p className="text-white/80 text-sm flex items-center gap-2">
                                        {item.desc}
                                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Main Events Grid */}
            <section id="events-grid" className="py-20 md:py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
                        <div>
                            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Mark Your Calendar</span>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Upcoming Sessions</h2>
                        </div>
                        <div className="h-px bg-border flex-1 mx-8 hidden md:block" />
                        <Link to="/contact" className="text-sm font-bold text-foreground border-b-2 border-primary pb-1 hover:text-primary transition-colors inline-block">
                            View Full Calendar
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="rounded-3xl bg-muted h-[400px] animate-pulse" />
                            ))}
                        </div>
                    ) : events.length === 0 ? (
                        <div className="text-center py-20 bg-muted/20 rounded-[3rem] border border-border/50">
                            <Calendar className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
                            <h3 className="text-xl font-bold text-foreground mb-2">No Scheduled Events</h3>
                            <p className="text-muted-foreground mb-6">We are currently curating our next series of community workshops.</p>
                            <Link to="/contact" className="text-primary font-bold hover:underline">Get Notified</Link>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map((event) => (
                                <article key={event.id} className="group bg-card rounded-[2rem] overflow-hidden border border-border/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                                    <div className="relative h-60 overflow-hidden">
                                        <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur text-foreground px-4 py-2 rounded-xl text-center shadow-lg border border-white/50">
                                            <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">{new Date(event.event_date + "T00:00:00").toLocaleDateString('en-US', { month: 'short' })}</span>
                                            <span className="block text-2xl font-bold leading-none">{new Date(event.event_date + "T00:00:00").getDate()}</span>
                                        </div>
                                        {event.image_url ? (
                                            <img src={event.image_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                                        ) : (
                                            <div className="w-full h-full bg-muted flex items-center justify-center">
                                                <Calendar className="w-12 h-12 text-muted-foreground/30" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-8">
                                        <div className="mb-4">
                                            <h3 className="font-display text-2xl font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">{event.title}</h3>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                {event.event_time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.event_time}</span>}
                                                {event.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>}
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground line-clamp-2 mb-6 text-sm leading-relaxed">{event.description}</p>
                                        <button
                                            onClick={() => setSelectedEvent(event)}
                                            className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all cursor-pointer bg-transparent border-0 p-0"
                                        >
                                            Event Details <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground">Everything you need to know about our community events.</p>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                        className="w-full flex items-center justify-between p-6 text-left"
                                    >
                                        <span className="font-bold text-lg text-foreground">{faq.q}</span>
                                        {openFaq === idx ? <Minus className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-muted-foreground" />}
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                                                    {faq.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-secondary">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="font-display text-3xl font-bold text-secondary-foreground mb-4">
                        Want to Host a Community Event With Us?
                    </h2>
                    <p className="text-secondary-foreground/70 max-w-xl mx-auto mb-8">
                        We partner with churches, community centers, and organizations to bring free health services to your neighborhood.
                    </p>
                    <Link to="/contact">
                        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 h-12 shadow-lg text-base font-semibold">
                            Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </Layout>
    );
};

export default Events;
