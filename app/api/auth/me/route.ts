import { NextResponse } from 'next/server';
import { User } from '@/models/User';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET() {
    const token =(await cookies()).get('authToken')?.value;

    if (!token) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 }
        );
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET!) as {
            userId: string;
        };
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            user: {
                id: user._id,
                email: user.email,
                name: user.username,
                isVerified: user.isVerified,
                status: user.status,
            },
        });
    } catch (error) {
        console.error('Session verification error:', error);
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}
