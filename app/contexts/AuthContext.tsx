'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SafeUser {
    id: string;
    name: string;
    email: string;
    isVerified: boolean;
    status: boolean;
}

type AuthContextType = {
    user: SafeUser | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<SafeUser | null>(null);
    const [loading, setLoading] = useState(true);

    

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Login failed.');
            }

            const userData = await res.json();
            setUser(userData.user);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };

     useEffect(() => {
         async function checkSession() {
             try {
                 const res = await fetch('/api/auth/me');
                 if (res.ok) {
                     const data = await res.json();
                     setUser(data.user);
                 }
             } catch (error) {
                 console.error('Failed to check session:', error);
             } finally {
                 setLoading(false);
             }
         }

         checkSession();
     }, []);

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/auth/logout', { method: 'POST' });
            if (res.ok) {
                setUser(null);
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
