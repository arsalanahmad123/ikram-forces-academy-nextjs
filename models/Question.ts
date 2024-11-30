import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
    paperId: mongoose.Schema.Types.ObjectId;
    title: string;
    options: string[];
    correctAnswer: number;
    image?: string;
}

const questionSchema: Schema<IQuestion> = new Schema(
    {
        paperId: { type: Schema.Types.ObjectId, ref: 'Paper', required: true },
        title: { type: String, required: true },
        options: { type: [String], required: true },
        correctAnswer: { type: Number, required: true },
        image: { type: String },
    },
    { timestamps: true }
);

export const Question =
    mongoose.models.Question ||
    mongoose.model<IQuestion>('Question', questionSchema);

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
mongoose.models.Question ||
    mongoose.model<IQuestion>('Question', questionSchema);
