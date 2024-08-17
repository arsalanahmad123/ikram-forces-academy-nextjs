import mongoose, { Schema, Document, model, models } from 'mongoose';

interface IQuestion extends Document {
    paperId: mongoose.Schema.Types.ObjectId;
    title: string;
    options: string[];
    correctAnswer: number;
    image?: string;
}

const QuestionSchema: Schema<IQuestion> = new Schema(
    {
        paperId: { type: Schema.Types.ObjectId, ref: 'Paper', required: true },
        title: { type: String, required: true },
        options: {
            type: [String],
            validate: {
                validator: function (v: string[]) {
                    return v.length === 4;
                },
                message: 'There must be exactly 4 options.',
            },
            required: true,
        },
        correctAnswer: {
            type: Number,
            required: true,
            validate: {
                validator: function (index: number) {
                    return index >= 0 && index < 4;
                },
                message: 'Correct answer index must be between 0 and 3.',
            },
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

interface IPaper extends Document {
    title: string;
    description?: string;
    questions: mongoose.Types.ObjectId[];
}

const PaperSchema: Schema<IPaper> = new Schema(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String },
        questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    },
    { timestamps: true }
);

export const Question =
    models.Question || model<IQuestion>('Question', QuestionSchema);
export const Paper = models.Paper || model<IPaper>('Paper', PaperSchema);
