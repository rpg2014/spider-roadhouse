import * as React from 'react';
import { Authenticator, Greetings, ConfirmSignUp } from 'aws-amplify-react';
import { Journal } from './Journal';
import { Loading } from 'aws-amplify-react';
import { theme, signUpConfig } from '../../Auth/common';

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

  React.useEffect(() => {
    document.title = 'Journal';
  }, []);

  return (
    <main role="main">
      <Authenticator theme={theme} signUpConfig={signUpConfig} hide={[Greetings, ConfirmSignUp, Loading]}>
        <Journal />
      </Authenticator>
    </main>
  );
};
