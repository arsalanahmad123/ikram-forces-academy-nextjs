import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User } from '@/models/User';

export async function POST(request: Request) {
    const { email, password, username } = await request.json();

    await connectDB();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return NextResponse.json(
            { message: 'User already exists' },
            { status: 400 }
        );
    }

    const newUser = new User({
        email,
        password, 
        username,
        isVerified: false,
    });


    try {
        const result = await newUser.save();
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error('Error saving user:', error);
        return NextResponse.json(
            { message: 'Failed to create user', error },
            { status: 500 }
        );
    }
}
