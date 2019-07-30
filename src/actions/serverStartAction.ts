import { SERVER_START_ACTION, SERVER_START_ACTION_SUCCESS, SERVER_START_ACTION_FAILED, IAction } from "./constants";
import { IErrorDetail } from "../interfaces/IErrorDetail";




// export function serverStartAction(): IAction<> {
//     return {
//         type: SERVER_START_ACTION,
//     }
// }

// export function serverStartActionSuccess(response: IServerStart): IAction<> {
//     return{
//         type: SERVER_START_ACTION_SUCCESS,
//         response,
//     }
// }

export function serverStartActionFailed(errorData: IErrorDetail) {
    return {
        type: SERVER_START_ACTION_FAILED,
        errorData,
    }
}