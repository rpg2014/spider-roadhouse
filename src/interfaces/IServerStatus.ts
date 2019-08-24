

export interface IServerStatus { 
    status: ServerStatus;
}

export enum ServerStatus {
    Pending = 'Pending',
    Running = 'Running',
    ShuttingDown = 'ShuttingDown',
    Terminated = 'Terminated',
    Stopping = 'Stopping',
    Stopped = 'Stopped',
}