import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sidebar,
    SidebarContent,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AdminAuthContext';
import { FileText, Grid, Home, Image, LogOut, Users, Video } from 'lucide-react';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const navigationItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <Grid className="w-4 h-4" /> },
    { label: 'News', path: '/admin/news', icon: <FileText className="w-4 h-4" /> },
    { label: 'Photos', path: '/admin/photos', icon: <Image className="w-4 h-4" /> },
    { label: 'Videos', path: '/admin/videos', icon: <Video className="w-4 h-4" /> },
    { label: 'Users', path: '/admin/users', icon: <Users className="w-4 h-4" /> },
];

export default function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full bg-background">
                {/* Sidebar */}
                <Sidebar className="w-64 border-r border-border bg-card shadow-lg">
                    <SidebarContent className="p-6">
                        <div className="mb-8 flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                MC
                            </div>
                            <div>
                                <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Metmani Admin
                                </h1>
                                <p className="text-xs text-muted-foreground">Control Panel</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            {navigationItems.map((item) => {
                                const isActive = window.location.pathname === item.path;
                                return (
                                    <button
                                        key={item.path}
                                        onClick={() => navigate(item.path)}
                                        className={`w-full flex items-center text-left px-4 py-3 rounded-lg transition-all duration-200 gap-3 ${
                                            isActive
                                                ? 'bg-primary text-primary-foreground shadow-md'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                    >
                                        <span className={isActive ? 'text-primary-foreground' : ''}>{item.icon}</span>
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </button>
                                );
                            })}
                        </nav>

                        <div className="mt-auto pt-6 border-t border-border">
                            <div className="text-xs text-muted-foreground mb-1">Signed in as</div>
                            <div className="text-sm font-semibold text-foreground">{user?.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">{user?.email}</div>
                        </div>
                    </SidebarContent>
                </Sidebar>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Top Bar */}
                    <header className="flex items-center justify-between p-4 lg:p-6 bg-card border-b border-border shadow-sm">
                        <div className="flex items-center gap-3">
                            <SidebarTrigger />
                            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Admin Console
                            </h2>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate('/')}
                                className="gap-2 hover:bg-primary/10"
                            >
                                <Home className="w-4 h-4" />
                                <span className="hidden sm:inline">Back to Site</span>
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="hidden sm:inline">{user?.name}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 overflow-auto p-4 lg:p-6 bg-background">
                        <Outlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
