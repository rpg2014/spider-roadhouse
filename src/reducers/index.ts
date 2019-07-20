import {pingReducer} from './pingReducer';

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { authReducer } from './authReducer';
import { serverStatusReducer } from './serverStatusReducer';






export default (history: any) => combineReducers({
    router: connectRouter(history),
    pingState: pingReducer,
    authDetails: authReducer,
    serverStatus: serverStatusReducer,
})