import { IServerStatus } from './IServerStatus';
import {IAuthDetails} from './IAuthDetails';
import { IFetchingState } from './IFetchingState';
import { IPingResponse } from './IPingResponse';
import { IServerDetails }from './IServerDetails';
import { IServerActionStatus } from './IServerActionStatus';
import { JournalEntryProps } from '../components/JournalPage/JournalList';

export default interface IApplicationStore {
    pingState: IFetchingState<IPingResponse>,

    serverStatus: IFetchingState<IServerStatus>;
    authDetails: IAuthDetails;
    serverDetails: IFetchingState<IServerDetails>;
    serverActionStatus: IFetchingState<IServerActionStatus>;
    journalEntries: IFetchingState<JournalEntryProps[]>;
    createEntryState: IFetchingState<boolean>,
    isNewJournalDialogOpen: boolean,
    // updateEntryState: IFetchingState<boolean>,
    // deleteEntryState: IFetchingState<boolean> 
}
