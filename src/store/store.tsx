import { IServerState } from '../intefaces/IServerState';
import {IAuthDetails} from '../intefaces/IAuthDetails';

export interface IApplicationStore {
    serverDetails: IServerState;
    authDetails: IAuthDetails;
}