'use client';

import { usePathname } from 'next/navigation';
import NavBar from './Navbar';

export default function NavBarWrapper() {
    const path = usePathname();
    const isPaperpath = path.startsWith('/dashboard/solve-paper/');

    if (isPaperpath) return null;

    return <NavBar />;
}
