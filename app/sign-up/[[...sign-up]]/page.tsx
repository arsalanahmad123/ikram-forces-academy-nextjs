import { SignUp } from '@clerk/nextjs';

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center py-52 lg:py-20">
            <SignUp />
        </div>
    );
}
