import React from "react";
import IApplicationState from '../interfaces/IApplicationStore';
import { connect } from "react-redux";
import { pingAction } from "../actions/pingAction";
import { registerAccessToken } from "../actions/authAction";
import { CognitoAccessToken } from "amazon-cognito-identity-js";
import { ServerStatus } from '../interfaces/IServerStatus';



interface StartStopButtonProps {
    serverStatus?: ServerStatus
    startServer: ()  => void,
    stopServer: () => void,
};

export class StartStopButton extends React.Component<StartStopButtonProps> {
    constructor(props:StartStopButtonProps){
        super(props);
        
    }


    render() {
        return(
        <button type="button" className='button btn-light btn-block btn-lg shadow my-5 h-50 bg-white rounded align-middle min-height-button' onClick={this.clickHandler.bind(this)}>
            Start Server
        </button>)
    }


    private clickHandler = () =>{
        
    }
    
}




function mapStateToProps(state: IApplicationState){
    let status = ServerStatus.Terminated;
    
    if(state.serverStatus.data){
        status = state.serverStatus.data.status;
    }

    return status;
}

function mapDispatchToProps(dispatch: Function) {
    return {
        stopServer: ()=> dispatch(pingAction()),
        startServer: () => dispatch(pingAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartStopButton);