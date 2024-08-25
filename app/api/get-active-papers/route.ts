import { NextResponse } from 'next/server';
import connectDB from '@/config/connectDB';
import { Paper } from '@/models/models';

export async function GET() {
    try {
        await connectDB();

        const papers = await Paper.find({ active: true }).lean();
        return NextResponse.json(papers, { status: 200 });
    } catch (error) {
        console.error('Error getting active papers:', error);
        return NextResponse.json(
            { error: 'Error getting active papers' },
            { status: 500 }
        );
    }
}
