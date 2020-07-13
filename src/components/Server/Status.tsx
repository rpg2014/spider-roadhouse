import React, { useState, useReducer, useEffect } from 'react';
import { IServerStatus, ServerStatus } from "../../interfaces/IServerStatus";
import { IFetchingState } from "../../interfaces/IFetchingState";
import IApplicationStore from "../../interfaces/IApplicationStore";
import { useSelector } from "react-redux";
import { CSSTransition } from 'react-transition-group';
import { useFetch } from 'react-async';
import { useAuthData, getHeaders } from '../Auth/common';
import { HTTPMethod } from '../../epics/common';
import { SPIDERMAN_BASE_URL, JOURNAL, STATUS, DETAILS } from '../../store/paths';
import { serverStatusReducer, initalFetchingStatusState } from '../../reducers/serverStatusReducer';
import { Alert, Button } from 'react-bootstrap';
import { IServerDetails } from '../../interfaces/IServerDetails';

// doesn't work yet
export const ServerStatusWithTransistion = () => (
    <CSSTransition in timeout={500} classNames='fade-in' exit={false}
                            unmountOnExit>
                                <Status/>
                            </CSSTransition>
)



export function Status() {
    let text = "Server is ";
    const props: IFetchingState<IServerStatus> = useSelector((state: IApplicationStore) => state.serverStatus)
    if(props.isFetching){
        return (<div className="display-4 text-light">
                    {text}
                    <div className="spinner-grow  align-middle text-light"></div>
                </div>)
    }

    if(props.isError && props.errorData){
        if(props.errorData.errorMessage ==="ajax error"){
            return (
                <div className='display-4 text-light'>Offline or backend error</div>
            )
        }
        return (<div className="display-4 text-light">{props.errorData.errorMessage}</div>);
    }


    return (
        <div className="display-4 text-light">
            {props.data? text + props.data.status : "Press Refresh"}
        </div>
    )
}


export const MiniServerStatus: React.FC<any> = () => {
    const authToken = useSelector((state: IApplicationStore) => state.authDetails.accessToken? state.authDetails.accessToken.getJwtToken(): "")
    const headers = getHeaders(authToken);
    const [child, setChild] = useState(<div>Warming up backend...</div>)
    const [visible, setVisible] = useState(true);
    
    const options: RequestInit = {
        headers,
        method: HTTPMethod.GET,
     
    }
  

    const serverStatus = useFetch<IServerStatus>(SPIDERMAN_BASE_URL + STATUS, options, {json: true} )
    
    const serverDetails = useFetch<IServerDetails>(SPIDERMAN_BASE_URL + DETAILS, options, {defer: true} )
    
    
    //doens't work the way its supposted to yet.  need to defer the use fetches until an auth token? maybe?
    useEffect(()=> {
        // console.log("fetching mini status")
        // serverStatus.reload();
        if(authToken){
            serverDetails.reload()
        }
    },[authToken])
    
    
    useEffect(()=> {
        let newChild = <></>;
        
        if(serverStatus.data?.status != ServerStatus.Running) {
            setVisible(false);
        }
        if(serverStatus.isFulfilled && serverStatus.error && !authToken) {
            setVisible(false)
        }else 
            if(serverStatus.isPending) {
                newChild = <div>Fetching Status...</div>
            }else
            if(!serverStatus.isFulfilled && serverStatus.error && serverStatus.error.message !== "401 Unauthorized") {
                
                newChild= <div>Unable to reach backend</div>
            }else
            //ignore auth errors for now, we just wanna ping backend
            if(serverStatus.error && serverStatus.error.message !== "401 Unauthorized") {
                newChild= <Alert variant='warning'>{serverStatus.error.message}</Alert>
                setTimeout(() => {
                    setVisible(false);
                },500)
            }else
            

            //TODO: this bottom part isn't working.  It's not displaying the url when is Running.  
            //has to do with the auth token not being present on the first request, and the retrys not working. 
            //right now we pretty much are just gonna ping the backend.  
            console.log( serverStatus.data)
            if(serverStatus.data?.status === ServerStatus.Running) {
                console.log("in outer")
                let text;
                if(serverDetails.isFulfilled && serverDetails.data) {
                    text = <>Minecraft Server is up at: <button className='alert-link'>{serverDetails.data.dnsName}</button></>;

                }else {
                    text = <>Minecraft Server is up   </>
                }
                newChild = <>
                            <div >{text} <i className="fas fa-power-off text-success text-center mx-1"></i></div>
                            </>
            }else{
                let text =   "Warming up backend..."
                newChild = <div >{text}</div>;
                setTimeout(() => {
                    setChild(<div>{text+ "  Done!"}</div>);
                },500)
                // setTimeout(() => {
                //     setVisible(false);
                // },1000)
            }
            
            setChild(newChild);
        
    },[serverStatus.isFulfilled, serverStatus.error, serverStatus.data, serverDetails, authToken])

    

    return (
        <CSSTransition
            in={visible}
            timeout={300}
            classNames="fade-in"
            unmountOnExit
            exit
            >
            <div className='w-25 mx-auto center d-flex '>
                
                {child}
                
                {/* <Button onClick={} */}
            </div>
        </CSSTransition>
    )
    
}

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