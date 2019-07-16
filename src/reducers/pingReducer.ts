import { IFetchingState } from "../interfaces/IFetchingState";
import { IPingResponse } from "../interfaces/IPingResponse";
import { IPingAction } from "../actions/pingAction";
import { PING_ACTION, PING_ACTION_SUCCESS, PING_ACTION_FAILED } from "../actions/constants";

const initalPingResponse: IPingResponse ={
    text: "",
}

const initalFetchingState: IFetchingState<IPingResponse> = {
    
        data: initalPingResponse,
        isFetching: false,
        isError: false,
        errorData: undefined,
    
  };
  

export function pingReducer(fetchingState = initalFetchingState, action: IPingAction) {
    
    switch(action.type){
        case PING_ACTION:
                console.log("Dispatched PING_ACTION"); 
            return{
                ...fetchingState,
                    data: undefined,
                    isFetching: true,
            }
        case PING_ACTION_SUCCESS:
            return {
                ...fetchingState,
                    data: action.response,
                    isFetching: false,
                    isError: false,
            }
        case PING_ACTION_FAILED:
                console.log("in failed reducer");
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