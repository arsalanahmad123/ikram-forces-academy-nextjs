import { NextResponse } from 'next/server';
import { PaperSubmission } from '@/models/PaperSubmission';
import { unstable_noStore as noStore } from 'next/cache';
import connectDB from '@/lib/mongodb';

export async function POST(request: Request) {
    try {
        await connectDB()
        noStore();
        const body = await request.json();
        const { id } = body;
        const submission = await PaperSubmission.findById(id).populate(
            'paperId'
        );

        if (!submission) {
            return NextResponse.json(
                { error: 'No submission found' },
                { status: 400 }
            );
        }

        return NextResponse.json(submission, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
