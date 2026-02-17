import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
    Calendar as CalendarIcon,
    Clock,
    User,
    Mail,
    Phone,
    FileText,
    CheckCircle,
    ArrowRight,
    Stethoscope,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { appointmentsApi } from "@/services/api";
import appointmentHero from "@/assets/midway_3.jpg";

const appointmentSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    preferred_date: z.string().min(1, "Please select a date"),
    preferred_time: z.string().min(1, "Please select a time"),
    service_requested: z.string().optional(),
    message: z.string().min(10, "Please provide more details (at least 10 characters)"),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

const services = [
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
    "Other",
];

const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
];

const Appointment = () => {
    const { toast } = useToast();
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<AppointmentFormData>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            preferred_date: "",
            preferred_time: "",
            service_requested: "",
            message: "",
        },
    });

    const onSubmit = async (data: AppointmentFormData) => {
        try {
            setIsSubmitting(true);

            await appointmentsApi.book({
                name: data.name,
                email: data.email,
                phone: data.phone,
                preferred_date: data.preferred_date,
                service_requested: data.service_requested || null,
                message: `${data.message}\n\nPreferred Time: ${data.preferred_time}`,
            });

            setSubmitted(true);
            toast({
                title: "Appointment Request Received",
                description: "We'll confirm your appointment within 24 hours.",
            });
            form.reset();
        } catch (error: any) {
            console.error("Failed to book appointment:", error);
            toast({
                title: "Booking Failed",
                description: error.message || "Please try again or call us directly.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Get minimum date (tomorrow)
    const getMinDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split("T")[0];
    };

    // Get maximum date (3 months from now)
    const getMaxDate = () => {
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        return maxDate.toISOString().split("T")[0];
    };

    // Generate calendar days for current month
    const generateCalendarDays = () => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const todayDate = today.getDate();

        // Get first day of month and total days
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const days = [];

        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            days.push({ date: 0, isToday: false, isAvailable: false });
        }

        // Add actual days of the month
        for (let date = 1; date <= daysInMonth; date++) {
            days.push({
                date,
                isToday: date === todayDate,
                isAvailable: date >= todayDate, // Only future dates are available
            });
        }

        return days;
    };

    const calendarDays = generateCalendarDays();

    if (submitted) {
        return (
            <Layout>
                <PageHero
                    title="Book an Appointment"
                    subtitle="Schedule your visit with our healthcare professionals."
                    image={appointmentHero}
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
                            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                                Appointment Request Received!
                            </h2>
                            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                Thank you for booking with Midway Health Inc. Our team will review your request and contact you within 24 hours to confirm your appointment details.
                            </p>
                            <div className="bg-muted rounded-2xl p-6 mb-8">
                                <p className="text-sm text-muted-foreground mb-2">Need immediate assistance?</p>
                                <a
                                    href="tel:+13122989124"
                                    className="text-2xl font-bold text-primary hover:text-warm transition-colors"
                                >
                                    (312) 298-9124
                                </a>
                            </div>
                            <Button
                                onClick={() => setSubmitted(false)}
                                variant="outline"
                                size="lg"
                                className="rounded-xl"
                            >
                                Book Another Appointment
                            </Button>
                        </motion.div>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Premium Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-warm/5 pt-24 pb-20 lg:pt-32 lg:pb-28">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-warm/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-warm/10 border border-warm/20 rounded-full px-4 py-2 mb-6">
                                <div className="w-2 h-2 rounded-full bg-warm animate-pulse" />
                                <span className="text-sm font-semibold text-warm">Easy Online Booking</span>
                            </div>

                            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                                Book Your{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-warm">
                                    Appointment
                                </span>
                            </h1>

                            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                                Select a date and time slot to book your appointment with our healthcare professionals. We'll confirm your booking within 24 hours.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mb-8">
                                <div>
                                    <div className="text-3xl font-bold text-primary mb-1">24h</div>
                                    <div className="text-sm text-muted-foreground">Quick Response</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-warm mb-1">150+</div>
                                    <div className="text-sm text-muted-foreground">Happy Patients</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-primary mb-1">98%</div>
                                    <div className="text-sm text-muted-foreground">Satisfaction</div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                                    onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    Book Now
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="rounded-xl px-8 h-14 text-base font-semibold border-2"
                                    asChild
                                >
                                    <a href="tel:+13122989124">
                                        <Phone className="mr-2 h-5 w-5" />
                                        Call Us
                                    </a>
                                </Button>
                            </div>
                        </motion.div>

                        {/* Right Visual - Calendar Preview */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            {/* Main Card */}
                            <div className="relative bg-card rounded-3xl shadow-elevated border border-border p-8 backdrop-blur-sm">
                                {/* Calendar Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="font-semibold text-foreground text-lg">Select Date & Time</h3>
                                        <p className="text-sm text-muted-foreground">Choose your preferred slot</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <CalendarIcon className="h-6 w-6 text-primary" />
                                    </div>
                                </div>

                                {/* Mini Calendar Visual */}
                                <div className="bg-muted/50 rounded-2xl p-4 mb-4">
                                    <div className="grid grid-cols-7 gap-2 mb-3">
                                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                            <div key={i} className="text-center text-xs font-semibold text-muted-foreground">
                                                {day}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 gap-2">
                                        {calendarDays.map((day, i) => (
                                            <div
                                                key={i}
                                                className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all ${day.isToday
                                                    ? 'bg-primary text-primary-foreground font-bold shadow-md scale-110'
                                                    : day.isAvailable && day.date > 0
                                                        ? 'bg-background hover:bg-primary/10 cursor-pointer'
                                                        : 'text-muted-foreground/30'
                                                    }`}
                                            >
                                                {day.date > 0 ? day.date : ''}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Time Slots */}
                                <div className="space-y-2">
                                    <p className="text-sm font-semibold text-foreground mb-3">Available Time Slots</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['9:00 AM', '10:30 AM', '2:00 PM'].map((time, i) => (
                                            <div
                                                key={time}
                                                className={`px-3 py-2 rounded-xl text-center text-sm font-medium transition-all cursor-pointer ${i === 1
                                                    ? 'bg-warm text-warm-foreground shadow-md'
                                                    : 'bg-background border border-border hover:border-primary'
                                                    }`}
                                            >
                                                {time}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Confirmation Badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                    className="mt-6 flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-xl p-4"
                                >
                                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">Quick Confirmation</p>
                                        <p className="text-xs text-muted-foreground">We'll confirm within 24 hours</p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 1 }}
                                className="absolute -top-4 -right-4 bg-warm text-warm-foreground rounded-2xl shadow-elevated px-4 py-3"
                            >
                                <div className="flex items-center gap-2">
                                    <Stethoscope className="h-5 w-5" />
                                    <div>
                                        <div className="text-xs font-semibold">Expert Care</div>
                                        <div className="text-xs opacity-90">Licensed Professionals</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section id="booking-form" className="py-20 lg:py-28 bg-background">{/* Added id for smooth scroll */}
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <span className="text-warm text-sm font-semibold tracking-wider uppercase">
                            Easy Scheduling
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                            Schedule Your Appointment
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Choose a convenient date and time for your appointment. We'll confirm your booking within 24 hours.
                        </p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* Personal Information */}
                            <div className="bg-card rounded-2xl shadow-card border border-border p-8">
                                <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                                    <User className="h-5 w-5 text-primary" />
                                    Personal Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" className="rounded-xl" {...field} />
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
                                                <FormLabel>Phone Number *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="tel"
                                                        placeholder="(312) 298-9124"
                                                        className="rounded-xl"
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
                                            <FormItem className="md:col-span-2">
                                                <FormLabel>Email Address *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="john@example.com"
                                                        className="rounded-xl"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Date & Time Selection */}
                            <div className="bg-card rounded-2xl shadow-card border border-border p-8">
                                <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                                    <CalendarIcon className="h-5 w-5 text-primary" />
                                    Date & Time
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="preferred_date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Preferred Date *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        className="rounded-xl"
                                                        min={getMinDate()}
                                                        max={getMaxDate()}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Select a date within the next 3 months
                                                </p>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="preferred_time"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Preferred Time *</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="rounded-xl">
                                                            <SelectValue placeholder="Select a time slot" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <div className="p-2">
                                                            <p className="text-xs font-semibold text-muted-foreground mb-2 px-2">
                                                                Morning
                                                            </p>
                                                            {timeSlots.slice(0, 6).map((time) => (
                                                                <SelectItem key={time} value={time}>
                                                                    {time}
                                                                </SelectItem>
                                                            ))}
                                                            <p className="text-xs font-semibold text-muted-foreground mb-2 mt-3 px-2">
                                                                Afternoon
                                                            </p>
                                                            {timeSlots.slice(6).map((time) => (
                                                                <SelectItem key={time} value={time}>
                                                                    {time}
                                                                </SelectItem>
                                                            ))}
                                                        </div>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Service & Details */}
                            <div className="bg-card rounded-2xl shadow-card border border-border p-8">
                                <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                                    <Stethoscope className="h-5 w-5 text-primary" />
                                    Appointment Details
                                </h3>
                                <div className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="service_requested"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Service Type (Optional)</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="rounded-xl">
                                                            <SelectValue placeholder="Select a service" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {services.map((service) => (
                                                            <SelectItem key={service} value={service}>
                                                                {service}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Reason for Appointment *</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Please describe the reason for your appointment and any specific concerns..."
                                                        className="rounded-xl min-h-[120px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-center"
                            >
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-12 h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                            Booking...
                                        </>
                                    ) : (
                                        <>
                                            Book Appointment
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </Button>
                                <p className="text-sm text-muted-foreground mt-4">
                                    We'll contact you within 24 hours to confirm your appointment
                                </p>
                            </motion.div>
                        </form>
                    </Form>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-16 bg-muted">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-card rounded-2xl border border-border p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                <Clock className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">Quick Response</h3>
                            <p className="text-sm text-muted-foreground">
                                We'll confirm your appointment within 24 hours
                            </p>
                        </div>
                        <div className="bg-card rounded-2xl border border-border p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-warm/10 flex items-center justify-center">
                                <Phone className="h-6 w-6 text-warm" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
                            <p className="text-sm text-muted-foreground">
                                Call us at{" "}
                                <a href="tel:+13122989124" className="text-primary hover:underline">
                                    (312) 298-9124
                                </a>
                            </p>
                        </div>
                        <div className="bg-card rounded-2xl border border-border p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                <CheckCircle className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">Flexible Scheduling</h3>
                            <p className="text-sm text-muted-foreground">
                                Choose a time that works best for you
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Appointment;
