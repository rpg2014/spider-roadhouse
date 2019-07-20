import { IErrorDetail } from "../interfaces/IErrorDetail";

export const PING_ACTION = "PING_ACTION";
export const PING_ACTION_SUCCESS = "PING_ACTION_SUCCESS";
export const PING_ACTION_FAILED = "PING_ACTION_FAILED";

export const SAVE_ACCESS_TOKEN = "REGISTER_ACCESS_TOKEN";
export const REMOVE_ACCESS_TOKEN = "REMOVE_ACCESS_TOKEN";

export const SERVER_STATUS_ACTION = 'SERVER_STATUS_ACTION';
export const SERVER_STATUS_ACTION_SUCCESS = 'SERVER_STATUS_ACTION_SUCCESS';
export const SERVER_STATUS_ACTION_FAILED = 'SERVER_STATUS_ACTION_FAILED';


export interface IAction<Type> {
    type: string,
    errorData?: IErrorDetail,
    response?: Type,
}
