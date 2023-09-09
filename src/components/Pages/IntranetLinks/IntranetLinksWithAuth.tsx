import * as React from 'react';
import { Authenticator, Greetings, ConfirmSignUp } from 'aws-amplify-react';
import { Loading } from 'aws-amplify-react';
import { IntranetLinks, UrlConfig } from './IntranetLinks';
import { theme, signUpConfig } from '../../Auth/common';
import { Button } from 'react-bootstrap';


const ProjectLinkConfig: UrlConfig[] = [
  {url: 'https://nextjs.parkergiven.com', name: "NextJs Tutorial"},
  {url: 'https://steezy.parkergiven.com', name: "Skiing points site"}
]

export const IntranetLinksWithAuth: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Links';
  }, []);

  return (
    <main role="main" className=" h-50 my-auto">
      {/* <div className="row   mx-auto  translucent-bg rounded d-flex flex-column width-control">
      <p className="  text-muted px-3 pt-3 h5 lead">Various tech projects of mine</p>
      <div className="  row-md  text-center p-2">
        {ProjectLinkConfig.map(({ url, name }) => {
          return (
            <a href={url} key={name}>
              <Button className="m-1 text-muted" size="lg" variant="outline-light">
                {name}
              </Button>
            </a>)
        })}
      </div>
      </div> */}
      <Authenticator theme={theme} signUpConfig={signUpConfig} hide={[Greetings, ConfirmSignUp, Loading]}>
        <IntranetLinks />
      </Authenticator>
    </main>
  );
};
