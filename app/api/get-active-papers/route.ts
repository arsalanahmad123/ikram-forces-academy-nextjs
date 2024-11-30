import { NextResponse } from 'next/server';
import { Paper } from '@/models/PaperAndQuestion';
import { unstable_noStore as noStore } from 'next/cache';
import connectDB from '@/lib/mongodb';

export async function GET() {
    try {
        await connectDB();
        noStore();

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
