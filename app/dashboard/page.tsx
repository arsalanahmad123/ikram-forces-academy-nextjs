'use client';
import { useUser, useSession } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { checkUserRole } from '../_utils/userRole';

export default function Dashboard() {
    const { session } = useSession();
    const { user } = useUser();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        if (session) {
            const role = checkUserRole(session);
            setUserRole(role);
        }
    }, [session]);

    return (
        <div className="min-h-screen relative inset-0 flex justify-center items-center">
            <h1 className="text-5xl font-bold">{user?.username}</h1>
        </div>
    );
}
