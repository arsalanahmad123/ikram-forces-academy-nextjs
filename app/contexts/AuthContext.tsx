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
    logout: () => Promise<void>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: React.Dispatch<React.SetStateAction<SafeUser | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<SafeUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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
        <AuthContext.Provider
            value={{ user, logout, loading, setLoading, setUser }}
        >
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
