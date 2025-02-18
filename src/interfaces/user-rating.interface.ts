import mongoose, { Document } from 'mongoose';

export interface IUserRating extends Document {
    rater: mongoose.Types.ObjectId;
    ratedUser: mongoose.Types.ObjectId;
    rating: number;
    comment?: string;
}