import { pingReducer } from './pingReducer';

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { authReducer } from './authReducer';
import { serverStatusReducer } from './serverStatusReducer';
import { serverDetailsReducer } from './serverDetailsReducer';
import { serverActionStatusReducer } from './serverActionStatusReducer';
import { fetchJournalEntriesReducer, createEntryReducer, toggleNewDialogReducer } from './journalReducers';
import { ServerType } from '../interfaces/IApplicationStore';
import { IAction, SET_SERVER_TYPE } from '../actions/constants';

export default (history: any) =>
  combineReducers({
    router: connectRouter(history),
    pingState: pingReducer,
    authDetails: authReducer,
    serverStatus: serverStatusReducer,
    serverDetails: serverDetailsReducer,
    serverType: serverTypeReducer,
    serverActionStatus: serverActionStatusReducer,
    journalEntries: fetchJournalEntriesReducer,
    createEntryState: createEntryReducer,
    isNewJournalDialogOpen: toggleNewDialogReducer,
  });

export function serverTypeReducer(state = ServerType.Minecraft, action: IAction<ServerType>): ServerType {
  switch (action.type) {
    case SET_SERVER_TYPE:
      return action.response as any;

    default:
      return state;
  }
}
