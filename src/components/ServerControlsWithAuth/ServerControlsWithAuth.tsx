import React from 'react';
import logo from './logo.svg';
import { Route, Switch}from 'react-router'
import './ServerControlsWithAuth.css';
import { Provider } from 'react-redux';
import Button from '../Button';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import Amplify, { Auth } from 'aws-amplify';
import { Authenticator, ForgotPassword } from 'aws-amplify-react';

import createInitialStore, {history} from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import  ServerControls  from '../ServerControls';
import { string } from 'prop-types';


export const store = createInitialStore();
// import Amplify from 'aws-amplify';

Amplify.configure({
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
        
        // REQUIRED - Amazon Cognito Region
        region: 'us-east-1',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        // identityPoolRegion: ' us-east-1',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_mX9fI3lzt',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '333d4m712mtbsjpaj5efdj0fh4',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        // mandatorySignIn: false,

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        cookieStorage: {
        // REQUIRED - Cookie domain (only required if cookieStorage is provided)
            domain: 'd10bpp6au03ynd.cloudfront.net',
        // OPTIONAL - Cookie path
            path: '/',
        // OPTIONAL - Cookie expiration in days
            expires: 1, //365,
        // OPTIONAL - Cookie secure flag
        // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
            secure: true
        },

        // OPTIONAL - customized storage object
        // storage: new MyStorage(),
        
        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        // authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
});

// You can get the current config object
// const currentConfig = Auth.configure();

const signUpConfig= {
    hiddenDefaults: ["phone_number"],
}


const ServerControlsWithAuth: React.FC = () => {
  return (
	<div>
      <Authenticator signUpConfig={signUpConfig}>
          <ServerControls />
        </Authenticator>
     </div>
    )
}


//{/* // Optionally hard-code an initial state
    // authState="signIn"
    // Pass in an already authenticated CognitoUser or FederatedUser object
    //authData={CognitoUser | 'username'} 
    // Fired when Authentication State changes
    // onStateChange={(authState) => console.log(authState)} 
    // An object referencing federation and/or social providers 
    // The federation here means federation with the Cognito Identity Pool Service
    // *** Only supported on React/Web (Not React Native) ***
    // For React Native use the API Auth.federatedSignIn()
    // federated={myFederatedConfig}
    // A theme object to override the UI / styling https://github.com/aws-amplify/amplify-js/blob/master/packages/aws-amplify-react/src/Amplify-UI/Amplify-UI-Theme.jsx
    // theme={myCustomTheme} 
    // Hide specific components within the Authenticator
    // hide={  *///}
    //     [
    //         Greetings,
    //         SignIn,
    //         ConfirmSignIn,
    //         RequireNewPassword,
    //         SignUp,
    //         ConfirmSignUp,
    //         VerifyContact,
    //         ForgotPassword,
    //         TOTPSetup,
    //         Loading
    //     ]
    // }
    // // or hide all the default components
    // hideDefault={true}
    // Pass in an aws-exports configuration
    // amplifyConfig={myAWSExports}
    // Pass in a message map for error strings
    // errorMessage={myMessageMap}

    // Default components can be customized/passed in as child components. 
    // Define them here if you used hideDefault={true}
    /* <Greetings/>
    <SignIn />
    <ConfirmSignIn/>
    <RequireNewPassword/>
    <SignUp/>
    <ConfirmSignUp/>
    <VerifyContact/>
    <ForgotPassword/>
    <TOTPSetup/>
    <Loading/> */


export default ServerControlsWithAuth;
  // Render a sign out button once logged in
  // includeGreetings: true, 
  // signUpConfig: {
  //   hiddenDefaults: ["phone_number"],
  
  // }
  // Show only certain components
 // authenticatorComponents: [MyComponents],
  // display federation/social provider buttons 
  // federated: {myFederatedConfig}, 
  // customize the UI/styling
  // theme: {myCustomTheme}
// });