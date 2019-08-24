import { IServerDetails } from "../interfaces/IServerDetails";
import {IFetchingState } from "../interfaces/IFetchingState";
import { IAction, SERVER_DETAILS_ACTION, SERVER_DETAILS_ACTION_SUCCESS, SERVER_DETAILS_ACTION_FAILED } from "../actions/constants";


const initalFetchingState: IFetchingState<IServerDetails> = {
    data: undefined,
    isError: false,
    isFetching: false,
    errorData: undefined,
}



export function serverDetailsReducer(fetchingState = initalFetchingState, action: IAction<IServerDetails>): IFetchingState<IServerDetails> {
    
    switch(action.type){
        case SERVER_DETAILS_ACTION:
            return{
                ...fetchingState,
                    data: undefined,
                    isFetching: true,
            }
        case SERVER_DETAILS_ACTION_SUCCESS:
            return {
                ...fetchingState,
                    data: action.response,
                    isFetching: false,
                    isError: false,
            }
        case SERVER_DETAILS_ACTION_FAILED:
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