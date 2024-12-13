'use client';

import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
    const { user } = useAuth();

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
            <div className="bg-white shadow rounded-lg p-6">
                <p>
                    <strong>Name:</strong> {user?.name}
                </p>
                <p>
                    <strong>Email:</strong> {user?.email}
                </p>
            </div>
        </div>
    );
}
