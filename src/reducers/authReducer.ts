import { IAuthDetails } from "../interfaces/IAuthDetails";
import { IAuthAction } from "../actions/authAction";
import { REMOVE_ACCESS_TOKEN, REGISTER_ACCESS_TOKEN} from "../actions/constants";



const initalAuthDetailsState: IAuthDetails  = {
    accessToken: undefined,
}



export function authReducer(authState = initalAuthDetailsState, action: IAuthAction):IAuthDetails {
    switch(action.type) {
        case REGISTER_ACCESS_TOKEN:
            return {
                accessToken: action.accessToken,
            }
        case REMOVE_ACCESS_TOKEN:
            return {
                accessToken: undefined,
            }
        default:
            return {
                ...authState
            }
    }
}