import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    MessageSquare,
    Calendar,
    Users,
    Mail,
    LogOut,
    Menu,
    X,
    Stethoscope,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { authApi } from '@/services/api';

const AdminLayout = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = async () => {
        try {
            await authApi.signOut();
            toast({
                title: 'Logged Out',
                description: 'You have been successfully logged out',
            });
            navigate('/admin/login');
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        }
    };

    const navItems = [
        { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/admin/blog', icon: FileText, label: 'Blog Posts' },
        { to: '/admin/services', icon: Stethoscope, label: 'Services' },
        { to: '/admin/contact', icon: MessageSquare, label: 'Contact Messages' },
        { to: '/admin/consultations', icon: Users, label: 'Consultations' },
        { to: '/admin/appointments', icon: Calendar, label: 'Appointments' },
        { to: '/admin/jobs', icon: Briefcase, label: 'Job Applications' },
        { to: '/admin/newsletter', icon: Mail, label: 'Newsletter' },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: sidebarOpen ? 280 : 80 }}
                className="fixed left-0 top-0 h-screen bg-card border-r border-border z-50"
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="h-16 flex items-center justify-between px-4 border-b border-border">
                        {sidebarOpen && (
                            <h1 className="font-bold text-lg text-foreground">Midway Admin</h1>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="ml-auto"
                        >
                            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                    }`
                                }
                            >
                                <item.icon className="h-5 w-5 flex-shrink-0" />
                                {sidebarOpen && <span className="font-medium">{item.label}</span>}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-border">
                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="w-full justify-start gap-3"
                        >
                            <LogOut className="h-5 w-5" />
                            {sidebarOpen && <span>Logout</span>}
                        </Button>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div
                className="transition-all duration-300"
                style={{ marginLeft: sidebarOpen ? 280 : 80 }}
            >
                {/* Top Bar */}
                <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between sticky top-0 z-40">
                    <h2 className="text-xl font-semibold text-foreground">Admin Dashboard</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                            Midway Health Inc.
                        </span>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
