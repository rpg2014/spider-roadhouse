import { SET_REFRESH_TIMEOUT_ID, REMOVE_REFRESH_TIMEOUT_ID, REGISTER_AUTH_DATA, SET_ACCESS_TOKEN} from "./constants";
import { CognitoUser, CognitoAccessToken} from "amazon-cognito-identity-js";

export interface IAuthAction {
    type: string,
    authData?: CognitoUser,
    accessToken?: CognitoAccessToken;
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

export function setAccessToken(accessToken: CognitoAccessToken){
    return {
        type: SET_ACCESS_TOKEN,
        accessToken
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