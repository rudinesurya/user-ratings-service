export interface IUserRatingsDeleteResponse {
    status: number;
    message: string;
    errors: { [key: string]: any } | null;
}