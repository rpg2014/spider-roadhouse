import {PING_ACTION, PING_ACTION_SUCCESS, PING_ACTION_FAILED} from './constants';
import {IErrorDetail} from '../interfaces/IErrorDetail';
import {IPingResponse} from '../interfaces/IPingResponse';

export interface IPingAction {
    type: string,
    errorData?: IErrorDetail,
    response?: IPingResponse,
}

export function pingAction(): IPingAction {
    return{
        type: PING_ACTION,
    }
}

export function pingActionSuccess(response: IPingResponse): IPingAction{
    return{
        type: PING_ACTION_SUCCESS,
        response,
    }
}

export function pingActionFailed(errorData: IErrorDetail) {
    return {
        type: PING_ACTION_FAILED,
        errorData,
    }
}



