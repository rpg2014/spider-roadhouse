import React from 'react';
import './ServerControlsWithAuth.css';
import Amplify from 'aws-amplify';
import { Authenticator, Greetings, ConfirmSignUp } from 'aws-amplify-react';
import createInitialStore from '../../store/store';
import  ServerControls  from '../ServerControls/ServerControls';
import { NavBar } from '../NavBar/NavBar';




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
            domain: 'pwa.parkergiven.com',//'d10bpp6au03ynd.cloudfront.net',
        // OPTIONAL - Cookie path
            path: '/',
        // OPTIONAL - Cookie expiration in days
            expires: 30, //365,
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
const containerCss = {
    backgroundColor: '#5c5c5c',
    color: '#f8f9fa'
}
const whiteColor = {
    color: '#f8f9fa',
}
const inputBox = {
    borderColor: '#f8f9fa',
    backgroundColor: 'transparent',
    border: '1px solid #f8f9fa',
    //color: 'f8f9fa'
}
const buttonTheme ={
    borderColor: '#f8f9fa',
    backgroundColor: 'transparent',
    border: '1px solid #f8f9fa',
    color: 'f8f9fa'
}


const theme = {
    formSection: containerCss,
    sectionHeader: whiteColor,
    inputLabel: whiteColor,
    hint: whiteColor,
    sectionFooter: whiteColor,
    input: inputBox,
    button: buttonTheme,
    signInButton: buttonTheme,
}


const ServerControlsWithAuth: React.FC = () => {
  return (
      <div className='server-controls-bg container-fluid'>
          <div className='h-100 p-3 mx-auto flex-column'>
              <div className='row justify-content-center'>
              <div className='cover-container col '>
                <NavBar />
              </div>
              </div>
              <main role="main" className="inner cover mb-auto mt-2 row">
                  <div className='h-100 col'>
                      <Authenticator className='h-100 ' theme={theme} signUpConfig={signUpConfig} hide={ [ Greetings,
                          ConfirmSignUp, ]}>
                          <ServerControls />
                      </Authenticator>
                  </div>
              </main>
          </div>
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