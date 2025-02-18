import * as mongoose from 'mongoose';

export interface IUserRatingSchema extends mongoose.Document {
    rater: mongoose.Types.ObjectId;
    ratedUser: mongoose.Types.ObjectId;
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
        ratedUser: {
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

// Add a compound unique index to prevent duplicate ratings from the same rater for a given ratedUser.
UserRatingSchema.index({ ratedUser: 1, rater: 1 }, { unique: true });