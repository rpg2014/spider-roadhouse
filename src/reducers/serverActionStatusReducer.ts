import { IServerActionStatus } from "../interfaces/IServerActionStatus";
import { IFetchingState } from "../interfaces/IFetchingState";
import { IAction, SERVER_START_ACTION, SERVER_STOP_ACTION, SERVER_STOP_ACTION_SUCCESS, SERVER_START_ACTION_SUCCESS, SERVER_START_ACTION_FAILED, SERVER_STOP_ACTION_FAILED } from "../actions/constants";



const initalFetchingState: IFetchingState<IServerActionStatus> = {
    data: undefined,
    isError: false,
    isFetching: false,
    errorData: undefined,
}


export function serverActionStatusReducer(fetchingState = initalFetchingState, action: IAction<IServerActionStatus>): IFetchingState<IServerActionStatus> {
    switch(action.type) {
        case SERVER_START_ACTION:
        case SERVER_STOP_ACTION:
            return {
                ...fetchingState,
                data: undefined,
                isFetching: true,
                errorData: undefined,
            }
        case SERVER_START_ACTION_SUCCESS:
        case SERVER_STOP_ACTION_SUCCESS:
            return {
                ...fetchingState,
                data: {
                    isServerChangingState: true,
                },
                isError: false,
                isFetching: false,
            }
        case SERVER_START_ACTION_FAILED:
        case SERVER_STOP_ACTION_FAILED:
            return {
                ...fetchingState,
                data: undefined,
                isError: true,
                isFetching: false,
                errorData: action.errorData,
            
            }
        
        default:
            return{
                ...fetchingState,
                data: undefined,
            }
    }
}