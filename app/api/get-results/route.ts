import { NextResponse } from 'next/server';
import connectDB from '@/config/connectDB';
import { PaperSubmission } from '@/models/models';
import { unstable_noStore as noStore } from 'next/cache';

export async function POST(request: Request) {
    try {
        noStore();
        await connectDB();
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
