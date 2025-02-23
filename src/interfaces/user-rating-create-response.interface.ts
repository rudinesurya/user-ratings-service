import { IUserRating } from "./user-rating.interface";

export interface IUserRatingCreateResponse {
    status: number;
    system_message: string;
    user_rating: IUserRating | null;
    errors: { [key: string]: any } | null;
}