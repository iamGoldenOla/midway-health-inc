import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  MessageSquare,
  MessageCircle,
  Calendar,
  Mail,
  Users,
  Stethoscope,
  Menu,
  Bell,
  Search,
  TrendingUp,
  Clock,
  Loader2,
  Eye,
  Plus,
  Pencil,
  Trash2,
  X,
  LogOut,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { authApi, blogApi, servicesApi, contactApi, consultationsApi, appointmentsApi, jobApplicationsApi, newsletterApi, eventsApi, commentsApi } from "@/services/api";
import { useNavigate } from "react-router-dom";

type Section =
  | "overview"
  | "blog"
  | "services"
  | "contacts"
  | "consultations"
  | "appointments"
  | "newsletters"
  | "careers"
  | "events"
  | "comments";

const sidebarItems: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "consultations", label: "Consultations", icon: Stethoscope },
  { id: "contacts", label: "Contact Messages", icon: MessageSquare },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "blog", label: "Blog Posts", icon: FileText },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "events", label: "Events", icon: Calendar },
  { id: "comments", label: "Comments", icon: MessageCircle },
  { id: "newsletters", label: "Newsletters", icon: Mail },
  { id: "careers", label: "Job Applications", icon: Users },
];

const statusBadge = (status: string) => {
  const colors: Record<string, string> = {
    New: "bg-warm/10 text-warm",
    Contacted: "bg-primary/10 text-primary",
    Scheduled: "bg-accent/10 text-accent",
    Reviewed: "bg-muted text-muted-foreground",
    Closed: "bg-border text-muted-foreground",
    Confirmed: "bg-primary/10 text-primary",
    Completed: "bg-accent/10 text-accent",
    Cancelled: "bg-border text-muted-foreground",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status] || colors.New}`}>
      {status}
    </span>
  );
};

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// ─── Blog Post Form ───────────────────────────────────────────────────────────
const emptyBlogForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featured_image: "",
  category: "",
  tags: "",
  meta_title: "",
  meta_description: "",
  og_image: "",
  focus_keyword: "",
  published: false,
};

// ─── Service Form ─────────────────────────────────────────────────────────────
const emptyServiceForm = {
  title: "",
  slug: "",
  description: "",
  icon: "",
  image: "",
  features: "",
};

// ─── Event Form ───────────────────────────────────────────────────────────────
const emptyEventForm = {
  title: "",
  description: "",
  event_date: "",
  event_time: "",
  location: "",
  image_url: "",
  is_published: false,
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Blog state
  const [blogFormOpen, setBlogFormOpen] = useState(false);
  const [blogForm, setBlogForm] = useState({ ...emptyBlogForm });
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogSaving, setBlogSaving] = useState(false);

  // Service state
  const [serviceFormOpen, setServiceFormOpen] = useState(false);
  const [serviceForm, setServiceForm] = useState({ ...emptyServiceForm });
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceSaving, setServiceSaving] = useState(false);

  // Real data state
  const [consultations, setConsultations] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [jobApplications, setJobApplications] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);

  // Event state
  const [eventFormOpen, setEventFormOpen] = useState(false);
  const [eventForm, setEventForm] = useState({ ...emptyEventForm });
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventSaving, setEventSaving] = useState(false);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const results = await Promise.allSettled([
        consultationsApi.getAll(),
        contactApi.getAll(),
        appointmentsApi.getAll(),
        blogApi.getAll(),
        servicesApi.getAll(),
        newsletterApi.getAll(),
        jobApplicationsApi.getAll(),
        eventsApi.getAll(),
        commentsApi.getAll(),
      ]);

      const [
        consultationsRes,
        contactsRes,
        appointmentsRes,
        blogRes,
        servicesRes,
        newslettersRes,
        jobsRes,
        eventsRes,
        commentsRes,
      ] = results;

      // Helper to extract data or default to empty array
      const getData = (res: PromiseSettledResult<any>, name: string) => {
        if (res.status === "fulfilled") return res.value;
        console.error(`Failed to load ${name}:`, res.reason);
        // Optional: toast error for critical failures if needed, or just suppress
        return [];
      };

      setConsultations(getData(consultationsRes, "consultations"));
      setContacts(getData(contactsRes, "contacts"));
      setAppointments(getData(appointmentsRes, "appointments"));
      setBlogPosts(getData(blogRes, "blog"));
      setServices(getData(servicesRes, "services"));
      setNewsletters(getData(newslettersRes, "newsletters"));
      setJobApplications(getData(jobsRes, "jobs"));
      setEvents(getData(eventsRes, "events"));
      setComments(getData(commentsRes, "comments"));

    } catch (error) {
      console.error("Critical error loading dashboard data:", error);
      toast({ title: "Error loading dashboard", description: "Partial data may be missing. Check console.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authApi.signOut();
      navigate("/mwh-secure-portal-2026");
    } catch {
      toast({ title: "Error signing out", variant: "destructive" });
    }
  };

  // ─── Blog CRUD ──────────────────────────────────────────────────────────────
  const openNewBlog = () => {
    setBlogForm({ ...emptyBlogForm });
    setEditingBlogId(null);
    setBlogFormOpen(true);
  };

  const openEditBlog = (post: any) => {
    setBlogForm({
      title: post.title || "",
      slug: post.slug || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      featured_image: post.featured_image || "",
      category: post.category || "",
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : (post.tags || ""),
      meta_title: post.meta_title || "",
      meta_description: post.meta_description || "",
      og_image: post.og_image || "",
      focus_keyword: post.focus_keyword || "",
      published: post.published || false,
    });
    setEditingBlogId(post.id);
    setBlogFormOpen(true);
  };

  const handleBlogTitleChange = (title: string) => {
    setBlogForm((f) => ({
      ...f,
      title,
      slug: editingBlogId ? f.slug : slugify(title),
      meta_title: f.meta_title || title,
    }));
  };

  const handleSaveBlog = async () => {
    if (!blogForm.title || !blogForm.slug) {
      toast({ title: "Title and slug are required", variant: "destructive" });
      return;
    }
    setBlogSaving(true);
    try {
      const payload: any = {
        title: blogForm.title,
        slug: blogForm.slug,
        excerpt: blogForm.excerpt,
        content: blogForm.content,
        featured_image: blogForm.featured_image || null,
        category: blogForm.category || null,
        tags: blogForm.tags ? blogForm.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        meta_title: blogForm.meta_title || blogForm.title,
        meta_description: blogForm.meta_description || blogForm.excerpt,
        og_image: blogForm.og_image || blogForm.featured_image || null,
        focus_keyword: blogForm.focus_keyword || null,
        published: blogForm.published,
      };

      if (editingBlogId) {
        await blogApi.update(editingBlogId, payload);
        toast({ title: "Blog post updated!" });
      } else {
        await blogApi.create(payload);
        toast({ title: "Blog post created!" });
      }
      setBlogFormOpen(false);
      await loadAllData();
    } catch (err: any) {
      toast({ title: "Error saving post", description: err.message, variant: "destructive" });
    } finally {
      setBlogSaving(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    try {
      await blogApi.delete(id);
      toast({ title: "Blog post deleted" });
      await loadAllData();
    } catch (err: any) {
      toast({ title: "Error deleting post", description: err.message, variant: "destructive" });
    }
  };

  // ─── Services CRUD ──────────────────────────────────────────────────────────
  const openNewService = () => {
    setServiceForm({ ...emptyServiceForm });
    setEditingServiceId(null);
    setServiceFormOpen(true);
  };

  const openEditService = (service: any) => {
    setServiceForm({
      title: service.title || "",
      slug: service.slug || "",
      description: service.description || "",
      icon: service.icon || "",
      image: service.image || "",
      features: Array.isArray(service.features) ? service.features.join("\n") : (service.features || ""),
    });
    setEditingServiceId(service.id);
    setServiceFormOpen(true);
  };

  const handleServiceTitleChange = (title: string) => {
    setServiceForm((f) => ({
      ...f,
      title,
      slug: editingServiceId ? f.slug : slugify(title),
    }));
  };

  const handleSaveService = async () => {
    if (!serviceForm.title || !serviceForm.slug) {
      toast({ title: "Title and slug are required", variant: "destructive" });
      return;
    }
    setServiceSaving(true);
    try {
      const payload: any = {
        title: serviceForm.title,
        slug: serviceForm.slug,
        description: serviceForm.description,
        icon: serviceForm.icon || null,
        image: serviceForm.image || null,
        features: serviceForm.features
          ? serviceForm.features.split("\n").map((f) => f.trim()).filter(Boolean)
          : [],
      };

      if (editingServiceId) {
        await servicesApi.update(editingServiceId, payload);
        toast({ title: "Service updated!" });
      } else {
        await servicesApi.create(payload);
        toast({ title: "Service created!" });
      }
      setServiceFormOpen(false);
      await loadAllData();
    } catch (err: any) {
      toast({ title: "Error saving service", description: err.message, variant: "destructive" });
    } finally {
      setServiceSaving(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try {
      await servicesApi.delete(id);
      toast({ title: "Service deleted" });
      await loadAllData();
    } catch (err: any) {
      toast({ title: "Error deleting service", description: err.message, variant: "destructive" });
    }
  };

  const handleViewItem = (item: any) => {
    setSelectedItem(item);
    setViewDialogOpen(true);
  };

  const stats = [
    {
      label: "Consultations",
      value: consultations.filter((c) => c.status === "New").length,
      total: consultations.length,
      icon: Stethoscope,
      color: "text-primary",
    },
    {
      label: "Contact Messages",
      value: contacts.filter((c) => c.status === "New").length,
      total: contacts.length,
      icon: MessageSquare,
      color: "text-warm",
    },
    {
      label: "Appointments",
      value: appointments.filter((a) => a.status === "New").length,
      total: appointments.length,
      icon: Calendar,
      color: "text-primary",
    },
    {
      label: "Newsletter Subs",
      value: newsletters.length,
      total: newsletters.length,
      icon: Mail,
      color: "text-warm",
    },
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border shadow-card hover:shadow-elevated transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className="text-xs font-semibold text-muted-foreground">
                  {stat.value} new
                </span>
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.total}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-warm" /> Recent Consultations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {consultations.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium">{c.full_name}</p>
                  <p className="text-xs text-muted-foreground">{c.care_type}</p>
                </div>
                {statusBadge(c.status)}
              </div>
            ))}
            {consultations.length === 0 && <p className="text-muted-foreground text-sm">No consultations yet</p>}
          </CardContent>
        </Card>

        <Card className="border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" /> Recent Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.slice(0, 5).map((a) => (
              <div key={a.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium">{a.full_name}</p>
                  <p className="text-xs text-muted-foreground">{a.preferred_date}</p>
                </div>
                {statusBadge(a.status)}
              </div>
            ))}
            {appointments.length === 0 && <p className="text-muted-foreground text-sm">No appointments yet</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderDetailDialog = () => {
    if (!selectedItem) return null;
    return (
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
          <DialogDescription>Full record information</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {Object.entries(selectedItem).map(([key, value]) => (
            <div key={key} className="col-span-1">
              <label className="text-xs font-semibold uppercase text-muted-foreground">
                {key.replace(/_/g, " ")}
              </label>
              <p className="text-base font-medium mt-1 break-words">
                {Array.isArray(value) ? value.join(", ") : String(value ?? "-")}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    );
  };

  const renderTable = (
    title: string,
    columns: string[],
    rows: any[],
    fields: string[]
  ) => (
    <Card className="border-border shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-9 w-56 rounded-xl" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {columns.map((col) => (
                  <th key={col} className="text-left py-3 px-4 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                    {col}
                  </th>
                ))}
                <th className="text-left py-3 px-4 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="py-8 text-center text-muted-foreground">
                    No records found
                  </td>
                </tr>
              ) : (
                rows.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    {fields.map((field) => (
                      <td key={field} className="py-3 px-4 text-sm">
                        {field === "status" ? statusBadge(row[field]) :
                          field === "created_at" ? new Date(row[field]).toLocaleDateString() :
                            row[field] || "-"}
                      </td>
                    ))}
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:bg-primary/10"
                        onClick={() => handleViewItem(row)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  // ─── Blog Section ────────────────────────────────────────────────────────────
  const renderBlogSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Button onClick={openNewBlog} className="rounded-xl gap-2">
          <Plus className="h-4 w-4" /> New Post
        </Button>
      </div>

      <Card className="border-border shadow-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Title", "Slug", "Category", "Published", "Date"].map((col) => (
                    <th key={col} className="text-left py-3 px-4 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                      {col}
                    </th>
                  ))}
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogPosts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-muted-foreground">
                      No blog posts yet. Click "New Post" to create one.
                    </td>
                  </tr>
                ) : (
                  blogPosts.map((post) => (
                    <tr key={post.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium max-w-[200px] truncate">{post.title}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{post.slug}</td>
                      <td className="py-3 px-4 text-sm">{post.category || "-"}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${post.published ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10" onClick={() => openEditBlog(post)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteBlog(post.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // ─── Services Section ────────────────────────────────────────────────────────
  const renderServicesSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Services</h2>
        <Button onClick={openNewService} className="rounded-xl gap-2">
          <Plus className="h-4 w-4" /> New Service
        </Button>
      </div>

      <Card className="border-border shadow-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Title", "Slug", "Icon", "Description"].map((col) => (
                    <th key={col} className="text-left py-3 px-4 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                      {col}
                    </th>
                  ))}
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-muted-foreground">
                      No services yet. Click "New Service" to add one.
                    </td>
                  </tr>
                ) : (
                  services.map((service) => (
                    <tr key={service.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium">{service.title}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{service.slug}</td>
                      <td className="py-3 px-4 text-sm">{service.icon || "-"}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground max-w-[200px] truncate">{service.description || "-"}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10" onClick={() => openEditService(service)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteService(service.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // ─── Events CRUD ─────────────────────────────────────────────────────────────
  const openNewEvent = () => {
    setEventForm({ ...emptyEventForm });
    setEditingEventId(null);
    setEventFormOpen(true);
  };

  const openEditEvent = (ev: any) => {
    setEventForm({
      title: ev.title || "",
      description: ev.description || "",
      event_date: ev.event_date || "",
      event_time: ev.event_time || "",
      location: ev.location || "",
      image_url: ev.image_url || "",
      is_published: ev.is_published || false,
    });
    setEditingEventId(ev.id);
    setEventFormOpen(true);
  };

  const handleSaveEvent = async () => {
    if (!eventForm.title || !eventForm.event_date) {
      toast({ title: "Title and date are required", variant: "destructive" });
      return;
    }
    setEventSaving(true);
    try {
      const payload: any = {
        title: eventForm.title,
        description: eventForm.description || null,
        event_date: eventForm.event_date,
        event_time: eventForm.event_time || null,
        location: eventForm.location || null,
        image_url: eventForm.image_url || null,
        is_published: eventForm.is_published,
      };
      if (editingEventId) {
        await eventsApi.update(editingEventId, payload);
        toast({ title: "Event updated!" });
      } else {
        await eventsApi.create(payload);
        toast({ title: "Event created!" });
      }
      setEventFormOpen(false);
      await loadAllData();
    } catch (err: any) {
      toast({ title: "Error saving event", description: err.message, variant: "destructive" });
    } finally {
      setEventSaving(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    try {
      await eventsApi.delete(id);
      toast({ title: "Event deleted" });
      await loadAllData();
    } catch (err: any) {
      toast({ title: "Error deleting event", description: err.message, variant: "destructive" });
    }
  };

  // ─── Events Section ──────────────────────────────────────────────────────────
  const renderEventsSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Upcoming Events</h2>
        <Button onClick={openNewEvent} className="rounded-xl gap-2">
          <Plus className="h-4 w-4" /> New Event
        </Button>
      </div>

      <Card className="border-border shadow-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Title", "Date", "Time", "Location", "Published"].map((col) => (
                    <th key={col} className="text-left py-3 px-4 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                      {col}
                    </th>
                  ))}
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      No events yet. Create your first event!
                    </td>
                  </tr>
                ) : (
                  events.map((ev) => (
                    <tr key={ev.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium">{ev.title}</td>
                      <td className="py-3 px-4 text-sm">{ev.event_date}</td>
                      <td className="py-3 px-4 text-sm">{ev.event_time || "-"}</td>
                      <td className="py-3 px-4 text-sm max-w-[180px] truncate">{ev.location || "-"}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${ev.is_published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          }`}>
                          {ev.is_published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10" onClick={() => openEditEvent(ev)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteEvent(ev.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const handleApproveComment = async (id: string) => {
    try {
      const { data } = await commentsApi.approve(id);
      setComments(comments.map(c => c.id === id ? { ...c, approved: true } : c));
      toast({ title: "Comment approved" });
    } catch (error) {
      toast({ title: "Error approving comment", variant: "destructive" });
    }
  };

  const handleDeleteComment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    try {
      await commentsApi.delete(id);
      setComments(comments.filter(c => c.id !== id));
      toast({ title: "Comment deleted" });
    } catch (error) {
      toast({ title: "Error deleting comment", variant: "destructive" });
    }
  };

  const renderCommentsSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Blog Comments</h2>
      <Card className="border-border shadow-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Name", "Post Slug", "Comment", "Date", "Status", "Actions"].map((col) => (
                    <th key={col} className="text-left py-3 px-4 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      No comments found.
                    </td>
                  </tr>
                ) : (
                  comments.map((comment) => (
                    <tr key={comment.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-medium">{comment.name}</td>
                      <td className="py-3 px-4 text-xs text-muted-foreground font-mono">{comment.post_slug}</td>
                      <td className="py-3 px-4 max-w-xs truncate" title={comment.comment}>
                        {comment.comment}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${comment.approved ? "bg-primary/10 text-primary" : "bg-warm/10 text-warm"}`}>
                          {comment.approved ? "Approved" : "Pending"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {!comment.approved && (
                            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 h-8 w-8 p-0" onClick={() => handleApproveComment(comment.id)} title="Approve">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 h-8 w-8 p-0" onClick={() => handleDeleteComment(comment.id)} title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSection = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    switch (activeSection) {
      case "overview": return renderOverview();
      case "blog": return renderBlogSection();
      case "services": return renderServicesSection();
      case "events": return renderEventsSection();
      case "comments": return renderCommentsSection();
      case "consultations":
        return renderTable("Consultation Requests", ["Name", "Care Type", "Urgency", "Status", "Date"], consultations, ["full_name", "care_type", "urgency", "status", "created_at"]);
      case "contacts":
        return renderTable("Contact Messages", ["Name", "Email", "Message", "Status", "Date"], contacts, ["name", "email", "message", "status", "created_at"]);
      case "appointments":
        return renderTable("Appointments", ["Name", "Email", "Phone", "Status", "Date"], appointments, ["full_name", "email", "phone", "status", "created_at"]);
      case "newsletters":
        return renderTable("Newsletter Subscribers", ["Email", "Date"], newsletters, ["email", "created_at"]);
      case "careers":
        return renderTable("Job Applications", ["Name", "Email", "Position", "Status", "Date"], jobApplications, ["full_name", "email", "position", "status", "created_at"]);
      default: return renderOverview();
    }
  };

  const newNotifications =
    consultations.filter((c) => c.status === "New").length +
    contacts.filter((c) => c.status === "New").length +
    appointments.filter((a) => a.status === "New").length;

  return (
    <div className="flex h-screen bg-muted/20 text-foreground font-sans overflow-hidden">
      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        {renderDetailDialog()}
      </Dialog>

      {/* Blog Form Dialog */}
      <Dialog open={blogFormOpen} onOpenChange={setBlogFormOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingBlogId ? "Edit Blog Post" : "New Blog Post"}</DialogTitle>
            <DialogDescription>Fill in the details below. SEO fields help your post rank on Google.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm uppercase text-muted-foreground tracking-wider">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-medium mb-1 block">Title *</label>
                  <Input
                    value={blogForm.title}
                    onChange={(e) => handleBlogTitleChange(e.target.value)}
                    placeholder="Enter post title"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Slug *</label>
                  <Input
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm((f) => ({ ...f, slug: e.target.value }))}
                    placeholder="post-url-slug"
                    className="rounded-xl font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Input
                    value={blogForm.category}
                    onChange={(e) => setBlogForm((f) => ({ ...f, category: e.target.value }))}
                    placeholder="e.g. Healthcare, Wellness"
                    className="rounded-xl"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium mb-1 block">Tags (comma separated)</label>
                  <Input
                    value={blogForm.tags}
                    onChange={(e) => setBlogForm((f) => ({ ...f, tags: e.target.value }))}
                    placeholder="home care, nursing, wellness"
                    className="rounded-xl"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium mb-1 block">Featured Image URL</label>
                  <Input
                    value={blogForm.featured_image}
                    onChange={(e) => setBlogForm((f) => ({ ...f, featured_image: e.target.value }))}
                    placeholder="https://..."
                    className="rounded-xl"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium mb-1 block">Excerpt</label>
                  <Textarea
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm((f) => ({ ...f, excerpt: e.target.value }))}
                    placeholder="Short summary of the post..."
                    className="rounded-xl resize-none"
                    rows={2}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium mb-1 block">Content</label>
                  <Textarea
                    value={blogForm.content}
                    onChange={(e) => setBlogForm((f) => ({ ...f, content: e.target.value }))}
                    placeholder="Write your blog post content here..."
                    className="rounded-xl resize-none"
                    rows={8}
                  />
                </div>
              </div>
            </div>

            {/* SEO Fields */}
            <div className="space-y-4 border-t border-border pt-6">
              <h3 className="font-semibold text-sm uppercase text-muted-foreground tracking-wider flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" /> SEO Settings
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-medium mb-1 block">Meta Title</label>
                  <Input
                    value={blogForm.meta_title}
                    onChange={(e) => setBlogForm((f) => ({ ...f, meta_title: e.target.value }))}
                    placeholder="SEO title (defaults to post title)"
                    className="rounded-xl"
                  />
                  <p className="text-xs text-muted-foreground mt-1">{blogForm.meta_title.length}/60 characters recommended</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium mb-1 block">Meta Description</label>
                  <Textarea
                    value={blogForm.meta_description}
                    onChange={(e) => setBlogForm((f) => ({ ...f, meta_description: e.target.value }))}
                    placeholder="SEO description (150-160 characters ideal)"
                    className="rounded-xl resize-none"
                    rows={2}
                  />
                  <p className="text-xs text-muted-foreground mt-1">{blogForm.meta_description.length}/160 characters recommended</p>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Focus Keyword</label>
                  <Input
                    value={blogForm.focus_keyword}
                    onChange={(e) => setBlogForm((f) => ({ ...f, focus_keyword: e.target.value }))}
                    placeholder="e.g. home healthcare Chicago"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">OG Image URL</label>
                  <Input
                    value={blogForm.og_image}
                    onChange={(e) => setBlogForm((f) => ({ ...f, og_image: e.target.value }))}
                    placeholder="Social share image URL"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Publish */}
            <div className="flex items-center justify-between border-t border-border pt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={blogForm.published}
                  onChange={(e) => setBlogForm((f) => ({ ...f, published: e.target.checked }))}
                  className="w-4 h-4 rounded accent-primary"
                />
                <span className="text-sm font-medium">Publish immediately</span>
              </label>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setBlogFormOpen(false)} className="rounded-xl">
                  Cancel
                </Button>
                <Button onClick={handleSaveBlog} disabled={blogSaving} className="rounded-xl">
                  {blogSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  {editingBlogId ? "Update Post" : "Create Post"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Service Form Dialog */}
      <Dialog open={serviceFormOpen} onOpenChange={setServiceFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingServiceId ? "Edit Service" : "New Service"}</DialogTitle>
            <DialogDescription>Update the service details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-sm font-medium mb-1 block">Title *</label>
                <Input
                  value={serviceForm.title}
                  onChange={(e) => handleServiceTitleChange(e.target.value)}
                  placeholder="Service title"
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Slug *</label>
                <Input
                  value={serviceForm.slug}
                  onChange={(e) => setServiceForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="service-url-slug"
                  className="rounded-xl font-mono text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Icon (Lucide name)</label>
                <Input
                  value={serviceForm.icon}
                  onChange={(e) => setServiceForm((f) => ({ ...f, icon: e.target.value }))}
                  placeholder="e.g. Heart, Stethoscope"
                  className="rounded-xl"
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium mb-1 block">Image URL</label>
                <Input
                  value={serviceForm.image}
                  onChange={(e) => setServiceForm((f) => ({ ...f, image: e.target.value }))}
                  placeholder="https://..."
                  className="rounded-xl"
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Textarea
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Describe this service..."
                  className="rounded-xl resize-none"
                  rows={3}
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium mb-1 block">Features (one per line)</label>
                <Textarea
                  value={serviceForm.features}
                  onChange={(e) => setServiceForm((f) => ({ ...f, features: e.target.value }))}
                  placeholder={"24/7 availability\nLicensed professionals\nPersonalized care plans"}
                  className="rounded-xl resize-none font-mono text-sm"
                  rows={5}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-border pt-4">
              <Button variant="outline" onClick={() => setServiceFormOpen(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button onClick={handleSaveService} disabled={serviceSaving} className="rounded-xl">
                {serviceSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {editingServiceId ? "Update Service" : "Create Service"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Form Dialog */}
      <Dialog open={eventFormOpen} onOpenChange={setEventFormOpen}>
        <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingEventId ? "Edit Event" : "New Event"}</DialogTitle>
            <DialogDescription>Fill in the event details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium mb-1 block">Event Title *</label>
              <Input
                value={eventForm.title}
                onChange={(e) => setEventForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Free Home Health Assessment Day"
                className="rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Date *</label>
                <Input
                  type="date"
                  value={eventForm.event_date}
                  onChange={(e) => setEventForm((f) => ({ ...f, event_date: e.target.value }))}
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Time</label>
                <Input
                  value={eventForm.event_time}
                  onChange={(e) => setEventForm((f) => ({ ...f, event_time: e.target.value }))}
                  placeholder="e.g. 10:00 AM - 4:00 PM"
                  className="rounded-xl"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Location</label>
              <Input
                value={eventForm.location}
                onChange={(e) => setEventForm((f) => ({ ...f, location: e.target.value }))}
                placeholder="e.g. 1434 W 76th St, Chicago, IL"
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Image URL</label>
              <Input
                value={eventForm.image_url}
                onChange={(e) => setEventForm((f) => ({ ...f, image_url: e.target.value }))}
                placeholder="https://..."
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <Textarea
                value={eventForm.description}
                onChange={(e) => setEventForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Describe this event..."
                className="rounded-xl resize-none"
                rows={3}
              />
            </div>
            <div className="flex items-center gap-3 pt-1">
              <input
                type="checkbox"
                id="event-published"
                checked={eventForm.is_published}
                onChange={(e) => setEventForm((f) => ({ ...f, is_published: e.target.checked }))}
                className="w-4 h-4 rounded"
              />
              <label htmlFor="event-published" className="text-sm font-medium cursor-pointer">
                Publish this event (visible on website)
              </label>
            </div>
            <div className="flex justify-end gap-3 border-t border-border pt-4">
              <Button variant="outline" onClick={() => setEventFormOpen(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button onClick={handleSaveEvent} disabled={eventSaving} className="rounded-xl">
                {eventSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {editingEventId ? "Update Event" : "Create Event"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transform transition-transform duration-300 lg:translate-x-0 fixed lg:sticky top-0 left-0 z-40 h-full w-[280px] bg-secondary border-r border-secondary/20 flex flex-col shrink-0 shadow-2xl lg:shadow-none`}
      >
        <div className="p-6 border-b border-secondary-foreground/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-secondary font-bold text-xl shadow-sm">
              M
            </div>
            <h1 className="font-display font-bold text-xl tracking-tight text-secondary-foreground">Midway Admin</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-secondary-foreground/70 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                  ? "bg-white text-secondary shadow-md font-bold"
                  : "text-secondary-foreground/80 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? "text-secondary" : "text-secondary-foreground/80 group-hover:text-white"}`} />
                <span className="text-sm">{item.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary shadow-sm" />}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-secondary-foreground/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-secondary-foreground/70 hover:bg-white/10 hover:text-white transition-colors mb-2">
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Back to Website</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:bg-destructive/20 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-bold">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative w-full">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Header */}
        <header className="h-[72px] border-b border-border bg-background/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between shrink-0 z-20 sticky top-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-muted-foreground hover:text-foreground -ml-2"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h2 className="text-lg sm:text-xl font-bold font-display tracking-tight text-foreground truncate">
              {sidebarItems.find((i) => i.id === activeSection)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background" />
            </Button>
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm border border-primary/20">
              A
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative scroll-smooth">
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {renderSection()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
