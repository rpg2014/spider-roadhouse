import React from "react";
import IApplicationState from '../interfaces/IApplicationStore';
import { connect } from "react-redux";
import { ServerStatus } from '../interfaces/IServerStatus';
import { serverStatusAction } from "../actions/serverStatusAction";
import { IFetchingState } from "../interfaces/IFetchingState";
import { IServerActionStatus } from "../interfaces/IServerActionStatus";
import { serverStartAction } from "../actions/serverStartAction";
import { serverStopAction } from "../actions/serverStopAction";



interface StartStopButtonProps {
    serverStatus?: ServerStatus,
    statusFetchError: boolean,
    serverActionStatus: IFetchingState<IServerActionStatus>,
    startServer: ()  => void,
    stopServer: () => void,
    refreshStatus: () => void,
};

export class StartStopButton extends React.Component<StartStopButtonProps> {
    clicked: boolean = false;
    
    render() {
        if (this.props.serverActionStatus.isFetching) {
            return (
                <div className="spinner-grow align-middle text-light"></div>
            );
        }
        

        if ((this.props.serverActionStatus.isError && this.props.serverActionStatus.errorData) || this.props.statusFetchError){
            return (
                <div className="alert alert-danger align-middle shadow my-5" role="alert">
                    {this.props.serverActionStatus.errorData ? this.props.serverActionStatus.errorData.errorMessage : "Error"}
                </div>
            )
        }


        let text: string = "";
        let isDisabled: boolean = false;
        
        switch(this.props.serverStatus) {
            case ServerStatus.Running:
                text = "Stop Server";
                break;
            case ServerStatus.Terminated:
                text = "Start Server";
                break;
            case ServerStatus.Pending:
                text = "Server is starting, Please wait";
                isDisabled = true;
                break;
            case ServerStatus.Stopping:
                text = "Server is stopping, Please wait";
                isDisabled = true;
                break;
            case ServerStatus.ShuttingDown:
                text = "Server is shutting down, Please wait";
                isDisabled = true;
                break;
            case ServerStatus.Stopped:
                text = "Server is saving, Please wait";
                isDisabled = true;
                break;
            case undefined:
                isDisabled = true;
                break;
        }

        if (this.clicked) {
            isDisabled = true;
            text = "Waiting..."
        }
        
        return(
        <button type="button" className="button btn-dark btn-block btn-lg shadow my-5 h-50 p-4 bg-dark rounded align-middle min-height-button" disabled={isDisabled} onClick={this.clickHandler.bind(this)}>
            {text}
        </button>)
    }


    private clickHandler = () =>{
        if(this.props.serverStatus)
            switch(this.props.serverStatus){
                case ServerStatus.Running:
                    this.clicked = true;
                    this.props.stopServer();
                    break;
                case ServerStatus.Terminated:
                    this.clicked = true;
                    this.props.startServer();
                    break;
                case ServerStatus.Pending:
                case ServerStatus.Stopping:
                case ServerStatus.Stopped:
                case ServerStatus.ShuttingDown:
                case undefined:
                    break;
            }
        setTimeout(this.reset.bind(this), 2500);
    }


    private reset(){
        this.clicked = false;
        this.props.refreshStatus();
    }
    
}




function mapStateToProps(state: IApplicationState){
    let status: ServerStatus | undefined = ServerStatus.Terminated;
    let statusFetchError = false;
    if(state.serverStatus.data){
        status = state.serverStatus.data.status;
    } else {
        status = undefined;
    }

    if(state.serverStatus.isError && !state.serverStatus.isFetching) {
        statusFetchError =  true;
    }
    
    

    return {
        serverStatus: status,
        statusFetchError: statusFetchError,
        serverActionStatus: state.serverActionStatus,
    };
}

function mapDispatchToProps(dispatch: Function) {
    return {
        startServer: ()=> dispatch(serverStartAction()),
        stopServer: () => dispatch(serverStopAction()),
        refreshStatus: () => dispatch(serverStatusAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartStopButton);