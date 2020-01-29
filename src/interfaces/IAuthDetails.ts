import { CognitoAccessToken, CognitoUser, CognitoRefreshToken } from "amazon-cognito-identity-js";

export interface IAuthDetails{
    accessToken?: CognitoAccessToken;
    authData?: CognitoUser;
    refreshToken?: CognitoRefreshToken;
    refreshTimeoutId?: NodeJS.Timeout;
}
