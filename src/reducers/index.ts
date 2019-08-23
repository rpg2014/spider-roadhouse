import {pingReducer} from './pingReducer';

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { authReducer } from './authReducer';
import { serverStatusReducer } from './serverStatusReducer';
import { serverDetailsReducer } from './serverDetailsReducer';
import { serverActionStatusReducer } from './serverActionStatusReducer';






export default (history: any) => combineReducers({
    router: connectRouter(history),
    pingState: pingReducer,
    authDetails: authReducer,
    serverStatus: serverStatusReducer,
    serverDetails: serverDetailsReducer,
    serverActionStatus: serverActionStatusReducer,
})