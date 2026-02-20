import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowRight, X } from "lucide-react";
import { eventsApi } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Import exact images to ensure they match Events page
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

const UpcomingEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    // Initial Demo Data as fallback/placeholder
    const demoEvents: Event[] = [
        {
            id: "demo-1",
            title: "Free Home Health Assessment Day",
            description: "Comprehensive in-home health evaluations provided by our certified nursing team. Open to all seniors in the community.",
            event_date: "2026-03-15",
            event_time: "09:00 AM - 04:00 PM",
            location: "Midway Community Center",
            image_url: assessmentImg,
            is_published: true
        },
        {
            id: "demo-2",
            title: "Caregiver Support Workshop",
            description: "A supportive environment for caregivers to share experiences, learn stress management techniques, and access resources.",
            event_date: "2026-03-22",
            event_time: "10:00 AM - 12:00 PM",
            location: "Main Conference Room",
            image_url: caregiverImg,
            is_published: true
        },
        {
            id: "demo-3",
            title: "Senior Wellness Fair",
            description: "Join us for a day of fun, fitness, and health education. Featuring local vendors, free screenings, and activities.",
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
                // Fetch real published events
                const data = await eventsApi.getPublished();

                if (data && data.length > 0) {
                    const upcoming = data
                        .filter((e: any) => new Date(e.event_date) >= new Date(new Date().toDateString()))
                        .slice(0, 3)
                        .map((e: any) => {
                            // Force specific images for known titles (Same logic as Events.tsx)
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

                    if (upcoming.length > 0) {
                        setEvents(upcoming);
                    } else {
                        // Fallback to demo if no upcoming events found in DB
                        setEvents(demoEvents);
                    }
                } else {
                    setEvents(demoEvents);
                }
            } catch (error) {
                console.error("Failed to fetch events:", error);
                setEvents(demoEvents);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (!loading && events.length === 0) return null;

    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">

                {/* Modal for Details */}
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

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                    <div>
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3 tracking-wide uppercase">
                            Community
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                            Upcoming Sessions
                        </h2>
                        <p className="text-muted-foreground mt-2 max-w-lg">
                            Join us for free health events, workshops, and community outreach across Chicago.
                        </p>
                    </div>
                    <Link
                        to="/events"
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all shrink-0"
                    >
                        View Full Calendar <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* Cards */}
                {loading ? (
                    <div className="grid md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="rounded-[2rem] bg-muted h-[400px] animate-pulse" />
                        ))}
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
    );
};

export default UpcomingEvents;
