import React from "react";
import logo from '../../minecraft-logo-17.png';
import { connect } from "react-redux";
import {SignOut} from 'aws-amplify-react';
import './ServerControls.css'
import { registerAccessToken } from "../../actions/authAction";
import IApplicationStore from "../../interfaces/IApplicationStore";
import { CognitoAccessToken, CognitoUser } from "amazon-cognito-identity-js";
import ServerText from "../Server/ServerText";
import StartStopButton from "../StartStopButton";
import { ConfirmEmail } from '../Auth/ConfirmEmail'
import {extractAuthToken } from '../Auth/common';


export interface IMainProps {
  authState?: any;
  authData?: CognitoUser;
  saveAccessToken: (accessToken: CognitoAccessToken) => void,
}

export class ServerControls extends React.Component<IMainProps> {

  componentDidUpdate(){
    if(this.props.authData && this.props.authState){
      let accessToken = extractAuthToken(this.props.authData, this.props.authState)
      if(accessToken){
        this.props.saveAccessToken(accessToken)
      }
    }
  }

	
	render() {
    if(this.props.authState === "confirmSignUp"){
      return(
      <ConfirmEmail/>
      )
    }

		if(this.props.authState === "signedIn" && this.props.authData){
      return ( 
        <div className=' w_85 m-auto'>
          <div className="container h-40">
            <img src={logo} className="App-logo mx-auto d-block" alt="logo" />
          </div>
          <div className='container-fluid d-block h-25'>
            <ServerText/>
          </div>
          <div className="h-25 pt-5 pb-3 align-middle  mx-auto start-button">
          <StartStopButton/>
          </div>
          <SignOut/>
        </div>
        
      );
	  }
	return null;
 }
} 


function mapStateToProps(state: IApplicationStore) {
  return{
    accessToken: state.authDetails.accessToken,
  }
}

function mapDispatchToProps(dispatch: Function) {
  return {
      saveAccessToken: (accessToken: CognitoAccessToken) => dispatch(registerAccessToken(accessToken)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ServerControls);