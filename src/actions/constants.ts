import { IErrorDetail } from "../interfaces/IErrorDetail";

export const PING_ACTION = "PING_ACTION";
export const PING_ACTION_SUCCESS = "PING_ACTION_SUCCESS";
export const PING_ACTION_FAILED = "PING_ACTION_FAILED";

export const REGISTER_AUTH_DATA = "REGISTER_AUTH_DATA";
export const REMOVE_AUTH_DATA = "REMOVE_AUTH_DATA";

export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export const SET_REFRESH_TIMEOUT_ID = 'SET_REFRESH_TIMEOUT_ID';
export const REMOVE_REFRESH_TIMEOUT_ID = 'REMOVE_REFRESH_TIMOUT_ID';

export const SERVER_STATUS_ACTION = 'SERVER_STATUS_ACTION';
export const SERVER_STATUS_ACTION_SUCCESS = 'SERVER_STATUS_ACTION_SUCCESS';
export const SERVER_STATUS_ACTION_FAILED = 'SERVER_STATUS_ACTION_FAILED';

export const SERVER_DETAILS_ACTION = 'SERVER_DETAILS_ACTION';
export const SERVER_DETAILS_ACTION_SUCCESS = 'SERVER_DETAILS_ACTION_SUCCESS';
export const SERVER_DETAILS_ACTION_FAILED = 'SERVER_DETAILS_ACTION_FAILED';

export const SERVER_START_ACTION = 'START_ACTION';
export const SERVER_START_ACTION_SUCCESS = 'START_ACTION_SUCCESS';
export const SERVER_START_ACTION_FAILED = 'START_ACTION_FAILED';

export const SERVER_STOP_ACTION = 'STOP_ACTION';
export const SERVER_STOP_ACTION_SUCCESS = 'STOP_ACTION_SUCCESS';
export const SERVER_STOP_ACTION_FAILED = 'STOP_ACTION_FAILED';

export const FETCH_JOURNAL_ENTRIES ='FETCH_JOURNAL_ENTRIES';
export const FETCH_JOURNAL_ENTRIES_DONE ='FETCH_JOURNAL_ENTRIES_DONE';

export const CREATE_JOURNAL_ENTRY = 'CREATE_JOURNAL_ENTRY';
export const CREATE_JOURNAL_ENTRY_DONE = 'CREATE_JOURNAL_ENTRY_DONE';

export const DELETE_ENTRY = 'DELETE_ENTRY';

export const TOGGLE_NEW_DIALOG = 'TOGGLE'

export interface IAction<Response, Request = {}> {
    type: string,
    spider_access_token?: string,
    errorData?: IErrorDetail,
    response?: Response,
    request?: Request
}
