import React, { useState, useEffect } from 'react';
import { IServerStatus, ServerStatus } from '../../../interfaces/IServerStatus';
import { IFetchingState } from '../../../interfaces/IFetchingState';
import IApplicationStore from '../../../interfaces/IApplicationStore';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { useFetch } from 'react-async';
import { getHeaders } from '../../Auth/common';
import { HTTPMethod } from '../../../epics/common';
import { SPIDERMAN_BASE_URL, JOURNAL, STATUS, DETAILS } from '../../../store/paths';
import { Alert } from 'react-bootstrap';
import { IServerDetails } from '../../../interfaces/IServerDetails';
import { Link } from 'react-router-dom';

// doesn't work yet
export const ServerStatusWithTransistion = () => (
  <CSSTransition in timeout={500} classNames="fade-in" exit={false} unmountOnExit>
    <Status />
  </CSSTransition>
);

export function Status() {
  let text = 'Server is ';
  const props: IFetchingState<IServerStatus> = useSelector((state: IApplicationStore) => state.serverStatus);
  if (props.isFetching) {
    return (
      <div className="display-4 text-light">
        {text}
        <div className="spinner-grow  align-middle text-light"></div>
      </div>
    );
  }

  if (props.isError && props.errorData) {
    if (props.errorData.errorMessage === 'ajax error') {
      return <div className="display-4 text-light">Offline or backend error</div>;
    }
    return <div className="display-4 text-light">{props.errorData.errorMessage}</div>;
  }

  return <div className="display-4 text-light">{props.data ? text + props.data.status : 'Press Refresh'}</div>;
}

export const MiniServerStatus: React.FC<any> = () => {
  const authToken = useSelector((state: IApplicationStore) =>
    state.authDetails.accessToken ? state.authDetails.accessToken.getJwtToken() : ''
  );
  const headers = getHeaders(authToken);
  const [child, setChild] = useState(<div>Connecting to backend...</div>);
  const [visible, setVisible] = useState(true);

  const options: RequestInit = {
    headers,
    method: HTTPMethod.GET,
  };

  const serverStatus = useFetch<IServerStatus>(SPIDERMAN_BASE_URL + STATUS, options, { json: true });

  const serverDetails = useFetch<IServerDetails>(SPIDERMAN_BASE_URL + DETAILS, options, { defer: true, json: true });

  useEffect(() => {
    if (authToken && serverStatus.data?.status === ServerStatus.Running && !serverDetails.isFulfilled) {
      serverDetails.run();
    }
  }, [authToken, serverDetails]);

  useEffect(() => {
    let newChild = <></>;
    console.log(serverStatus.isFulfilled, serverStatus.error, serverStatus.data, serverDetails.data, authToken);
    if (localStorage.getItem('amplify-authenticator-authState') === 'signedIn') {
      if (serverStatus.isPending) {
        newChild = <div>Fetching Status...</div>;
      } else if (!serverStatus.isFulfilled && serverStatus.error && serverStatus.error.message !== '401 Unauthorized') {
        newChild = <div>Unable to reach backend</div>;
      } else if (serverStatus.error && serverStatus.error.message !== '401 Unauthorized') {
        //ignore auth errors for now, we just wanna ping backend
        newChild = <Alert variant="warning">{serverStatus.error.message}</Alert>;
      }

      if (serverStatus.isFulfilled) {
        if (serverStatus.data?.status === ServerStatus.Running) {
          let text;
          if (serverDetails.isFulfilled && serverDetails.data) {
            text = (
              <>
                Minecraft Server is up at: <u>{serverDetails.data.domainName}</u>
              </>
            );
          } else {
            text = <>Minecraft Server is up</>;
          }
          newChild = (
            <>
              <div>
                {text} <i className="fas fa-power-off text-success link text-center mx-1"></i>
              </div>
            </>
          );
        } else if (serverStatus.data?.status === ServerStatus.Terminated) {
          newChild = <div></div>;
        } else {
          let text = 'Connected';
          newChild = <div>{text}</div>;
          // setTimeout(() => {
          //     if(serverStatus.data?.status !== ServerStatus.Running) {
          //     setChild(<div>{text+ "  Done!"}</div>);
          //     }
          // },500)
          // setTimeout(() => {
          //     if(serverStatus.data?.status !== ServerStatus.Running)
          //     setVisible(false);
          // },1000)
        }
        setChild(newChild);
        if (serverStatus.data?.status != ServerStatus.Running && visible) {
          setVisible(false);
        } else if (!visible) {
          setVisible(true);
        }
      }
    } else {
      if (visible) {
        setChild(<div>Please make an account to see server status</div>);
        setTimeout(() => {
          setVisible(false);
        }, 2000);
      }
    }
  }, [serverStatus.isFulfilled, serverStatus.error, serverStatus.data, serverDetails.data, authToken]);

  return (
    <CSSTransition
      in={visible}
      timeout={300}
      //todo make this look fancier
      classNames="fade-in"
      unmountOnExit
      exit
    >
      <div className="w-25 mx-auto center d-flex ">
        {child}

        {/* <Button onClick={} */}
      </div>
    </CSSTransition>
  );
};

// export const useStatus = () => {
//     const [lastUpdateTime, setLastUpdateTime] = useState(0);
//     const authToken = useSelector((state: IApplicationStore) => state.authDetails.accessToken? state.authDetails.accessToken.getJwtToken(): "")
//     const headers = getHeaders(authToken);
//     const options: RequestInit = {
//         headers,
//         method: HTTPMethod.GET,
//     }
//     const {data, error ,isPending, run, isFulfilled} = useFetch<IServerStatus>(SPIDERMAN_BASE_URL + STATUS, options )

//     var state: IFetchingState<IServerStatus> = useReducer(serverStatusReducer, initalFetchingStatusState,)
// }
