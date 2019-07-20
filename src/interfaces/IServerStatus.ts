

export interface IServerStatus { 
    status: ServerStatus;
}

export enum ServerStatus {
    Pending = 'pending',
    Running = 'running',
    ShuttingDown = 'shutting-down',
    Terminated = 'terminated',
    Stopping = 'stopping',
    Stopped = 'stopped',
}