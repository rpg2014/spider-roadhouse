import * as React from 'react';
import { Authenticator, Greetings, ConfirmSignUp } from 'aws-amplify-react';
import { Loading } from 'aws-amplify-react';
import { IntranetLinks } from './IntranetLinks';
import { theme, signUpConfig } from '../../Auth/common';

export const IntranetLinksWithAuth: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Links';
  }, []);

  return (
    <main role="main" className=" h-50 my-auto">
      <Authenticator theme={theme} signUpConfig={signUpConfig} hide={[Greetings, ConfirmSignUp, Loading]}>
        <IntranetLinks />
      </Authenticator>
    </main>
  );
};
