import { IUserRatingUpdate } from "./user-rating-update.interface";

export interface IUserRatingUpdateResponse {
    status: number;
    message: string;
    user_rating: IUserRatingUpdate | null;
    errors: { [key: string]: any } | null;
}