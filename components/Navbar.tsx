'use client';

import NavItem from './NavItem';
import { Button } from './ui/button';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import { Menu } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';

const navList = [
    { text: 'Home', link: '/#home' },
    { text: 'About', link: '/#about' },
    { text: 'Cadet Coaching', link: '/#cadetcoaching' },
    { text: 'Academic Tutoring', link: '/#tutoring' },
    { text: 'Kids Coding', link: '/#kids-coding' },
];

export default function NavBar() {
    const {user,logout } = useAuth();

    

    return (
        <nav className="py-1 bg-white/55 dark:bg-gray-950 backdrop-blur-md w-full flex justify-between items-center lg:px-10 px-5 fixed top-0 z-50 border-b">
            <Link
                href={'/'}
                className="dark:bg-white object-fit rounded-full md:block hidden"
            >
                <Image src={'/logo.png'} alt="Logo" width={120} height={100} property='priority' />
            </Link>
            <Link
                href={'/'}
                className="dark:bg-white object-fit rounded-full md:hidden block"
            >
                <Image src={'/logo.png'} alt="Logo" width={80} height={40} />
            </Link>

            <ul className="flex-row justify-center items-center gap-x-10 hidden xl:flex">
                {navList.map((list, i) => (
                    <NavItem key={i} text={list.text} link={list.link} />
                ))}

                <ThemeToggle />

                <Link
                    href={'/dashboard'}
                    className="font-semibold lg:ml-10"
                >
                    {user ? 'Dashboard' : 'Student Portal'}
                </Link>

                {user && (
                    <Button
                        onClick={logout}
                        className="font-semibold lg:ml-10"
                    >
                        Sign Out
                    </Button>
                )}
            </ul>

            <div className="xl:hidden flex justify-between items-center gap-10">
                <Sheet>
                    <SheetTrigger asChild>
                        <Menu className="hover:cursor-pointer" size={30} />
                    </SheetTrigger>

                    <SheetContent className="py-10 md:w-full md:max-w-sm mx-auto w-[200px]">
                        <div
                            aria-hidden="true"
                            className="absolute dark:block hidden inset-x-0 top-0 -right-96 -z-10 transform-gpu overflow-hidden blur-3xl"
                        >
                            <div
                                style={{
                                    clipPath:
                                        'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                                }}
                                className="relative left-[calc(50%-15rem)] aspect-[1155/678] w-full max-w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                            />
                        </div>

                        <SheetHeader>
                            <SheetTitle className="text-2xl font-bold uppercase">
                                Menu
                            </SheetTitle>
                            <SheetDescription className="flex flex-col gap-5 z-50">
                                Navigate through sections here
                            </SheetDescription>
                        </SheetHeader>

                        <div className="grid gap-6 py-4 mt-10">
                            {navList.map((list, i) => (
                                <div className="w-full" key={i}>
                                    <NavItem
                                        text={list.text}
                                        link={list.link}
                                    />
                                </div>
                            ))}

                            <ThemeToggle />

                            <Link
                                href={'/dashboard'}
                                className="font-semibold"
                            >
                                {user ? 'Dashboard' : 'Student Portal'}
                            </Link>

                            {user && (
                                <Button
                                    onClick={logout}
                                    className="font-semibold"
                                >
                                    Sign Out
                                </Button>
                            )}
                        </div>

                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">Close Menu</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
}
