import { NextResponse } from 'next/server';
import connectDB from '@/config/connectDB';
import { Paper } from '@/models/models';

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const { id } = params;
        const paper = await Paper.findOne({ _id: id }).populate('questions');
        if (!paper) {
            return NextResponse.json(
                { error: 'Paper not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(paper, { status: 200 });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
