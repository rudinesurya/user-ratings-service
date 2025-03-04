import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserRatingsService } from './services/user-ratings.service';
import logger from '@rudinesurya/logger';
import { IUserRatingsSearchResponse, IUserRating, IUserRatingCreateResponse, IUserRatingUpdate, IUserRatingUpdateResponse, IUserRatingDeleteResponse } from '@rudinesurya/user-ratings-service-interfaces';

@Controller('user_ratings')
export class UserRatingsController {
    constructor(
        private readonly userRatingsService: UserRatingsService,
    ) { }

    @MessagePattern('user_ratings_get_by_rated_user_id')
    public async getUserRatingsByRatedUserId(params: { ratedUserId: string; }): Promise<IUserRatingsSearchResponse> {
        logger.info(`Received request to getUserRatingsByRatedUserId for ID: ${params?.ratedUserId}`);

        if (!params?.ratedUserId) {
            logger.warn(`Missing ratedUserId in request`);
            return {
                status: HttpStatus.BAD_REQUEST,
                system_message: 'user_ratings_get_by_rated_user_id_bad_request',
                user_ratings: null,
                errors: null,
            };
        }

        const userRatings = await this.userRatingsService.getUserRatings(params.ratedUserId);
        logger.info(`User ratings retrieved successfully`);

        return {
            status: HttpStatus.OK,
            system_message: 'user_ratings_get_by_rated_user_id_success',
            user_ratings: userRatings,
            errors: null,
        };
    }

    @MessagePattern('user_rating_create')
    public async createUserRating(params: { createData: IUserRating }): Promise<IUserRatingCreateResponse> {
        logger.info(`Received request to createUserRating`);

        if (!params?.createData) {
            logger.warn(`Missing createData in request`);
            return {
                status: HttpStatus.BAD_REQUEST,
                system_message: 'user_rating_create_bad_request',
                user_rating: null,
                errors: null,
            };
        }

        try {
            const userRating = await this.userRatingsService.createUserRating(params.createData);
            logger.info(`User rating created successfully`);

            return {
                status: HttpStatus.CREATED,
                system_message: 'user_rating_create_success',
                user_rating: userRating,
                errors: null,
            };
        } catch (error) {
            logger.error(`Error creating user rating`, { error: error.message, stack: error.stack });

            return {
                status: HttpStatus.PRECONDITION_FAILED,
                system_message: 'user_rating_create_precondition_failed',
                user_rating: null,
                errors: error.errors,
            };
        }
    }

    @MessagePattern('user_rating_update')
    public async updateUserRating(params: { ratingId: string; raterId: string; updateData: IUserRatingUpdate }): Promise<IUserRatingUpdateResponse> {
        logger.info(`Received request to updateUserRating for ID: ${params?.ratingId}`);

        if (!params?.ratingId || !params?.raterId || !params?.updateData) {
            logger.warn(`Missing ratingId, raterId, or updateData in request`);
            return {
                status: HttpStatus.BAD_REQUEST,
                system_message: 'user_rating_update_bad_request',
                user_rating: null,
                errors: null,
            };
        }

        try {
            const updatedUserRating = await this.userRatingsService.updateUserRating(params.ratingId, params.raterId, params.updateData);
            logger.info(`User rating updated successfully`);

            return {
                status: HttpStatus.OK,
                system_message: 'user_rating_update_success',
                user_rating: updatedUserRating,
                errors: null,
            };
        } catch (error) {
            logger.error(`Error updating user rating`, { error: error.message, stack: error.stack });

            return {
                status: HttpStatus.PRECONDITION_FAILED,
                system_message: 'user_rating_update_precondition_failed',
                user_rating: null,
                errors: error.errors,
            };
        }
    }

    @MessagePattern('user_rating_delete_by_id')
    public async deleteUserRating(params: { ratingId: string; raterId: string; }): Promise<IUserRatingDeleteResponse> {
        logger.info(`Received request to deleteUserRating for ID: ${params?.ratingId}`);

        if (!params?.ratingId || !params?.raterId) {
            logger.warn(`Missing ratingId or raterId in request`);
            return {
                status: HttpStatus.BAD_REQUEST,
                system_message: 'user_rating_delete_by_id_bad_request',
                errors: null,
            };
        }

        try {
            await this.userRatingsService.removeUserRating(params.ratingId, params.raterId);
            logger.info(`User rating deleted successfully`);

            return {
                status: HttpStatus.OK,
                system_message: 'user_rating_delete_by_id_success',
                errors: null,
            };
        } catch (error) {
            logger.error(`Error deleting user rating`, { error: error.message, stack: error.stack });

            return {
                status: HttpStatus.PRECONDITION_FAILED,
                system_message: 'user_rating_delete_by_id_precondition_failed',
                errors: error.errors,
            };
        }
    }
}