import { Document } from 'mongoose';

export interface IUserRatingUpdate extends Document {
    rating?: number;
    comment?: string;
}