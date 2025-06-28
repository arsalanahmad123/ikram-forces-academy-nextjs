import mongoose,{Document} from 'mongoose';

// Question Model
const questionSchema = new mongoose.Schema(
    {
        paperId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Paper',
            required: true,
        },
        title: { type: String, required: true },
        options: { type: [String], required: true },
        correctAnswer: { type: Number, required: true },
        image: { type: String },
    },
    { timestamps: true }
);

const paperSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String },
        questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
        time: { type: Number, required: true },
        active: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export function registerModels() {
    if (!mongoose.models.Question) {
        mongoose.model('Question', questionSchema);
    }
    if (!mongoose.models.Paper) {
        mongoose.model('Paper', paperSchema);
    }
}

export const Question =
    mongoose.models.Question || mongoose.model('Question', questionSchema);
export const Paper =
    mongoose.models.Paper || mongoose.model('Paper', paperSchema);

export interface IQuestion extends Document {
    paperId: mongoose.Types.ObjectId;
    title: string;
    options: string[];
    correctAnswer: number;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPaper extends Document {
    title: string;
    description?: string;
    questions: mongoose.Types.ObjectId[];
    time: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
