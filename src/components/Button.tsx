import React from "react";
import IApplicationState from '../interfaces/IApplicationStore';
import { connect } from "react-redux";
import { pingAction } from "../actions/pingAction";
import { saveAccessToken } from "../actions/authAction";
import { CognitoAccessToken } from "amazon-cognito-identity-js";



interface IPingButtonProps {
    ping: () => void,
    saveAccesstoken: (accessToken: CognitoAccessToken) => void,
    text: string,
    isError: boolean,
    errorData: string,
};

export class PingButton extends React.Component<IPingButtonProps> {
    constructor(props:IPingButtonProps){
        super(props);
        
    }


    render() {
        if(this.props.isError){
            return(<h1>{this.props.errorData}</h1>)
        }
        return(<button type="button" onClick={this.clickHandler.bind(this)}>{this.props.text}</button>)
    }


    private clickHandler = () =>{
        if(this.props.ping){
            this.props.ping()
        }
    }
    
}




function mapStateToProps(state: IApplicationState){
    let text = "fug"
    let error: boolean  = false;
    let errorData: string = "";
    console.log(state.authDetails)
    if(state.authDetails !== undefined){
        if (state.authDetails.accessToken) {
            text = state.authDetails.accessToken.getJwtToken();
        }
        error = state.pingState.isError;  
    }
    

    // if (state.pingState && state.pingState.data) {
    //     text = state.pingState.data.text;
    // }
    
    // if(state.pingState && state.pingState.errorData){
          
    //     errorData = state.pingState.errorData.errorMessage
    // }
    return {
        text,
        isError: error,
        errorData,
    };
}

function mapDispatchToProps(dispatch: Function) {
    return {
        ping: ()=> dispatch(pingAction()),
        saveAccesstoken: (accessToken: CognitoAccessToken) => dispatch(saveAccessToken(accessToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PingButton);