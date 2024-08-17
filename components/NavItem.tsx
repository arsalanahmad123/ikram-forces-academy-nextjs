'use client';
import Link from 'next/link';

interface NavItemProps {
    text: string;
    link: string;
}

const NavItem = ({ text, link }: NavItemProps) => {
    return (
        <Link
            href={link}
            className={`self-stretch my-auto cursor-pointer lg:text-lg text-primary`}
        >
            {text}
        </Link>
    );
};

export default NavItem;
