import apiFetch from '@/lib/api';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'editor' | 'user';
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (token) {
            fetchCurrentUser();
        }
    }, [token]);

    const fetchCurrentUser = async () => {
        try {
            const response = await apiFetch('/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                // Token invalid or expired
                if (response.status === 401 || response.status === 403) {
                    logout();
                }
            }
        } catch (error) {
            console.error('Failed to fetch current user:', error);
            logout();
        }
    };

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await apiFetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            setToken(data.token);
            setUser(data.user);
            localStorage.setItem('adminToken', data.token);
        } catch (error: any) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('adminToken');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
