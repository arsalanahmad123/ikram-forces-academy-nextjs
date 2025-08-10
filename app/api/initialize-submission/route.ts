// /api/initialize-submission/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PaperSubmission } from '@/models/PaperSubmission';
import { Paper } from '@/models/PaperAndQuestion';
import { unstable_noStore as noStore } from 'next/cache';
import connectDB from '@/lib/mongodb';

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        noStore();

        // Parse the request body
        const body = await request.json();
        const { userId, paperId, username } = body;

        // Validate data
        if (!userId || !paperId || !username ) {
            return new Response(
                JSON.stringify({ message: 'Missing required fields' }),
                { status: 400 }
            );
        }

        // Check if paper exists and is active
        const paper = await Paper.findById(paperId);
        if (!paper) {
            return new Response(
                JSON.stringify({ message: 'Paper not found' }),
                { status: 404 }
            );
        }

        if (!paper.active) {
            return new Response(
                JSON.stringify({ message: 'Paper is not active' }),
                { status: 400 }
            );
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to the start of the day

        // Check for an existing submission today
        const existingSubmission = await PaperSubmission.findOne({
            userId,
            paperId,
            createdAt: {
                $gte: today, // Greater than or equal to today's date
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
            },
        });

        if (existingSubmission) {
            return new Response(
                JSON.stringify({
                    error: 'You have already started/submitted this paper today.',
                }),
                { status: 400 }
            );
        }

        // Create a new PaperSubmission document with initial state
        const newSubmission = new PaperSubmission({
            userId,
            username,
            paperId,
            userAnswers: {}, // Empty initially
            score: 0, // Will be calculated on completion
        });

        // Save the document to the database
        await newSubmission.save();

        return NextResponse.json(
            {
                submissionId: newSubmission._id.toString(),
                message: 'Submission initialized successfully',
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error initializing submission:', error);
        return NextResponse.json(
            { message: 'Failed to initialize submission' },
            { status: 500 }
        );
    }
}
