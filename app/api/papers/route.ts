import { Paper } from '@/models/PaperAndQuestion';
import { Question } from '@/models/PaperAndQuestion';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';
import connectDB from '@/lib/mongodb';

// GET: Fetch all papers
export async function GET() {
    try {
        await connectDB()
        noStore();
        const papers = await Paper.find();
        return NextResponse.json(papers, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Error fetching papers:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST: Create a new paper
export async function POST(request: Request) {
    try {
        await connectDB()
        noStore();
        const body = await request.json();
        const { title, description, time } = body;

        if (!title || !time) {
            return NextResponse.json(
                { error: 'Title and time are required' },
                { status: 400 }
            );
        }

        const paper = await Paper.create({
            title,
            description,
            questions: [],
            time,
        });

        return NextResponse.json(paper, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Error creating paper:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT: Update an existing paper
export async function PUT(request: Request) {
    try {
        await connectDB()
        noStore();
        const body = await request.json();
        const { id, title, description, time } = body;

        if (!id || !title || !time) {
            return NextResponse.json(
                { error: 'ID, title, and time are required' },
                { status: 400 }
            );
        }

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Error updating paper:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE: Delete a paper and its related questions
export async function DELETE(request: Request) {
    try {
        await connectDB()
        noStore();
        const body = await request.json();
        const { paperId } = body;

        if (!paperId) {
            return NextResponse.json(
                { error: 'Paper ID is required' },
                { status: 400 }
            );
        }

        const deletedPaper = await Paper.findByIdAndDelete(paperId);

        if (!deletedPaper) {
            return NextResponse.json(
                { error: 'Paper not found' },
                { status: 404 }
            );
        }

        await Question.deleteMany({ paperId: paperId });

        return NextResponse.json(
            { message: 'Paper and related questions deleted successfully' },
            { status: 200 }
        );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Error deleting paper:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
