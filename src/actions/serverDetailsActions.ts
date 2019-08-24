
import { IServerDetails } from "../interfaces/IServerDetails";
import { IAction, SERVER_DETAILS_ACTION, SERVER_DETAILS_ACTION_SUCCESS, SERVER_DETAILS_ACTION_FAILED } from "./constants";
import { IErrorDetail } from "../interfaces/IErrorDetail";




export function serverDetailsAction(): IAction<IServerDetails> {
    return {
        type: SERVER_DETAILS_ACTION,
    }
}

export function serverDetailsActionSuccess(response: IServerDetails): IAction<IServerDetails> {
    return{
        type: SERVER_DETAILS_ACTION_SUCCESS,
        response,
    }
}

export function serverDetailsActionFailed(errorData: IErrorDetail): IAction<IServerDetails> {
    return {
        type: SERVER_DETAILS_ACTION_FAILED,
        errorData,
    }
}