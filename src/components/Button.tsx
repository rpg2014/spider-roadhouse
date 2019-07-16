import React from "react";
import IApplicationState from '../interfaces/IApplicationStore';
import { connect } from "react-redux";
import { pingAction } from "../actions/pingAction";



interface IPingButtonProps {
    ping?: () => void,
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




function mapStateToProps(state: IApplicationState) : IPingButtonProps{
    let text = "click button";
    let error: boolean  = false;
    let errorData: string = "";
    if(state.pingState !== undefined){
        console.log(state.pingState)
        error = state.pingState.isError;  
    }

    if (state.pingState && state.pingState.data) {
        text = state.pingState.data.text;
    }
    
    if(state.pingState && state.pingState.errorData){
          
        errorData = state.pingState.errorData.errorMessage
    }
    return {
        text,
        isError: error,
        errorData,
    };
}

function mapDispatchToProps(dispatch: Function) {
    return {
        ping: ()=> dispatch(pingAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PingButton);