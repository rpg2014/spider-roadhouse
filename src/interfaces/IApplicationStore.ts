import { IServerStatus } from './IServerStatus';
import {IAuthDetails} from './IAuthDetails';
import { IFetchingState } from './IFetchingState';
import { IPingResponse } from './IPingResponse';
import { IServerDetails }from './IServerDetails';

export default interface IApplicationStore {
    pingState: IFetchingState<IPingResponse>,

    serverStatus: IFetchingState<IServerStatus>;
    authDetails: IAuthDetails;
    serverDetails: IFetchingState<IServerDetails>;
}
