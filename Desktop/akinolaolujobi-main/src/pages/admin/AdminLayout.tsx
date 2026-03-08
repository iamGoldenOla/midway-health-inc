import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, FileText, Image, Inbox, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function AdminLayout() {
    const { user, isLoading, signOut } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/secure-portal/login" state={{ from: location }} replace />;
    }

    const navItems = [
        { label: 'Dashboard', href: '/secure-portal', icon: LayoutDashboard },
        { label: 'Blog Posts', href: '/secure-portal/posts', icon: FileText },
        { label: 'Portfolio', href: '/secure-portal/portfolio', icon: Image },
        { label: 'Submissions', href: '/secure-portal/submissions', icon: Inbox },
    ];

    return (
        <div className="min-h-screen bg-muted/30 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-background border-r border-border hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-border">
                    <span className="font-heading font-bold text-lg text-primary">Admin Portal</span>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                to={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-border">
                    <button
                        onClick={signOut}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
                <header className="h-16 bg-background border-b border-border flex items-center px-6 md:hidden">
                    <span className="font-heading font-bold text-lg text-primary">Admin Portal</span>
                </header>
                <div className="flex-1 overflow-auto p-6 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
