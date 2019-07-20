import { AjaxRequest, AjaxResponse, ajax, AjaxError } from 'rxjs/ajax';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import {mergeMap, map, switchMap, catchError }from 'rxjs/operators';
import { PING_ACTION, IAction } from '../actions/constants';
import { pingActionSuccess, pingActionFailed } from '../actions/pingAction';
import { Observable, of } from "rxjs";
import { IPingResponse } from '../interfaces/IPingResponse';





export function pingEpic(action$: ActionsObservable<IAction<IPingResponse>>, store$: StateObservable<any>): Observable<IAction<IPingResponse>> {
    return action$.pipe(
        ofType(PING_ACTION),
        mergeMap( (action: IAction<IPingResponse>) =>
            sendGet(action).pipe(
                map(ajaxResponse => handleResponse(ajaxResponse)),
                catchError( error => of(handleError(error))),
            ),
        )
    )
}


function handleResponse(ajaxResponse: AjaxResponse):IAction<IPingResponse> {
    switch (ajaxResponse.status){
        case 200:
            return pingActionSuccess({text:ajaxResponse.response.ip});
        default:
            return pingActionFailed({httpStatus: ajaxResponse.status,
                errorMessage: ajaxResponse.responseText
            })
    }
}

function handleError(error: AjaxError): IAction<IPingResponse>{
    return pingActionFailed({
        httpStatus: error.status,
        errorMessage: error.message,
    })
}


export function sendGet(action: IAction<IPingResponse>): Observable<AjaxResponse>{
    let request: AjaxRequest = {
        url: "https://postman-echo.com/ip",
        method: "GET",
    }
    return ajax(request)
}