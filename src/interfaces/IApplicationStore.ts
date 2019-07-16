import { IServerState } from './IServerState';
import {IAuthDetails} from './IAuthDetails';
import { IFetchingState } from './IFetchingState';
import { IPingResponse } from './IPingResponse';

export default interface IApplicationStore {
    pingState: IFetchingState<IPingResponse>,

    // serverDetails: IServerState;
    // authDetails: IAuthDetails;
}
