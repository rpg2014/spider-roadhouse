import { IAuthDetails } from "../interfaces/IAuthDetails";
import { IAuthAction } from "../actions/authAction";
import { SET_REFRESH_TIMEOUT_ID, REMOVE_REFRESH_TIMEOUT_ID, REGISTER_AUTH_DATA} from "../actions/constants";
import { CognitoAccessToken, CognitoRefreshToken} from "amazon-cognito-identity-js";



const initalAuthDetailsState: IAuthDetails  = {
    accessToken: undefined,
    authData: undefined,
    refreshToken: undefined,
    refreshTimeoutId: undefined,
}



export function authReducer(authState = initalAuthDetailsState, action: IAuthAction):IAuthDetails {
    switch(action.type) {
        case REGISTER_AUTH_DATA:
            if(action.authData){
                let userSession = action.authData.getSignInUserSession();
                let accessToken: CognitoAccessToken | undefined = undefined;
                let refreshToken: CognitoRefreshToken| undefined = undefined;
                if(userSession){
                    accessToken = userSession.getAccessToken();
                    refreshToken = userSession.getRefreshToken();
                }
                return {
                    accessToken,
                    authData: action.authData,
                    refreshToken,
                    refreshTimeoutId: authState.refreshTimeoutId,
                }
            }
            console.log("[ERROR] No AuthData in " + REGISTER_AUTH_DATA + " action");
            break;
            
        case SET_REFRESH_TIMEOUT_ID:
            if(action.refreshTimerId){
                return {
                    ...authState,
                    refreshTimeoutId: action.refreshTimerId
                }
            }
            console.log("[ERROR] No refreshTimeoutId in action")
            break;
        case REMOVE_REFRESH_TIMEOUT_ID:
            return {
                ...authState,
                refreshTimeoutId: undefined,
            }
        default:
            return {
                ...authState
            }
    }
    return {
        ...authState
    }
}