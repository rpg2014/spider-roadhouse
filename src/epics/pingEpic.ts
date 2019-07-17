import { AjaxRequest, AjaxResponse, ajax, AjaxError } from 'rxjs/ajax';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import {mergeMap, map, switchMap, catchError }from 'rxjs/operators';
import { PING_ACTION } from '../actions/constants';
import { IPingAction, pingActionSuccess, pingActionFailed } from '../actions/pingAction';
import { Observable, of } from "rxjs";





export function pingEpic(action$: ActionsObservable<IPingAction>, store$: StateObservable<any>): Observable<any> {
    return action$.pipe(
        ofType(PING_ACTION),
        mergeMap( (action: IPingAction) =>
            sendGet(action).pipe(
                map(ajaxResponse => handleResponse(ajaxResponse)),
                catchError( error => of(handleError(error))),
            ),
        )
    )
    
        
        
}


function handleResponse(ajaxResponse: AjaxResponse) {
    switch (ajaxResponse.status){
        case 200:
            console.log(ajaxResponse)
            return pingActionSuccess({text:ajaxResponse.response.ip});
        default:
            return pingActionFailed({httpStatus: ajaxResponse.status,
                errorMessage: ajaxResponse.responseText
            })
    }
}

function handleError(error: AjaxError){
    console.log(error)
    return pingActionFailed({
        httpStatus: error.status,
        errorMessage: error.message,
    })
}


export function sendGet(action: IPingAction): Observable<AjaxResponse>{
    let request: AjaxRequest = {
        url: "https://postman-echo.com/ip",
        method: "GET",
    }
    return ajax(request)
}