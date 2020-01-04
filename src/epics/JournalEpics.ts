import { JournalEntryProps } from "../components/JournalPage/JournalList";
import { IAction, FETCH_JOURNAL_ENTRIES, CREATE_JOURNAL_ENTRY } from "../actions/constants";
import { ActionsObservable, StateObservable, ofType } from "redux-observable";
import { Observable, of } from "rxjs";
import IApplicationStore from "../interfaces/IApplicationStore";
import { mergeMap, catchError, map, withLatestFrom } from "rxjs/operators";
import { AjaxResponse, AjaxError } from "rxjs/ajax";
import { sendRequest, HTTPMethod } from "./common";
import { SPIDERMAN_BASE_URL, JOURNAL, NEW } from "../store/paths";
import { fetchEntriesFinished, createEntryFinished } from "../actions/journalActions";





export function fetchJournalEntriesEpic(action$: ActionsObservable<IAction<JournalEntryProps[]>>, store$: StateObservable<IApplicationStore>): Observable<IAction<JournalEntryProps[]>> {
    return action$.pipe(
        ofType(FETCH_JOURNAL_ENTRIES),
        withLatestFrom(store$),
        mergeMap( (details: [IAction<JournalEntryProps[]>,IApplicationStore]) =>
            fetchEntries(details[1]).pipe(
                map(ajaxResponse => handleEntryResponse(ajaxResponse)),
                catchError(error => of(handleError(error))),
            ),
            )
    )
}

export function createJournalEntryEpic(action$: ActionsObservable<IAction<boolean, Partial<JournalEntryProps>>>, store$: StateObservable<IApplicationStore>): Observable<IAction<boolean, Partial<JournalEntryProps>>>{
    return action$.pipe(
        ofType(CREATE_JOURNAL_ENTRY),
        withLatestFrom(store$),
        mergeMap((details: [IAction<boolean, Partial<JournalEntryProps>>, IApplicationStore]) => 
            sendCreateEntryRequest(details[0].request, details[1]).pipe(
                map(ajaxResponse => handleCreateEntryResponse(ajaxResponse)),
                catchError(error => of(handleCreateError(error)))
            ),
        )
    )
}

function handleEntryResponse(ajaxResponse: AjaxResponse):IAction<JournalEntryProps[]> {
    switch (ajaxResponse.status){
        case 200:
            return fetchEntriesFinished(ajaxResponse.response.entries, undefined);
        default:
            return fetchEntriesFinished(undefined, {
                httpStatus: ajaxResponse.status,
                errorMessage: ajaxResponse.response.message
            })
    }
}

function handleCreateEntryResponse(ajaxResponse: AjaxResponse): IAction<boolean, Partial<JournalEntryProps>> {
    switch (ajaxResponse.status) {
        case 200: 
            return createEntryFinished(ajaxResponse.response.success);
        default:
            return createEntryFinished(undefined, {
                httpStatus: ajaxResponse.status,
                errorMessage: ajaxResponse.response.message
            })
    }
}

function handleCreateError(error: AjaxError): IAction<boolean, Partial<JournalEntryProps>>{
    return createEntryFinished(undefined, {
        httpStatus: error.status,
        errorMessage: error.message,
    })
}

function handleError(error: AjaxError): IAction<any>{
    return fetchEntriesFinished(undefined, {
        httpStatus: error.status,
        errorMessage: error.message,
    })
}


export function fetchEntries(store: IApplicationStore): Observable<AjaxResponse>{
    let authToken:string = "";
    if(store.authDetails.accessToken){
        authToken= store.authDetails.accessToken.getJwtToken();
    }

    return sendRequest(SPIDERMAN_BASE_URL +JOURNAL, HTTPMethod.GET, authToken);
}

export function sendCreateEntryRequest(request?:Partial<JournalEntryProps>, store?: IApplicationStore): Observable<AjaxResponse> {
    let authToken:string = "";
    if(store && store.authDetails.accessToken){
        authToken= store.authDetails.accessToken.getJwtToken();
    }
    return sendRequest(SPIDERMAN_BASE_URL + JOURNAL + NEW, HTTPMethod.POST, authToken, JSON.stringify(request))
}