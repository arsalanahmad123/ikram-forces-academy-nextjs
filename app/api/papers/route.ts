import { Paper, Question } from '@/models/models';
import connectDB from '@/config/connectDB';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET() {
    try {
        noStore();
        await connectDB();
        const papers = await Paper.find();
        return NextResponse.json(papers, { status: 200 });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        noStore();
        await connectDB();
        const body = await request.json();
        const { title, description, time } = body;
        const paper = await Paper.create({
            title,
            description,
            questions: [],
            time,
        });

        return NextResponse.json(paper, { status: 201 });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        noStore();
        await connectDB();
        const body = await request.json();
        const { id, title, description, time } = body;

        const updatedPaper = await Paper.findByIdAndUpdate(
            id,
            { title, description, time },
            { new: true }
        );

        if (!updatedPaper) {
            return NextResponse.json(
                { error: 'Paper not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedPaper, { status: 200 });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        noStore();
        await connectDB();
        const { paperId } = await request.json();
        // Delete the paper by its ID
        const deletedPaper = await Paper.findByIdAndDelete(paperId);

        if (!deletedPaper) {
            return NextResponse.json(
                { error: 'Paper not found' },
                { status: 404 }
            );
        }

        // Delete all questions related to the paper
        await Question.deleteMany({ paperId: paperId });

        return NextResponse.json(
            { message: 'Paper and related questions deleted successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
