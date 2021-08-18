import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { IAction, SERVER_START_ACTION, SERVER_STOP_ACTION } from '../actions/constants';
import IApplicationStore, { ServerType } from '../interfaces/IApplicationStore';
import { Observable, of } from 'rxjs';
import { withLatestFrom, mergeMap, catchError, map } from 'rxjs/operators';
import { AjaxResponse, AjaxError } from 'rxjs/ajax';
import { FACTORIO, SPIDERMAN_BASE_URL, START, STOP } from '../store/paths';
import { sendRequest, HTTPMethod } from './common';
import { IServerActionStatus } from '../interfaces/IServerActionStatus';
import { serverStartActionSuccess, serverStartActionFailed } from '../actions/serverStartAction';
import { serverStopActionSuccess, serverStopActionFailed } from '../actions/serverStopAction';

export function serverActionEpic(
  action$: ActionsObservable<IAction<IServerActionStatus>>,
  store$: StateObservable<IApplicationStore>
): Observable<IAction<IServerActionStatus>> {
  return action$.pipe(
    ofType(SERVER_START_ACTION, SERVER_STOP_ACTION),
    withLatestFrom(store$),
    mergeMap((details: [IAction<IServerActionStatus>, IApplicationStore]) =>
      sendServerAction(details).pipe(
        map((ajaxResponse: AjaxResponse) => handleResponse(ajaxResponse, details[0])),
        catchError((error: AjaxError) => of(handleError(error, details[0])))
      )
    )
  );
}

function handleResponse(
  ajaxResponse: AjaxResponse,
  originalAction: IAction<IServerActionStatus>
): IAction<IServerActionStatus> {
  let result: boolean = false;
  switch (ajaxResponse.status) {
    case 200:
      result = true;
      break;
    default:
      result = false;
      break;
  }
  if (originalAction.type === SERVER_START_ACTION) {
    return serverStartActionSuccess({
      isServerChangingState: result,
    });
  } else {
    return serverStopActionSuccess({
      isServerChangingState: result,
    });
  }
}

function handleError(error: AjaxError, originalAction: IAction<IServerActionStatus>): IAction<IServerActionStatus> {
  if (originalAction.type === SERVER_START_ACTION) {
    return serverStartActionFailed({
      httpStatus: error.status,
      errorMessage: error.response.errorMessage,
    });
  } else {
    return serverStopActionFailed({
      httpStatus: error.status,
      errorMessage: error.response.errorMessage,
    });
  }
}

function sendServerAction(details: [IAction<IServerActionStatus>, IApplicationStore]): Observable<AjaxResponse> {
  let authToken: string = '';
  if (details[1].authDetails.accessToken) {
    authToken = details[1].authDetails.accessToken.getJwtToken();
  }

  let url: string = SPIDERMAN_BASE_URL;

  if (details[1].serverType === ServerType.Factorio) {
    url = url + FACTORIO;
  }

  if (details[0].type === SERVER_START_ACTION) {
    url += START;
  } else {
    url += STOP;
  }
  return sendRequest(url, HTTPMethod.POST, authToken);
}
