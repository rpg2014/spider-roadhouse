import { REMOVE_ACCESS_TOKEN, REGISTER_ACCESS_TOKEN} from "./constants";
import { CognitoAccessToken } from "amazon-cognito-identity-js";

export interface IAuthAction {
    type: string,
    accessToken?: CognitoAccessToken,
}

export function removeAccessToken(): IAuthAction {
    return{
        type: REMOVE_ACCESS_TOKEN,
    }
}

export function registerAccessToken(accessToken: CognitoAccessToken): IAuthAction{
    return{
        type: REGISTER_ACCESS_TOKEN,
        accessToken,
    }
}