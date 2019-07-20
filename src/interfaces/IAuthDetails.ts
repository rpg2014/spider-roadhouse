import { CognitoAccessToken } from "amazon-cognito-identity-js";

export interface IAuthDetails{
    accessToken?: CognitoAccessToken;
}