import React from 'react';
import './ServerControlsWithAuth.css';
import { Authenticator, Greetings, ConfirmSignUp } from 'aws-amplify-react';
import  ServerControls  from '../ServerControls/ServerControls';





// import Amplify from 'aws-amplify';



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
      
              
              <main role="main" className="inner row cover mb-auto mt-2">       
                      <Authenticator className='col max_width ' theme={theme} signUpConfig={signUpConfig} hide={ [ Greetings,
                          ConfirmSignUp, ]}>
                          <ServerControls />
                      </Authenticator>
              </main>

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