import * as React from 'react';
import { useFetch } from 'react-async';
import './intranetLinks.css';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { HTTPMethod } from '../../../epics/common';
import { DYNAMIC_DNS_URL } from '../../../store/paths';
import { AuthProps, useAuthData, getHeaders } from '../../Auth/common';
import { ConfirmEmail } from '../../Auth/ConfirmEmail';
import { LoadingSpinner } from '../../LoadingSpinner';

interface IDynamicDNSResponse {
  serviceName: string;
  IP: string;
}
export type UrlConfig = {
  url: string;
  name: string;
}

const intranetLinkConfig: UrlConfig[] = [
  {url: 'http://192.168.0.14:32400', name: "Plex"},
  {url: 'http://192.168.0.14:8112', name: "Deluge"},
  {url: 'http://192.168.0.14/admin', name: "PiHole"},
  {url: 'http://dash.parkergiven.com', name: 'Bus Dashboard'},
  {url: 'http://fleet.parkergiven.com', name:'Fleet Monitor'},
  {url: 'http://notes.parkergiven.com', name: 'Notes'},
  {url: 'https://nextjs.parkergiven.com', name: "NextJs Tutorial"},
]



export const IntranetLinks: React.FC<AuthProps> = (props: AuthProps & {}) => {
  useAuthData(props.authData);
  const authToken = props.authData?.getSignInUserSession()?.getAccessToken().getJwtToken();
  const [ipAddress, setIpAddress] = React.useState<string | null>(null);
  const [highlightIndex, setHighlightIndex] = React.useState<number | null>(null);
  const [isHighlightingComplete, setIsHighlightingComplete] = React.useState(false);
  let headers;
  if (authToken) {
    headers = getHeaders(authToken);
  }

  const options: RequestInit = {
    headers,
    method: HTTPMethod.GET,
  };

  //fetch raspberry pi ip address on load
  const { data, error, isPending, run, isFulfilled } = useFetch<IDynamicDNSResponse>(
    DYNAMIC_DNS_URL + '?serviceName=' + 'raspberrypi',
    options,
    { defer: true, json: true }
  );

  React.useEffect(() => {
    if (authToken && props.authState === 'signedIn') {
      // console.log("fetching")
      run();
    }
  }, [authToken]);


  React.useEffect(() => {
    if (data) {
      setIpAddress(data.IP);
      let intervalId = setInterval(() => {
        if (highlightIndex === intranetLinkConfig.length - 1) {
          clearInterval(intervalId);
          setIsHighlightingComplete(true);
        } else {
          setHighlightIndex((prevIndex) => prevIndex=== null ? 0 : prevIndex + 1);
        }
      }, 200);
      return () => intervalId && clearInterval(intervalId);
    }
  }, [data]);

  if (props.authState === 'confirmSignUp') {
    return <ConfirmEmail />;
  }
  if (props.authState === 'loading') {
    return (
      <div className="m-auto text-center">
        <div className="display-1 text-muted">Logging in...</div>
        <LoadingSpinner variant="dark" />
      </div>
    );
  }
  if (isFulfilled && error) {
    return (
      <div className="m-auto text-center">
        <Alert variant="danger">
          <Alert.Heading>Something went wrong</Alert.Heading>
          <p>{error.message}</p>
          <p>Try refreshing the page</p>
        </Alert>
      </div>
    );
  }
  if (props.authState !== 'signedIn') {
    return null;
  }

  return (
    <div className="row   mx-auto  translucent-bg rounded d-flex flex-column width-control">
      <p className="  text-muted px-3 pt-3 h5 lead">These links only work when you're on my network</p>
      <div className="  row-md  text-center p-2">
        {intranetLinkConfig.map(({ url, name }, index) => {
          return (
            <a href={url} key={name}>
              <Button className="m-1 text-muted" size="lg" variant={`${index === highlightIndex ? '' : 'outline-'}light`}>
                {name}
              </Button>
            </a>)
        })}
      </div>
      <p className="pb-3  text-muted h4 lead row justify-content-center">
        VPN IP address:{' '}
        <span className="p-0 m-0">
          {isPending || !isFulfilled ? (
            <Spinner className="m-0 p-0" animation="grow" variant="light" size="sm" />
          ) : (
            `\t${ipAddress}`
          )}
        </span>
      </p>
    </div>
  );
};
