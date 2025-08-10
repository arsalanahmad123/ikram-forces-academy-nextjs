// /api/submit-paper/route.ts (Corrected version)
import { NextRequest, NextResponse } from 'next/server';
import { Paper } from '@/models/PaperAndQuestion';
import { PaperSubmission } from '@/models/PaperSubmission';
import { unstable_noStore as noStore } from 'next/cache';
import connectDB from '@/lib/mongodb';

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        noStore();

        // Parse the request body
        const body = await request.json();
        const { userId, paperId, userAnswers, username, submissionId } = body;

        // Validate data
        if (
            !userId ||
            !paperId ||
            !username ||
            !submissionId ||
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

        // Find the existing submission by submissionId
        const existingSubmission = await PaperSubmission.findById(submissionId);
        if (!existingSubmission) {
            return new Response(
                JSON.stringify({ message: 'Submission not found' }),
                { status: 404 }
            );
        }

        // Verify the submission belongs to the correct user and paper
        if (
            existingSubmission.userId.toString() !== userId ||
            existingSubmission.paperId.toString() !== paperId
        ) {
            return new Response(
                JSON.stringify({
                    message: 'Unauthorized access to submission',
                }),
                { status: 403 }
            );
        }


        // Calculate the score
        let score = 0;
        const questions = paper.questions;
        for (const question of questions) {
            const userAnswer = userAnswers[question._id.toString()];
            if (
                userAnswer !== undefined &&
                userAnswer === question.correctAnswer
            ) {
                score++;
            }
        }

        // Update the existing submission
        existingSubmission.userAnswers = userAnswers;
        existingSubmission.score = score;

        // Save the updated document to the database
        await existingSubmission.save();

        return NextResponse.json(existingSubmission._id, { status: 200 });
    } catch (error) {
        console.error('Error submitting paper:', error);
        // Return error response
        return NextResponse.json(
            { message: 'Failed to submit paper' },
            { status: 500 }
        );
    }
}
