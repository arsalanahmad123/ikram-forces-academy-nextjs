import { NextResponse } from 'next/server';
import connectDB from '@/config/connectDB';
import { PaperSubmission } from '@/models/models';

export async function GET() {
    try {
        await connectDB();
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
