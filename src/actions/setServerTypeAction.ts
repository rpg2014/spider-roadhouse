import { ServerType } from "../interfaces/IApplicationStore";
import { ServerStatus } from "../interfaces/IServerStatus";
import { IAction, SET_SERVER_TYPE } from "./constants";







export function setServerTypeAction(serverType: ServerType): IAction<ServerType> {
    return {
        type: SET_SERVER_TYPE,
        response: serverType
    }
}