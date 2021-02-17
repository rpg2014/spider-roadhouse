import React from "react";
import logo from '../../minecraft-logo-17.png';
import { connect } from "react-redux";
import {SignOut} from 'aws-amplify-react';
import './ServerControls.css'
import IApplicationStore, { ServerType } from "../../interfaces/IApplicationStore";
import { CognitoUser } from "amazon-cognito-identity-js";
import ServerText from "../Server/ServerText";
import StartStopButton from "../Server/StartStopButton";
import { ConfirmEmail } from '../Auth/ConfirmEmail'
import { useAuthData } from '../Auth/common';
import { LoadingSpinner } from "../LoadingSpinner";
import { Button } from "react-bootstrap";
import { setServerTypeAction } from "../../actions/setServerTypeAction";


export interface IMainProps {
  authState?: any;
  authData?: CognitoUser;
  serverType: ServerType
  setServerType: (serverType: ServerType) => void
}

//TODO convert to function and add useEffect to refresh the authtokens after an hour
// export class ServerControls extends React.Component<IMainProps> {
export const ServerControls = (props: IMainProps): JSX.Element => {
  useAuthData(props.authData)
  if (props.authState === "confirmSignUp") {
    return <ConfirmEmail />
  }

  if(props.authState === "loading") {
    return (
        <div className='m-auto text-center'>

            <div className='display-1 text-muted'>Logging in...</div>
            <LoadingSpinner variant='dark' />
        </div>
    )
}

  if (props.authState === "signedIn" && props.authData) {
    return (
      <div className=' w_85 m-auto'>
        <div className="container h-40">
          
          {props.serverType === ServerType.Minecraft ? <img src={logo} className="App-logo mx-auto d-block" alt="logo" />
          : <h1>Factorio</h1>

    }
          
        </div>
        <div className='container-fluid d-block h-25'>
          <ServerText />
        </div>
        <div className="h-25 pt-5 pb-3 align-middle  mx-auto start-button">
          <StartStopButton />
        </div>
        <div className ='mb-4'>
        <Button className='align-middle' variant='dark' onClick={()=> {
          if(props.serverType === ServerType.Minecraft) {
            props.setServerType(ServerType.Factorio)
          }else{
            props.setServerType(ServerType.Minecraft)
          }
        }}>Toggle Server type</Button>
        </div>
        <SignOut />
      </div>
    );
  }
  return <>{undefined}</>;
  // return <ErrorAlert errorDetail={{
  //   errorMessage: "Something went wrong, try refreshing the page.  If that doesn't work, contact Parker.",
  //   httpStatus: 500
  // }}/>;
}



function mapStateToProps(state: IApplicationStore) {
  return{
    accessToken: state.authDetails.accessToken,
    serverType: state.serverType,
  }
}

function mapDispatchToProps(dispatch: Function){
  return {
    setServerType: (serverType:ServerType) => dispatch(setServerTypeAction(serverType)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ServerControls);