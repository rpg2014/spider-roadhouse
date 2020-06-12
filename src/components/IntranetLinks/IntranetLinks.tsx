import * as React from 'react'
import { AuthProps, useAuthData, getHeaders } from '../Auth/common'
import { ConfirmEmail } from '../Auth/ConfirmEmail'
import { LoadingSpinner } from '../LoadingSpinner'
import { useFetch } from 'react-async'
import { HTTPMethod } from '../../epics/common'
import { DYNAMIC_DNS_URL } from '../../store/paths'
import { Alert, Button } from 'react-bootstrap'


interface IDynamicDNSResponse {
    serviceName: string,
    IP: string,
}

export const IntranetLinks: React.FC<AuthProps> =(props: AuthProps & {})=> {
    useAuthData(props.authData);
    const authToken = props.authData?.getSignInUserSession()?.getAccessToken().getJwtToken()
    const [ipAddress, setIpAddress] = React.useState<string | null>(null);
    let headers;
    if(authToken) {
        headers = getHeaders(authToken);
    }

    const options: RequestInit = {
        headers,
        method: HTTPMethod.GET,
    }
    
    //fetch raspberry pi ip address on load
    const {data, error, isPending, run, isFulfilled} = useFetch<IDynamicDNSResponse>(DYNAMIC_DNS_URL +"?serviceName="+'raspberrypi', options, {defer : true, json: true})

    React.useEffect(() => {
        if(authToken && props.authState === "signedIn") {
            console.log("fetching")
            run()
        }
    },[authToken])

    React.useEffect(()=> {
        if(data) {
            setIpAddress(data.IP)
        }
    }, [data])

    
    if(props.authState === "confirmSignUp"){
        return(
        <ConfirmEmail/>
        )
    }
    if(props.authState === "loading") {
        return (
            <div className='m-auto text-center'>

                <div className='display-1 text-muted'>Logging in...</div>
                <LoadingSpinner variant='dark' />
            </div>
        )
    }

    if(isPending){
        return (
            <div className='m-auto text-center'>
                <div className='display-4 text-muted'>Fetching URLs </div>
                <LoadingSpinner variant='dark' />
            </div>
        )
    }
    if(isFulfilled && error){
        return (
            <div className='m-auto text-center'>
                <Alert variant='danger'>
                    <Alert.Heading>Something went wrong</Alert.Heading>
                    <p>{error.message}</p>
                    <p>Try refreshing the page</p>
                </Alert>
            </div>
        )
    }
    if(isFulfilled) {
        return (
            <div className='m-auto text-center pt-3'>
                <a href={"http://"+ipAddress+":32400"}>
                    <Button size='lg' variant='dark' >Plex</Button>
                </a>
                <a href={"http://"+ipAddress+":8112"} >
                    <Button className='m-2' size='lg' variant='dark'>Deluge Web App</Button>
                </a>
                <a href={"http://"+ipAddress +"/admin"} >
                    <Button className='m-2' size='lg' variant='dark'>Pi admin</Button>
                </a>
            </div>
        )
    }
   return null;
}