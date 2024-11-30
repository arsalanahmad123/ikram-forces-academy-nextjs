import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IPaperSubmission extends Document {
    score: number;
    userId: mongoose.Schema.Types.ObjectId;
    username: string;
    paperId: mongoose.Schema.Types.ObjectId;
}

const paperSubmissionSchema: Schema<IPaperSubmission> = new Schema(
    {
        score: { type: Number, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        username: { type: String, required: true },
        paperId: { type: Schema.Types.ObjectId, ref: 'Paper', required: true },
    },
    { timestamps: true }
);

export const PaperSubmission =
    models.PaperSubmission ||
    model<IPaperSubmission>('PaperSubmission', paperSubmissionSchema);
