import { IUserRating } from "./user-rating.interface";

export interface IUserRatingsSearchResponse {
    status: number;
    system_message: string;
    user_ratings: IUserRating[] | null;
    errors: { [key: string]: any } | null;
}