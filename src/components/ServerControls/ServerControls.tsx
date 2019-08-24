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


export interface IMainProps {
  authState?: any;
  authData?: CognitoUser;
  saveAccessToken: (accessToken: CognitoAccessToken) => void,
}

export class ServerControls extends React.Component<IMainProps> {

  componentDidUpdate(){
    if(this.props.authData && this.props.authState){
      try {
        if(this.props.authData.getSignInUserSession() !== null){
          let userSession = this.props.authData.getSignInUserSession();
      
          if(userSession!==null && this.props.authState === "signedIn") {
          
            this.props.saveAccessToken(userSession.getAccessToken());
          }
        }
        
      } catch (error) {
        
      }
    }
  }

	
	render() {
    if(this.props.authState === "confirmSignUp"){
      return(
      <>
        <div className=' alert alert-info container mt-5' role='alert'>
          Check your email for the verification link.
        </div>
      </>
      )
    }

		if(this.props.authState === "signedIn" && this.props.authData){
      return ( 
        <div className='  h-100'>
          <div className="container h-40">
            <img src={logo} className="App-logo mx-auto d-block" alt="logo" />
          </div>
          <div className='container-fluid d-block h-25'>
            <ServerText/>
          </div>
          <div className="h-25 py-5   align-middle  mx-auto start-button">
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