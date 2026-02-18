import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  MessageSquare,
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
import { authApi, blogApi, servicesApi, contactApi, consultationsApi, appointmentsApi, jobApplicationsApi, newsletterApi } from "@/services/api";
import { useNavigate } from "react-router-dom";

type Section =
  | "overview"
  | "blog"
  | "services"
  | "contacts"
  | "consultations"
  | "appointments"
  | "newsletters"
  | "careers";

const sidebarItems: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "consultations", label: "Consultations", icon: Stethoscope },
  { id: "contacts", label: "Contact Messages", icon: MessageSquare },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "blog", label: "Blog Posts", icon: FileText },
  { id: "services", label: "Services", icon: Briefcase },
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

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [
        consultationsData,
        contactsData,
        appointmentsData,
        blogData,
        servicesData,
        newslettersData,
        jobsData,
      ] = await Promise.all([
        consultationsApi.getAll(),
        contactApi.getAll(),
        appointmentsApi.getAll(),
        blogApi.getAll(),
        servicesApi.getAll(),
        newsletterApi.getAll(),
        jobApplicationsApi.getAll(),
      ]);

      setConsultations(consultationsData);
      setContacts(contactsData);
      setAppointments(appointmentsData);
      setBlogPosts(blogData);
      setServices(servicesData);
      setNewsletters(newslettersData);
      setJobApplications(jobsData);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authApi.signOut();
      navigate("/admin/login");
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
    <div className="min-h-screen bg-muted flex">
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

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen bg-secondary text-secondary-foreground transition-all duration-300 ${sidebarOpen ? "w-64" : "w-0 lg:w-16"
          } overflow-hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b border-secondary-foreground/10">
          {sidebarOpen && (
            <Link to="/" className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="23" stroke="hsl(174, 100%, 40%)" strokeWidth="2" fill="none" />
                <path d="M24 14C24 14 19.5 17.5 19.5 22C19.5 24.8 21 27 23 28.2V32H25V28.2C27 27 28.5 24.8 28.5 22C28.5 17.5 24 14 24 14Z" fill="hsl(174, 100%, 40%)" />
                <circle cx="24" cy="21" r="2.5" fill="white" />
              </svg>
              <span className="text-sm font-bold">
                MIDWAY<span className="text-warm">HEALTH</span>
                <span className="font-normal text-xs ml-0.5 text-secondary-foreground/70">Inc.</span>
              </span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-secondary-foreground/10 transition-colors lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeSection === item.id
                ? "bg-warm/20 text-warm"
                : "text-secondary-foreground/70 hover:bg-secondary-foreground/10 hover:text-secondary-foreground"
                }`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="absolute bottom-4 left-4 right-4 space-y-2">
            <Link to="/">
              <Button variant="ghost" className="w-full text-secondary-foreground hover:bg-secondary-foreground/10 rounded-xl text-sm">
                ← Back to Website
              </Button>
            </Link>
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full text-destructive hover:bg-destructive/10 rounded-xl text-sm gap-2"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </div>
        )}
      </aside>

      {/* Backdrop on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-background border-b border-border px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Menu className="h-5 w-5 text-foreground" />
            </button>
            <h1 className="text-xl font-bold text-foreground capitalize">
              {activeSection === "overview" ? "Dashboard" : sidebarItems.find((i) => i.id === activeSection)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="relative p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setActiveSection("consultations")}
              title="View new notifications"
            >
              <Bell className="h-5 w-5 text-muted-foreground" />
              {newNotifications > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-warm rounded-full" />
              )}
            </button>
            <button
              onClick={handleSignOut}
              className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors"
              title="Sign out"
            >
              A
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">{renderSection()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
