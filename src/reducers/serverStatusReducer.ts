import { IFetchingState } from "../interfaces/IFetchingState";
import { IServerStatus, ServerStatus } from "../interfaces/IServerStatus";
import { IAction, SERVER_STATUS_ACTION, SERVER_STATUS_ACTION_SUCCESS, SERVER_STATUS_ACTION_FAILED } from "../actions/constants";



const initalFetchingState: IFetchingState<IServerStatus> = {
    data: undefined,
    isError: false,
    isFetching: false,
    errorData: undefined,
}


export function serverStatusReducer(fetchingState = initalFetchingState, action: IAction<IServerStatus>): IFetchingState<IServerStatus> {
    
    switch(action.type){
        case SERVER_STATUS_ACTION:
            return{
                ...fetchingState,
                    data: undefined,
                    isFetching: true,
            }
        case SERVER_STATUS_ACTION_SUCCESS:
            return {
                ...fetchingState,
                    data: action.response,
                    isFetching: false,
                    isError: false,
            }
        case SERVER_STATUS_ACTION_FAILED:
            return {
                ...fetchingState,
                    isFetching: false,
                    isError: true,
                    errorData: action.errorData,
            }
        default:
            return fetchingState;
    }
}