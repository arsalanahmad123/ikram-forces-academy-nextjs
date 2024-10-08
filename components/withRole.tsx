'use client';

import React, { useEffect } from 'react'; // Import React
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const withRole = (
    WrappedComponent: React.ComponentType<any>,
    requiredRole: string
) => {
    const Wrapper: React.FC<any> = (props) => {
        const { user } = useUser();
        const router = useRouter();
        const userRole =
            user?.organizationMemberships[0]?.role === 'org:admin'
                ? 'admin'
                : 'student';

        useEffect(() => {
            if (userRole !== requiredRole) {
                router.back();
            }
        }, [userRole, requiredRole, router]);

        if (userRole !== requiredRole) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withRole;
