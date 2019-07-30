

export interface IServerStatus { 
    status: ServerStatus;
}

export enum ServerStatus {
    Pending = 'Pending',
    Running = 'Running',
    ShuttingDown = 'Shutting-down',
    Terminated = 'Terminated',
    Stopping = 'Stopping',
    Stopped = 'Stopped',
}