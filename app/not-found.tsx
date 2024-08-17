import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
export default function Page() {
    return (
        <div className="flex justify-center items-center h-screen flex-col gap-8">
            <h2 className="text-5xl font-bold">Look's Like You've Lost</h2>
            <Link href={'/'} className={buttonVariants({ variant: 'default' })}>
                Go to Homepage
            </Link>
        </div>
    );
}
