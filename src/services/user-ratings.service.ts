import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { IUserRatingUpdate } from 'src/interfaces/user-rating-update.interface';
import { IUserRating } from 'src/interfaces/user-rating.interface';

@Injectable()
export class UserRatingsService {
    constructor(
        @InjectModel('User Rating') private readonly userRatingModel: Model<IUserRating>
    ) { }

    public async createUserRating(userRating: IUserRating): Promise<IUserRating> {
        try {
            const userRatingModel = new this.userRatingModel(userRating);
            return await userRatingModel.save();
        } catch (error: any) {
            // MongoDB duplicate key error code
            if (error.code === 11000) {
                throw new ForbiddenException('You have already rated this user. Use the update endpoint to modify your rating.');
            }
            throw error;
        }
    }

    public async updateUserRating(ratingId: string, raterId: string, userRating: IUserRatingUpdate): Promise<IUserRating> {
        const updatedRating = await this.userRatingModel.findOneAndUpdate(
            { _id: new Types.ObjectId(ratingId), rater: new Types.ObjectId(raterId) },
            { $set: userRating },
            { new: true }
        ).exec();
        
        if (!updatedRating) {
            throw new NotFoundException('Rating not found or you are not the owner');
        }

        return updatedRating;
    }

    public async removeUserRating(ratingId: string, raterId: string): Promise<{ system_message: string }> {
        const deletedRating = await this.userRatingModel.findOneAndDelete({
            _id: new Types.ObjectId(ratingId),
            rater: new Types.ObjectId(raterId),
        }).exec();

        if (!deletedRating) {
            throw new NotFoundException('Rating not found or you are not the owner');
        }

        return { system_message: 'Rating removed successfully' };
    }

    // Retrieve all ratings for a given user (the rated user)
    public async getUserRatings(ratedUserId: string): Promise<IUserRating[]> {
        return this.userRatingModel
            .find({ rated_user: new Types.ObjectId(ratedUserId) })
            .exec();
    }
}