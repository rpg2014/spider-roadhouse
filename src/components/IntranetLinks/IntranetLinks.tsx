import * as React from 'react'
import { AuthProps, useAuthData, getHeaders } from '../Auth/common'
import { ConfirmEmail } from '../Auth/ConfirmEmail'
import { LoadingSpinner } from '../LoadingSpinner'
import { useFetch } from 'react-async'
import { HTTPMethod } from '../../epics/common'
import { DYNAMIC_DNS_URL } from '../../store/paths'
import './intranetLinks.css'
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
        return (<div className='row   mx-auto  translucent-bg rounded d-flex flex-column width-control'>
            
        <p className='  text-muted px-3 pt-3 h5 lead'>These links only work when you're on my wifi / vpn</p>
            <div className='    text-center p-2'>
                <a href={"http://192.168.0.14:32400"}>
                    <Button className='m-1 text-muted' size='lg' variant='outline-light' >Plex</Button>
                </a>
                <a href={"http://192.168.0.14:8112"} >
                    <Button className='m-1 text-muted' size='lg' variant='outline-light'>Deluge Web App</Button>
                </a>
                <a href={"http://192.168.0.14/admin"} >
                    <Button className='m-1 text-muted' size='lg' variant='outline-light'>Pi admin</Button>
                </a>
            </div>
        <p className='pb-3  text-muted h4 lead'>VPN IP address: {ipAddress}</p>
        </div>
        
        )
    }
   return null;
}