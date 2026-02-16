import { useAuth } from '@/contexts/AdminAuthContext';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export const AdminRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (!isAuthenticated || !user || (user.role !== 'admin' && user.role !== 'editor')) {
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
};

export const AdminOnlyRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (!isAuthenticated || user?.role !== 'admin') {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <>{children}</>;
};
