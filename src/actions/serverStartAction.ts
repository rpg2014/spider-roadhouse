import { SERVER_START_ACTION, SERVER_START_ACTION_SUCCESS, SERVER_START_ACTION_FAILED, IAction } from "./constants";
import { IErrorDetail } from "../interfaces/IErrorDetail";
import { IServerActionStatus } from "../interfaces/IServerActionStatus";




export function serverStartAction(): IAction<IServerActionStatus> {
    return {
        type: SERVER_START_ACTION,
    }
}

export function serverStartActionSuccess(response: IServerActionStatus): IAction<IServerActionStatus> {
    return{
        type: SERVER_START_ACTION_SUCCESS,
        response,
    }
}

export function serverStartActionFailed(errorData: IErrorDetail) {
    return {
        type: SERVER_START_ACTION_FAILED,
        errorData,
    }
}