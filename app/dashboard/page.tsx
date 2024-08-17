'use client';
import { useUser } from '@clerk/nextjs';

export default function Dashboard() {
    const { user } = useUser();

    return (
        <div className="min-h-screen relative inset-0 flex justify-center items-center">
            <h1 className="text-5xl font-bold">{user?.username}</h1>
        </div>
    );
}
