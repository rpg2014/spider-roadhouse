import { SERVER_STOP_ACTION, SERVER_STOP_ACTION_SUCCESS, SERVER_STOP_ACTION_FAILED, IAction } from "./constants";
import { IErrorDetail } from "../interfaces/IErrorDetail";
import { IServerActionStatus } from "../interfaces/IServerActionStatus";




export function serverStopAction(): IAction<IServerActionStatus> {
    return {
        type: SERVER_STOP_ACTION,
    }
}

export function serverStopActionSuccess(response: IServerActionStatus): IAction<IServerActionStatus> {
    return{
        type: SERVER_STOP_ACTION_SUCCESS,
        response,
    }
}

export function serverStopActionFailed(errorData: IErrorDetail) {
    return {
        type: SERVER_STOP_ACTION_FAILED,
        errorData,
    }
}