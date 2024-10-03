import { SignIn } from '@clerk/nextjs';

export default function Page() {
    return (
        <div className="min-h-screen flex justify-center items-center py-52 lg:py-20">
            <SignIn />
        </div>
    );
}
