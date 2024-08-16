'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavContextType {
    activeLink: string;
    setActiveLink: (link: string) => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export const NavProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [activeLink, setActiveLink] = useState<string>('');

    return (
        <NavContext.Provider value={{ activeLink, setActiveLink }}>
            {children}
        </NavContext.Provider>
    );
};

export const useNavContext = () => {
    const context = useContext(NavContext);
    if (context === undefined) {
        throw new Error('useNavContext must be used within a NavProvider');
    }
    return context;
};
