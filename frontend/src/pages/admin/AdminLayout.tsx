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
            <div className="flex h-screen w-full bg-slate-50">
                {/* Sidebar */}
                <Sidebar className="w-64 bg-slate-900 text-white shadow-lg">
                    <SidebarContent className="p-6 bg-slate-900 text-white">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">MC</div>
                            <div>
                                <h1 className="text-lg font-semibold">Metmani Admin</h1>
                                <p className="text-xs text-slate-300">Control panel</p>
                            </div>
                        </div>

                        <nav className="space-y-1">
                            {navigationItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className="w-full flex items-center text-left px-3 py-2 rounded-md hover:bg-slate-800 transition gap-3"
                                >
                                    <span className="text-slate-300">{item.icon}</span>
                                    <span className="text-sm">{item.label}</span>
                                </button>
                            ))}
                        </nav>

                        <div className="mt-6 pt-4 border-t border-slate-800">
                            <div className="text-xs text-slate-400">Signed in as</div>
                            <div className="mt-2 text-sm font-medium">{user?.name}</div>
                        </div>
                    </SidebarContent>
                </Sidebar>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Top Bar */}
                    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
                        <div className="flex items-center gap-3">
                            <SidebarTrigger />
                            <h2 className="text-xl font-semibold">Admin Console</h2>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate('/')}
                                className="gap-2"
                            >
                                <Home className="w-4 h-4" />
                                <span className="hidden sm:inline">Back to Site</span>
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        {user?.name}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 overflow-auto p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
