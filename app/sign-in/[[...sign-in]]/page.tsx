import { SignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function Page() {
    redirect('/');
    return (
        <div className="min-h-screen flex justify-center items-center py-52 lg:py-20">
            <SignIn />
        </div>
    );
}
