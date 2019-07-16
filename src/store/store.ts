//import { routerMiddleware } from 'react-router-redux';
//import createBrowserHistory from 'history/createBrowserHistory';
import { applyMiddleware, compose, createStore } from 'redux';
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


let initalPingState: IFetchingState<IPingResponse> = {
    data: undefined,
    isError: false,
    isFetching: false,
}



let initalState: IApplicationStore = {
    pingState: initalPingState,

    // serverDetails: {
    //     isServerRunning: false,
    //     serverAddress: "",
    // },
    // authDetails: {
    //     isAuthenticated: false,
    //     sessionToken: "",
    // },
};
//export const history = createBrowserHistory();

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