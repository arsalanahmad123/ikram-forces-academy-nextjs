'use client';
import NavItem from './NavItem';
import { Button } from './ui/button';
import Image from 'next/image';
import ThemeToggle from '@/components/ThemeToggle';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
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

import { SignedIn, UserButton } from '@clerk/nextjs';

const navList = [
    {
        text: 'Home',
        link: '/#home',
    },
    {
        text: 'About',
        link: '/#about',
    },
    {
        text: 'Cadet Coaching',
        link: '/#cadetcoaching',
    },
    {
        text: 'Academic Tutoring',
        link: '/#tutoring',
    },
    {
        text: 'Kids Coding',
        link: '/#kids-coding',
    },
];

export default function NavBar() {
    const router = useRouter();
    const handleDashboardRedirect = () => {
        router.push('/dashboard');
    };

    const { isSignedIn, user } = useUser();

    return (
        <nav className="py-5 bg-white/55 dark:bg-gray-950/55 backdrop-blur-md w-full flex justify-between items-center lg:px-20 px-10 fixed top-0 z-50 ">
            <Link href={'/'}>
                <Image src={'/logo.svg'} alt="Logo" width={100} height={100} />
            </Link>
            <ul className="flex-row justify-center items-center gap-x-10 hidden xl:flex">
                {navList.map((list, i) => (
                    <NavItem key={i} text={list.text} link={list.link} />
                ))}
                <ThemeToggle />
                <Button
                    onClick={handleDashboardRedirect}
                    className="font-semibold lg:ml-10"
                >
                    {isSignedIn ? 'Dashboard' : 'Student Portal'}
                </Button>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </ul>
            <div className="xl:hidden block ">
                <Sheet>
                    <SheetTrigger asChild>
                        <Menu className="hover:cursor-pointer" size={30} />
                    </SheetTrigger>
                    <SheetContent className="py-10">
                        <div
                            aria-hidden="true"
                            className="absolute dark:block hidden inset-x-0 top-0 -right-96 -z-10 transform-gpu overflow-hidden blur-3xl"
                        >
                            <div
                                style={{
                                    clipPath:
                                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                }}
                                className="relative left-[calc(80%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            />
                        </div>
                        <SheetHeader>
                            <SheetTitle className="text-2xl font-bold uppercase">
                                Menu
                            </SheetTitle>
                            <SheetDescription>
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
                            <Button
                                onClick={handleDashboardRedirect}
                                className="font-semibold "
                            >
                                Student Portal
                            </Button>
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
