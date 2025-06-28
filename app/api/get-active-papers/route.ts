import { NextResponse } from 'next/server';
import { Paper,IPaper } from '@/models/PaperAndQuestion';
import { PaperSubmission } from '@/models/PaperSubmission';
import { unstable_noStore as noStore } from 'next/cache';
import connectDB from '@/lib/mongodb';
import { getUserFromToken } from '@/lib/auth';
import mongoose from 'mongoose';


type LeanPaper = Omit<IPaper, keyof mongoose.Document> & { _id: string };


export async function GET() {
    try {
        await connectDB();
        noStore();

        const user = await getUserFromToken();
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const papers = (await Paper.find({
            active: true,
        }).lean() as unknown) as LeanPaper[];

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const submissions = await PaperSubmission.find({
            userId: user._id,
            createdAt: { $gte: startOfDay, $lte: endOfDay },
        }).select('paperId');

        const submittedPaperIds = new Set(
            submissions.map((sub) => sub.paperId.toString())
        );

        const papersWithStatus = papers.map((paper) => ({
            ...paper,
            alreadySubmitted: submittedPaperIds.has(paper._id.toString()),
        }));

        return NextResponse.json(papersWithStatus, { status: 200 });
    } catch (error) {
        console.error('Error getting active papers:', error);
        return NextResponse.json(
            { error: 'Error getting active papers' },
            { status: 500 }
        );
    }
}
