import { IUserRating } from "./user-rating.interface";

export interface IUserRatingsSearchResponse {
    status: number;
    message: string;
    user_ratings: IUserRating[] | null;
}