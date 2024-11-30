import mongoose, { Schema, Document, Model } from 'mongoose';
import { hash, compare } from 'bcryptjs';

// Define the base user interface
export interface User {
    username: string;
    email: string;
    isVerified: boolean;
    status: boolean;
    password: string;
}

// Interface for user methods
interface UserMethods {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// Combine User and Document for Mongoose documents
export interface UserDocument extends User, Document, UserMethods {}

// Define the schema
const userSchema = new Schema<UserDocument>(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        isVerified: { type: Boolean, default: false },
        status: { type: Boolean, default: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

// Middleware for password hashing
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await hash(this.password, 10);
    next();
});

// Method for comparing passwords
userSchema.methods.comparePassword = async function (
    candidatePassword: string
) {
    return compare(candidatePassword, this.password);
};

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });

// Add a fallback for existing model or create a new one
const UserModel: Model<UserDocument> =
    mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);

export { UserModel as User };


export interface SafeUser {
    id: string
    username: string,
    email: string,
    isVerified: boolean,
    status: boolean,
    password: string
};