import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import { Quicksand as FontQuicksand } from 'next/font/google';
import { cn } from '@/lib/utils';
import NavBarWrapper from '@/components/NavBarWrapper';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from './contexts/AuthContext';

const fontQuicksand = FontQuicksand({
    subsets: ['latin'],
    variable: '--font-quicksand',
    weight: ['400', '500', '600', '700'],
    preload: true,
});

export const metadata: Metadata = {
    title: 'Ikram Forces Academy',
    description:
        'Join Ikram Forces Academy to prepare for army, navy, and air force exams with expert guidance and trusted study material.',
    icons: {
        icon: '/logo.ico'
    }
};

export const revalidate = 60;

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    'relative min-h-screen bg-background font-sans antialiased flex flex-col ',
                    fontQuicksand.variable
                )}
            >
                <AuthProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <NavBarWrapper />
                        <Toaster />
                        {children}
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
