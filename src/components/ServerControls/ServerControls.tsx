import React from "react";
import logo from '../../minecraft-logo-17.png';
import { connect } from "react-redux";
import {SignOut} from 'aws-amplify-react';
import './ServerControls.css'
import IApplicationStore from "../../interfaces/IApplicationStore";
import { CognitoUser } from "amazon-cognito-identity-js";
import ServerText from "../Server/ServerText";
import StartStopButton from "../Server/StartStopButton";
import { ConfirmEmail } from '../Auth/ConfirmEmail'
import { useAuthData } from '../Auth/common';
import { LoadingSpinner } from "../GameOfLifePage/GameOfLifeWithNav";
import { ErrorAlert } from "../JournalPage/Error";


export interface IMainProps {
  authState?: any;
  authData?: CognitoUser;
}

//TODO convert to function and add useEffect to refresh the authtokens after an hour
// export class ServerControls extends React.Component<IMainProps> {
export const ServerControls = (props: IMainProps): JSX.Element => {
  useAuthData(props.authData)
  if (props.authState === "confirmSignUp") {
    return <ConfirmEmail />
  }

  if (props.authState === "loading") {
    return <LoadingSpinner variant="light" />
  }

  if (props.authState === "signedIn" && props.authData) {
    return (
      <div className=' w_85 m-auto'>
        <div className="container h-40">
          <img src={logo} className="App-logo mx-auto d-block" alt="logo" />
        </div>
        <div className='container-fluid d-block h-25'>
          <ServerText />
        </div>
        <div className="h-25 pt-5 pb-3 align-middle  mx-auto start-button">
          <StartStopButton />
        </div>
        <SignOut />
      </div>
    );
  }
  return <ErrorAlert errorDetail={{
    errorMessage: "Something went wrong, try refreshing the page.  If that doesn't work, contact Parker.",
    httpStatus: 500
  }}/>;
}



function mapStateToProps(state: IApplicationStore) {
  return{
    accessToken: state.authDetails.accessToken,
  }
}


export default connect(mapStateToProps)(ServerControls);