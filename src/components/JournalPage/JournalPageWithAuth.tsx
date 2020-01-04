import * as React from 'react'
import { Authenticator, Greetings, ConfirmSignUp } from 'aws-amplify-react';
import { Journal } from './Journal'


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




export const JournalPageWithAuth: React.FC = () => {
    // const [state, setState] = React.useState(initalJournalState)
    // const history = useHistory();
    

   
    // }
    // const toggleNewEntryDialog = () => {
    //     setState({
    //         ...state,
            
    //     })
    // }
    // const setAuthToken = (authToken: string) => {
    //     setState({
    //         ...state,
    //         authToken
    //     })
    // }
    // React.useEffect(() => {
    //     if(history.location.pathname === "/journal/new") {
    //         toggleNewEntryDialog()
    //     }
    // },[]);

    // let v: IJournalContext = {
    //     ...state,
    //     updateEntries,
    //     toggleNewEntryDialog,
    //     setAuthToken,
    // }
    
    
    return  (
        <main role="main">
            
            <Authenticator  theme={theme} signUpConfig={signUpConfig} hide={ [ Greetings,
                          ConfirmSignUp, ]}>
                <Journal/>
            </Authenticator>
            
            </main>
    )
}