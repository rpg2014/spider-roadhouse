import { ActionsObservable, StateObservable, ofType } from "redux-observable";
import { IAction, SERVER_STATUS_ACTION } from "../actions/constants";
import { IServerStatus } from "../interfaces/IServerStatus";
import { Observable, of } from "rxjs";
import { mergeMap, catchError, map, withLatestFrom } from "rxjs/operators";
import { AjaxResponse, AjaxError, AjaxRequest, ajax } from "rxjs/ajax";
import { serverStatusActionSuccess, serverStatusActionFailed } from "../actions/serverStatusAction";
import { SPIDERMAN_BASE_URL, STATUS } from "../store/paths";
import IApplicationStore from "../interfaces/IApplicationStore";
import { sendRequest, HTTPMethod } from "./common";


export function serverStatusEpic(action$: ActionsObservable<IAction<IServerStatus>>, store$: StateObservable<IApplicationStore>): Observable<IAction<IServerStatus>> {
    return action$.pipe(
        ofType(SERVER_STATUS_ACTION),
        withLatestFrom(store$),
        mergeMap( (details: [IAction<IServerStatus>,IApplicationStore]) =>
            requestServerStatus(details[1]).pipe(
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
                errorMessage: ajaxResponse.response.message
            })
    }
}

function handleError(error: AjaxError): IAction<IServerStatus>{
    return serverStatusActionFailed({
        httpStatus: error.status,
        errorMessage: error.message,
    })
}

export function requestServerStatus(store: IApplicationStore): Observable<AjaxResponse>{
    let authToken:string = "";
    if(store.authDetails.accessToken){
        authToken= store.authDetails.accessToken.getJwtToken();
    }

    return sendRequest(SPIDERMAN_BASE_URL +STATUS, HTTPMethod.GET, authToken);
}