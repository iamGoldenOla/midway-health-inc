import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

export default function AdminSubmissions() {
    const [contacts, setContacts] = useState<any[]>([]);
    const [bookings, setBookings] = useState<any[]>([]);
    const [newsletter, setNewsletter] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [contactsRes, bookingsRes, newsletterRes] = await Promise.all([
                supabase.from('contacts').select('*').order('created_at', { ascending: false }),
                supabase.from('bookings').select('*').order('created_at', { ascending: false }),
                supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false }),
            ]);

            if (contactsRes.error) throw contactsRes.error;
            if (bookingsRes.error) throw bookingsRes.error;
            if (newsletterRes.error) throw newsletterRes.error;

            setContacts(contactsRes.data || []);
            setBookings(bookingsRes.data || []);
            setNewsletter(newsletterRes.data || []);
        } catch (error: any) {
            toast({
                title: 'Error formatting data',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'MMM d, yyyy h:mm a');
        } catch (e) {
            return dateString;
        }
    };

    if (isLoading) {
        return <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="font-heading text-3xl font-bold tracking-tight">Form Submissions</h1>
            </div>

            <Tabs defaultValue="contacts" className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-md">
                    <TabsTrigger value="contacts">Contact Form ({contacts.length})</TabsTrigger>
                    <TabsTrigger value="bookings">Bookings ({bookings.length})</TabsTrigger>
                    <TabsTrigger value="newsletter">Newsletter ({newsletter.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="contacts" className="mt-6">
                    <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/50 text-muted-foreground uppercase">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Date</th>
                                        <th className="px-6 py-3 font-medium">Name</th>
                                        <th className="px-6 py-3 font-medium">Email</th>
                                        <th className="px-6 py-3 font-medium">Phone</th>
                                        <th className="px-6 py-3 font-medium">Message</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {contacts.length === 0 ? (
                                        <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No contact submissions found.</td></tr>
                                    ) : (
                                        contacts.map((contact) => (
                                            <tr key={contact.id} className="hover:bg-muted/30">
                                                <td className="px-6 py-4 whitespace-nowrap">{formatDate(contact.created_at)}</td>
                                                <td className="px-6 py-4 font-medium">{contact.first_name} {contact.last_name}</td>
                                                <td className="px-6 py-4">{contact.email}</td>
                                                <td className="px-6 py-4">{contact.phone || '-'}</td>
                                                <td className="px-6 py-4 max-w-xs truncate" title={contact.message}>{contact.message}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="bookings" className="mt-6">
                    <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/50 text-muted-foreground uppercase">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Date Booked</th>
                                        <th className="px-6 py-3 font-medium">Client Info</th>
                                        <th className="px-6 py-3 font-medium">Service</th>
                                        <th className="px-6 py-3 font-medium">Requested Time</th>
                                        <th className="px-6 py-3 font-medium">Notes</th>
                                        <th className="px-6 py-3 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {bookings.length === 0 ? (
                                        <tr><td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">No bookings found.</td></tr>
                                    ) : (
                                        bookings.map((booking) => (
                                            <tr key={booking.id} className="hover:bg-muted/30">
                                                <td className="px-6 py-4 whitespace-nowrap">{formatDate(booking.created_at)}</td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium">{booking.client_name}</div>
                                                    <div className="text-muted-foreground">{booking.client_email}</div>
                                                </td>
                                                <td className="px-6 py-4">{booking.service_requested}</td>
                                                <td className="px-6 py-4">
                                                    {booking.preferred_date} at {booking.preferred_time}
                                                </td>
                                                <td className="px-6 py-4 max-w-xs truncate" title={booking.additional_notes || ''}>
                                                    {booking.additional_notes || '-'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium uppercase ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                            booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                                                booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                                    'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="newsletter" className="mt-6">
                    <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/50 text-muted-foreground uppercase">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Date Subscribed</th>
                                        <th className="px-6 py-3 font-medium">Email Address</th>
                                        <th className="px-6 py-3 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {newsletter.length === 0 ? (
                                        <tr><td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">No newsletter subscribers found.</td></tr>
                                    ) : (
                                        newsletter.map((sub) => (
                                            <tr key={sub.id} className="hover:bg-muted/30">
                                                <td className="px-6 py-4 whitespace-nowrap">{formatDate(sub.created_at)}</td>
                                                <td className="px-6 py-4 font-medium">{sub.email}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium uppercase ${sub.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        {sub.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
