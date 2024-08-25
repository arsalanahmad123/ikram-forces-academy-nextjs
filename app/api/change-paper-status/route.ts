import { NextResponse } from 'next/server';
import connectDB from '@/config/connectDB';
import { Paper } from '@/models/models';

export async function PUT(request: Request) {
    try {
        await connectDB();

        const body = await request.json();
        const { paperId } = body;

        const paper = await Paper.findById(paperId);

        if (!paper) {
            return NextResponse.json(
                { error: 'Paper not found' },
                { status: 404 }
            );
        }

        const updatedPaper = await Paper.findByIdAndUpdate(
            paperId,
            { active: !paper.active },
            { new: true }
        );

        return NextResponse.json(updatedPaper);
    } catch (error) {
        return NextResponse.json(
            { error: 'Error updating paper' },
            { status: 500 }
        );
    }
}
