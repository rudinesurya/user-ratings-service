import * as mongoose from 'mongoose';

export interface IUserRatingSchema extends mongoose.Document {
    rater: mongoose.Types.ObjectId;
    rated_user: mongoose.Types.ObjectId;
    rating: number;
    comment?: string;
}

export const UserRatingSchema = new mongoose.Schema<IUserRatingSchema>(
    {
        rater: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Adjust the ref as needed
            required: true,
        },
        rated_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Adjust the ref as needed
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        comment: {
            type: String,
        },
    }
);

// Add a compound unique index to prevent duplicate ratings from the same rater for a given rated_user.
UserRatingSchema.index({ rated_user: 1, rater: 1 }, { unique: true });