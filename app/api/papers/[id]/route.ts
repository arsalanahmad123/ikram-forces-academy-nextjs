import { NextRequest, NextResponse } from 'next/server';
import { Paper } from '@/models/PaperAndQuestion';
// import { Question } from '@/models/Question';
import { unstable_noStore as noStore } from 'next/cache';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        noStore();

        const id = (await params).id 

        const PaperModel =
            mongoose.models.Paper || mongoose.model('Paper', Paper.schema);

        const paper = await PaperModel.findOne({ _id: id }).populate(
            'questions'
        );

        if (!paper) {
            return NextResponse.json(
                { error: 'Paper not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(paper, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
