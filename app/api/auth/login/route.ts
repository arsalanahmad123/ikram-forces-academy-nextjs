import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { User,SafeUser } from '@/models/User';
import connectToDatabase from '@/lib/mongodb';
import { sign } from 'jsonwebtoken';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        await connectToDatabase();

        const user: SafeUser | null = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password.' },
                { status: 401 }
            );
        }

        if (!user.isVerified || !user.status) {
            return NextResponse.json(
                {
                    error: 'Please contact the administration, you are currently unauthorized!',
                },
                { status: 403 }
            );
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid email or password.' },
                { status: 401 }
            );
        }

        const token = sign({ userId: user.id }, process.env.JWT_SECRET!, {
            expiresIn: '1d',
        });

        const safeUser = {
            _id: user.id,
            username: user.username,
            email: user.email,
            isVerified: user.isVerified,
            status: user.status,
        };

        const response = NextResponse.json({ user: safeUser });

        response.cookies.set('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60,
            path: '/',
        });

        return response;
    } catch (err) {
        console.error('Server error:', err);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}
