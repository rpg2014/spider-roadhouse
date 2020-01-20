//import { routerMiddleware } from 'react-router-redux';
//import createBrowserHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore } from 'redux';
import IApplicationStore from '../interfaces/IApplicationStore';
import createRootReducer from "../reducers"
import {createBrowserHistory} from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from '../epics/index';
import { IFetchingState } from '../interfaces/IFetchingState';
import { IPingResponse } from '../interfaces/IPingResponse';
import 'redux-devtools-extension'
import { composeWithDevTools } from 'redux-devtools-extension';
import { IAuthDetails } from '../interfaces/IAuthDetails';
import { IServerStatus } from '../interfaces/IServerStatus';
import { IServerDetails } from '../interfaces/IServerDetails';
import { IServerActionStatus } from '../interfaces/IServerActionStatus';
import { JournalEntryProps } from '../components/JournalPage/JournalList';


let initalPingState: IFetchingState<IPingResponse> = {
    data: undefined,
    isError: false,
    isFetching: false,
}
let initalServerStatus: IFetchingState<IServerStatus> = {
    data: undefined,
    isError: false,
    isFetching: false,
}

let initalAuthDetailsState: IAuthDetails = {
    accessToken: undefined
}
let initalServerDetailsState: IFetchingState<IServerDetails> = {
    data: undefined,
    isError: false,
    isFetching: false,
}

let initalServerActionStatusState: IFetchingState<IServerActionStatus> = {
    data: undefined,
    isError: false,
    isFetching: false,
}

export let initalJournalEntrys: IFetchingState<JournalEntryProps[]> = {
    data: undefined,
    isError: false,
    isFetching: false,
}
export let initalDeleteEntry: IFetchingState<boolean> = {
    isError: false,
    isFetching: false,
    data: false
}

export let startOpen = window.location.pathname === "/journal/new"? true: false
let initalState: IApplicationStore = {
    pingState: initalPingState,
    authDetails: initalAuthDetailsState,
    serverStatus: initalServerStatus,
    serverDetails: initalServerDetailsState,
    serverActionStatus: initalServerActionStatusState,
    journalEntries: initalJournalEntrys,
    createEntryState: initalDeleteEntry,
    isNewJournalDialogOpen: startOpen,
};

export const history = createBrowserHistory();

export default function createInitialStore(){
    const epicMiddleware = createEpicMiddleware();

    const store = createStore(
        createRootReducer(history),
        initalState,
        composeWithDevTools(
            applyMiddleware(
                epicMiddleware,
                routerMiddleware(history)
            )
        )
    );  

    epicMiddleware.run(rootEpic);
    return store;
}