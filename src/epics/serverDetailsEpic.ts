import { ActionsObservable, StateObservable, ofType } from "redux-observable";
import { IAction, SERVER_DETAILS_ACTION } from "../actions/constants";
import { Observable, of } from "rxjs";
import IApplicationStore, { ServerType } from "../interfaces/IApplicationStore";
import { withLatestFrom, mergeMap, catchError, map } from "rxjs/operators";
import { IServerDetails } from "../interfaces/IServerDetails";
import { AjaxResponse, AjaxError } from "rxjs/ajax";
import { serverDetailsActionSuccess, serverDetailsActionFailed } from "../actions/serverDetailsActions";
import { sendRequest, HTTPMethod } from "./common";
import { SPIDERMAN_BASE_URL, DETAILS, FACTORIO } from "../store/paths";



export function serverDetailsEpic(action$: ActionsObservable<IAction<IServerDetails>>, store$: StateObservable<IApplicationStore>): Observable<IAction<IServerDetails>> {
    return action$.pipe(
        ofType(SERVER_DETAILS_ACTION),
        withLatestFrom(store$),
        mergeMap((details: [IAction<IServerDetails>, IApplicationStore]) =>
            requestServerDetails(details[1]).pipe(
                map((ajaxResponse: AjaxResponse) => handleResponse(ajaxResponse)),
                catchError(error => of(handleError(error))),
            ),
        )
    )
}


function handleResponse(ajaxResponse: AjaxResponse): IAction<IServerDetails> {
    switch(ajaxResponse.status){
        case 200: 
            return serverDetailsActionSuccess(
                {
                    domainName: ajaxResponse.response.domainName,
                }
            );
        default:
            return serverDetailsActionFailed( 
                {
                    httpStatus: ajaxResponse.status,
                    errorMessage: ajaxResponse.response.message,
                }
            )
    }
}
function handleError(error: AjaxError): IAction<IServerDetails>{
    return serverDetailsActionFailed(
        {
            httpStatus: error.status,
            errorMessage: error.response.errorMessage,
        }
    )
}

function requestServerDetails(store: IApplicationStore): Observable<AjaxResponse> {
    let authToken: string = "";
    if(store.authDetails.accessToken){
        authToken = store.authDetails.accessToken.getJwtToken();
    }

    let url = SPIDERMAN_BASE_URL;
    if(store.serverType === ServerType.Minecraft){
        url= url + DETAILS
    }else if(store.serverType === ServerType.Factorio){
        url= url + FACTORIO+DETAILS
    }
    return sendRequest(SPIDERMAN_BASE_URL+ DETAILS, HTTPMethod.GET, authToken)
}