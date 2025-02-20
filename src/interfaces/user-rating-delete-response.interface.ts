export interface IUserRatingDeleteResponse {
    status: number;
    message: string;
    errors: { [key: string]: any } | null;
}