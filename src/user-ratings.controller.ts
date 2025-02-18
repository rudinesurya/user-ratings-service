import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { MessagePattern, ClientProxy } from '@nestjs/microservices';
import { UserRatingsService } from './services/user-ratings.service';
import { IUserRatingsSearchResponse } from './interfaces/user-ratings-search-response.interface';
import { IUserRatingCreateResponse } from './interfaces/user-rating-create-response.interface';
import { IUserRating } from './interfaces/user-rating.interface';
import { IUserRatingUpdateResponse } from './interfaces/user-rating-update-response.interface';
import { IUserRatingUpdate } from './interfaces/user-rating-update.interface';
import { IUserRatingsDeleteResponse } from './interfaces/user-ratings-delete-response.interface';

@Controller('user_ratings')
export class UserRatingsController {
    constructor(
        private readonly userRatingsService: UserRatingsService,
    ) { }

    @MessagePattern('user_ratings_get_by_rated_user_id')
    public async getUserRatingsByRatedUserId(ratedUserId: string): Promise<IUserRatingsSearchResponse> {
        let result: IUserRatingsSearchResponse;

        if (ratedUserId) {
            const userRatings = await this.userRatingsService.getUserRatings(ratedUserId);
            result = {
                status: HttpStatus.OK,
                message: 'user_ratings_get_by_rated_user_id_success',
                user_ratings: userRatings,
            };
        } else {
            result = {
                status: HttpStatus.BAD_REQUEST,
                message: 'user_ratings_get_by_rated_user_id_bad_request',
                user_ratings: null,
            };
        }

        return result;
    }

    @MessagePattern('user_rating_create')
    public async createUserRating(userRatingParams: IUserRating): Promise<IUserRatingCreateResponse> {
        let result: IUserRatingCreateResponse;

        if (userRatingParams) {
            try {
                const userRating = await this.userRatingsService.createUserRating(userRatingParams);
                result = {
                    status: HttpStatus.CREATED,
                    message: 'user_rating_create_success',
                    user_rating: userRating,
                    errors: null,
                };
            } catch (e) {
                result = {
                    status: HttpStatus.PRECONDITION_FAILED,
                    message: 'user_rating_create_precondition_failed',
                    user_rating: null,
                    errors: e.errors,
                };
            }

        } else {
            result = {
                status: HttpStatus.BAD_REQUEST,
                message: 'user_rating_create_bad_request',
                user_rating: null,
                errors: null,
            };
        }

        return result;
    }

    @MessagePattern('user_rating_update')
    public async updateUserRating(updateParams: { ratingId: string; raterId: string; updateData: IUserRatingUpdate }): Promise<IUserRatingUpdateResponse> {
        let result: IUserRatingUpdateResponse;

        if (updateParams && updateParams.ratingId && updateParams.raterId && updateParams.updateData) {
            try {
                const userRating = await this.userRatingsService.updateUserRating(updateParams.ratingId, updateParams.raterId, updateParams.updateData);
                result = {
                    status: HttpStatus.OK,
                    message: 'user_rating_update_success',
                    user_rating: userRating,
                    errors: null,
                };
            } catch (e) {
                result = {
                    status: HttpStatus.PRECONDITION_FAILED,
                    message: 'user_rating_update_precondition_failed',
                    user_rating: null,
                    errors: e.errors,
                };
            }
        } else {
            result = {
                status: HttpStatus.BAD_REQUEST,
                message: 'user_rating_update_bad_request',
                user_rating: null,
                errors: null,
            };
        }

        return result;
    }

    @MessagePattern('user_rating_delete_by_id')
    public async deleteUserRating(params: {
        ratingId: string;
        raterId: string;
    }): Promise<IUserRatingsDeleteResponse> {
        let result: IUserRatingsDeleteResponse;

        if (params && params.ratingId && params.raterId) {
            try {
                await this.userRatingsService.removeUserRating(params.ratingId, params.raterId);
                result = {
                    status: HttpStatus.OK,
                    message: 'user_rating_delete_by_id_success',
                    errors: null,
                };

            } catch (e) {
                result = {
                    status: HttpStatus.PRECONDITION_FAILED,
                    message: 'user_rating_delete_by_id_precondition_failed',
                    errors: e.errors,
                };
            }
        }
        else {
            result = {
                status: HttpStatus.BAD_REQUEST,
                message: 'user_rating_delete_by_id_bad_request',
                errors: null,
            };
        }
        return result;
    }
}