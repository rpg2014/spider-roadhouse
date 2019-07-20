import { IServerStatus } from "../interfaces/IServerStatus";
import { IAction, SERVER_STATUS_ACTION, SERVER_STATUS_ACTION_SUCCESS, SERVER_STATUS_ACTION_FAILED } from "./constants";
import { IErrorDetail } from "../interfaces/IErrorDetail";



export function serverStatusAction(): IAction<IServerStatus> {
    return {
        type: SERVER_STATUS_ACTION,
    }
}

export function serverStatusActionSuccess(response: IServerStatus): IAction<IServerStatus> {
    return{
        type: SERVER_STATUS_ACTION_SUCCESS,
        response,
    }
}

export function serverStatusActionFailed(errorData: IErrorDetail): IAction<IServerStatus> {
    return {
        type: SERVER_STATUS_ACTION_FAILED,
        errorData,
    }
}