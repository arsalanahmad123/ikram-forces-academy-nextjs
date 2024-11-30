import { NextRequest, NextResponse } from 'next/server';
import { Paper } from '@/models/PaperAndQuestion';
import { PaperSubmission } from '@/models/PaperSubmission';
import { unstable_noStore as noStore } from 'next/cache';
import connectDB from '@/lib/mongodb';

export async function POST(request: NextRequest) {
    try {
        await connectDB()
        noStore();

        // Parse the request body
        const body = await request.json();
        const { userId, paperId, userAnswers, username } = body;

        // Validate data
        if (
            !userId ||
            !paperId ||
            !username ||
            typeof userAnswers !== 'object'
        ) {
            return new Response(JSON.stringify({ message: 'Invalid data' }), {
                status: 400,
            });
        }

        // Fetch the paper and its questions
        const paper = await Paper.findById(paperId).populate('questions');

        if (!paper) {
            return new Response(
                JSON.stringify({ message: 'Paper not found' }),
                { status: 404 }
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
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Less than tomorrow's date
            },
        });

        if (existingSubmission) {
            return new Response(
                JSON.stringify({
                    error: 'You have already submitted this paper today.',
                }),
                { status: 400 }
            );
        }

        // Calculate the score
        let score = 0;
        const questions = paper.questions;

        for (const question of questions) {
            const userAnswer = userAnswers[question._id.toString()];
            if (userAnswer === question.correctAnswer) {
                score++;
            }
        }

        // Create a new PaperSubmission document
        const newSubmission = new PaperSubmission({
            userId,
            username,
            paperId,
            score,
        });

        // Save the document to the database
        await newSubmission.save();

        return NextResponse.json(newSubmission._id, { status: 200 });
    } catch (error) {
        console.error('Error submitting paper:', error);

        // Return error response
        return NextResponse.json(
            { message: 'Failed to submit paper' },
            { status: 500 }
        );
    }
}
