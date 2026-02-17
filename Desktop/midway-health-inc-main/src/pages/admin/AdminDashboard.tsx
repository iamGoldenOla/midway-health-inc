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
  X,
  Bell,
  Search,
  TrendingUp,
  Clock,
  Loader2,
  Eye,
  Phone,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  blogApi,
  servicesApi,
  contactApi,
  consultationsApi,
  appointmentsApi,
  jobApplicationsApi,
  newsletterApi,
} from "@/services/api";

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

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Real data state
  const [consultations, setConsultations] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [jobApplications, setJobApplications] = useState<any[]>([]);

  // Load data on mount
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
            <div className="space-y-3">
              {consultations.slice(0, 3).map((c) => (
                <div key={c.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{c.full_name}</p>
                    <p className="text-xs text-muted-foreground">{c.care_type}</p>
                  </div>
                  {statusBadge(c.status)}
                </div>
              ))}
              {consultations.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No consultations yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" /> Recent Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contacts.slice(0, 3).map((c) => (
                <div key={c.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.email}</p>
                  </div>
                  {statusBadge(c.status)}
                </div>
              ))}
              {contacts.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No messages yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderDetailDialog = () => {
    if (!selectedItem) return null;

    // Render different content based on section
    if (activeSection === "consultations") {
      return (
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Consultation Request Details</DialogTitle>
            <DialogDescription>Full information about this consultation request</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Full Name</label>
                <p className="text-base font-medium mt-1">{selectedItem.full_name}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Age</label>
                <p className="text-base font-medium mt-1">{selectedItem.age || "Not provided"}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Phone</label>
                <p className="text-base font-medium mt-1 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {selectedItem.phone}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Email</label>
                <p className="text-base font-medium mt-1 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {selectedItem.email}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Care Type</label>
                <p className="text-base font-medium mt-1">{selectedItem.care_type}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Urgency</label>
                <p className="text-base font-medium mt-1">{selectedItem.urgency}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Preferred Contact</label>
                <p className="text-base font-medium mt-1 capitalize">{selectedItem.preferred_contact}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Status</label>
                <div className="mt-1">{statusBadge(selectedItem.status)}</div>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground">Description</label>
              <p className="text-base mt-2 p-4 bg-muted rounded-lg leading-relaxed">{selectedItem.description}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground">Submitted</label>
              <p className="text-base font-medium mt-1">{new Date(selectedItem.created_at).toLocaleString()}</p>
            </div>
          </div>
        </DialogContent>
      );
    }

    if (activeSection === "appointments") {
      return (
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Appointment Details</DialogTitle>
            <DialogDescription>Full information about this appointment booking</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Full Name</label>
                <p className="text-base font-medium mt-1">{selectedItem.name}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Phone</label>
                <p className="text-base font-medium mt-1 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {selectedItem.phone}
                </p>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-semibold text-muted-foreground">Email</label>
                <p className="text-base font-medium mt-1 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {selectedItem.email}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Preferred Date</label>
                <p className="text-base font-medium mt-1">
                  {selectedItem.preferred_date ? new Date(selectedItem.preferred_date).toLocaleDateString() : "Not specified"}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Service Requested</label>
                <p className="text-base font-medium mt-1">{selectedItem.service_requested || "Not specified"}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Status</label>
                <div className="mt-1">{statusBadge(selectedItem.status)}</div>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground">Message / Reason</label>
              <p className="text-base mt-2 p-4 bg-muted rounded-lg leading-relaxed whitespace-pre-wrap">
                {selectedItem.message || "No message provided"}
              </p>
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground">Submitted</label>
              <p className="text-base font-medium mt-1">{new Date(selectedItem.created_at).toLocaleString()}</p>
            </div>
          </div>
        </DialogContent>
      );
    }

    // Generic view for other types
    return (
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {Object.entries(selectedItem).map(([key, value]) => (
            <div key={key}>
              <label className="text-sm font-semibold text-muted-foreground capitalize">
                {key.replace(/_/g, " ")}
              </label>
              <p className="text-base font-medium mt-1">{String(value)}</p>
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
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9 w-56 rounded-xl" />
          </div>
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
                    No data yet
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    {fields.map((field) => (
                      <td key={field} className="py-3 px-4 text-sm text-foreground">
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

  const renderSection = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    switch (activeSection) {
      case "overview":
        return renderOverview();
      case "consultations":
        return renderTable(
          "Consultation Requests",
          ["Name", "Care Type", "Urgency", "Status", "Date"],
          consultations,
          ["full_name", "care_type", "urgency", "status", "created_at"]
        );
      case "contacts":
        return renderTable(
          "Contact Messages",
          ["Name", "Email", "Message", "Status", "Date"],
          contacts,
          ["name", "email", "message", "status", "created_at"]
        );
      case "appointments":
        return renderTable(
          "Appointments",
          ["Name", "Email", "Phone", "Status", "Date"],
          appointments,
          ["full_name", "email", "phone", "status", "created_at"]
        );
      case "blog":
        return renderTable(
          "Blog Posts",
          ["Title", "Slug", "Date"],
          blogPosts,
          ["title", "slug", "created_at"]
        );
      case "services":
        return renderTable(
          "Services",
          ["Title", "Slug", "Icon"],
          services,
          ["title", "slug", "icon"]
        );
      case "newsletters":
        return renderTable(
          "Newsletter Subscribers",
          ["Email", "Date"],
          newsletters,
          ["email", "created_at"]
        );
      case "careers":
        return renderTable(
          "Job Applications",
          ["Name", "Email", "Position", "Status", "Date"],
          jobApplications,
          ["full_name", "email", "position", "status", "created_at"]
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-muted flex">
      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        {renderDetailDialog()}
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
          <div className="absolute bottom-4 left-4 right-4">
            <Link to="/">
              <Button variant="ghost" className="w-full text-secondary-foreground hover:bg-secondary-foreground/10 rounded-xl text-sm">
                ← Back to Website
              </Button>
            </Link>
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
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="h-5 w-5 text-muted-foreground" />
              {(consultations.filter((c) => c.status === "New").length +
                contacts.filter((c) => c.status === "New").length +
                appointments.filter((a) => a.status === "New").length) > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-warm rounded-full" />
                )}
            </button>
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">{renderSection()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
