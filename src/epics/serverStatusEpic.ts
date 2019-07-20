import { ActionsObservable, StateObservable, ofType } from "redux-observable";
import { IAction, SERVER_STATUS_ACTION } from "../actions/constants";
import { IServerStatus } from "../interfaces/IServerStatus";
import { Observable, of } from "rxjs";
import { mergeMap, catchError, map } from "rxjs/operators";
import { AjaxResponse, AjaxError, AjaxRequest, ajax } from "rxjs/ajax";
import { serverStatusActionSuccess, serverStatusActionFailed } from "../actions/serverStatusAction";
import { SPIDERMAN_BASE_URL, STATUS } from "../store/paths";



export function serverStatusEpic(action$: ActionsObservable<IAction<IServerStatus>>, store$: StateObservable<any>): Observable<IAction<IServerStatus>> {
    return action$.pipe(
        ofType(SERVER_STATUS_ACTION),
        mergeMap( (_action: IAction<IServerStatus>) =>
            requestServerStatus().pipe(
                map(ajaxResponse => handleResponse(ajaxResponse)),
                catchError(error => of(handleError(error))),
            ),
        )
    )
}


function handleResponse(ajaxResponse: AjaxResponse):IAction<IServerStatus> {
    switch (ajaxResponse.status){
        case 200:
            return serverStatusActionSuccess(
                {
                    status: ajaxResponse.response.status
                }
            );
        default:
            return serverStatusActionFailed({httpStatus: ajaxResponse.status,
                errorMessage: ajaxResponse.responseText
            })
    }
}

function handleError(error: AjaxError): IAction<IServerStatus>{
    return serverStatusActionFailed({
        httpStatus: error.status,
        errorMessage: error.message,
    })
}

export function requestServerStatus(): Observable<AjaxResponse>{
    let request: AjaxRequest = {
        url: SPIDERMAN_BASE_URL + STATUS,
        method: "GET",
    }
    return ajax(request)
}