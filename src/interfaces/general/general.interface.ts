export interface ErrorI {

    message: string;
    code: number;
}

export interface ResultI {
    data?: any;
    error?: ErrorI;
}