import { SET_REFRESH_TIMEOUT_ID, REMOVE_REFRESH_TIMEOUT_ID, REGISTER_AUTH_DATA} from "./constants";
import { CognitoUser} from "amazon-cognito-identity-js";

export interface IAuthAction {
    type: string,
    authData?: CognitoUser,
    refreshTimerId?: NodeJS.Timeout;
}
export interface IRefreshTimerAction {
    type: string,
    refreshToken?: NodeJS.Timeout,
}

export function registerAuthData(authData: CognitoUser): IAuthAction{
    return{
        type: REGISTER_AUTH_DATA,
        authData,
    }
}

export function setRefreshTimoutId(timeoutId: NodeJS.Timeout): IAuthAction {
    return {
        type: SET_REFRESH_TIMEOUT_ID,
        refreshTimerId: timeoutId,
    }
}
export function removeRefreshTimoutId(): IAuthAction {
    return {
        type: REMOVE_REFRESH_TIMEOUT_ID
    }
}