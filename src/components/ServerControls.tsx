import { render } from "react-dom";
import React from "react";
import logo from '../logo.svg';
import { ConnectedRouter } from "connected-react-router";
import { Provider, connect } from "react-redux";
import { store } from "./ServerControlsWithAuth/ServerControlsWithAuth";
import { Switch, Route } from "react-router";

import Button from "./Button";
import { saveAccessToken } from "../actions/authAction";
import IApplicationStore from "../interfaces/IApplicationStore";
import { CognitoAccessToken, CognitoUser } from "amazon-cognito-identity-js";
import { serverStatusAction } from "../actions/serverStatusAction";
import { IServerStatus } from "../interfaces/IServerStatus";
import { IFetchingState } from "../interfaces/IFetchingState";


export interface IMainProps {
  authState?: any;
  authData?: CognitoUser;
  serverStatus: IFetchingState<IServerStatus>,
  saveAccessToken: (accessToken: CognitoAccessToken) => void,
  fetchServerStatus: () => void,
}

export class ServerControls extends React.Component<IMainProps> {
	constructor(props: IMainProps, context: any) {
    super(props, context);
  }
  
  handleStatusClick(){
    this.props.fetchServerStatus();
    if(this.props.authData && this.props.authData.getSignInUserSession() !== null){
      let userSession = this.props.authData.getSignInUserSession();
      if(userSession!==null)
    this.props.saveAccessToken(userSession.getAccessToken());
    }
  }
	
	render() {
    let status = this.props.serverStatus.data? this.props.serverStatus.data.status : "stopped";
    let message = "Server is " + status;
    if(this.props.serverStatus.isFetching){
      message = 'loading'
    }
    let errorMessage = null
    if(this.props.serverStatus.isError){
      errorMessage = this.props.serverStatus.errorData ? this.props.serverStatus.errorData.errorMessage : "error of some sort"
    }

		if(this.props.authState === "signedIn"){
    return ( 
                    <div className="App">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                            <p>
                              {message}
                            </p>
                            <p>
                              {errorMessage}
                            </p>
                            <p>
                             <button onClick={this.handleStatusClick.bind(this)}>Click to refresh status</button>
                            </p>
          </header>
        </div>
    );
	}
	
	return null;
 }
} 



function mapStateToProps(state: IApplicationStore) {
  return{
    accessToken: state.authDetails.accessToken,
    serverStatus: state.serverStatus,
  }
}

function mapDispatchToProps(dispatch: Function) {
  return {
      saveAccessToken: (accessToken: CognitoAccessToken) => dispatch(saveAccessToken(accessToken)),
      fetchServerStatus: () => dispatch(serverStatusAction())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ServerControls);