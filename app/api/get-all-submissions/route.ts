import { NextResponse } from 'next/server';
import { PaperSubmission } from '@/models/PaperSubmission';
import { unstable_noStore as noStore } from 'next/cache';
import connectDB from '@/lib/mongodb';

export async function GET() {
    try {
        await connectDB()
        noStore();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const submissions = await PaperSubmission.find({
            createdAt: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
            },
        }).populate('paperId');

        return NextResponse.json(submissions, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
