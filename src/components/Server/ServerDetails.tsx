import React from 'react';
import IApplicationStore from "../../interfaces/IApplicationStore";
import {connect} from 'react-redux';
import { IServerDetails } from '../../interfaces/IServerDetails';
import { IFetchingState } from '../../interfaces/IFetchingState';


// returns a div that contains the server details such as dns + port .. will not render if server is not running.  


interface IServerDetailsProps {
    serverDetails: IFetchingState<IServerDetails>,
}

export function ServerDetails(props: IServerDetailsProps): JSX.Element{
    let text = "Server Url: "

    if(props.serverDetails.isFetching){
        return (<div className="display-4 text-light">
                    {text}
                    <div className="spinner-grow align-middle text-light"></div>
                </div>)
    }

    if(props.serverDetails.isError && props.serverDetails.errorData){
        return (<div className="display-4 text-light text-center ">{"Error: " +props.serverDetails.errorData.errorMessage}</div>);
    }


    return (
        <div className='display-4 text-light text-center'>
            {props.serverDetails.data? text + props.serverDetails.data.domainName : "Press Refresh"}
        </div>
    )

}

function mapStateToProps(state: IApplicationStore){
    let serverDetails:IFetchingState<IServerDetails> = state.serverDetails;
   
    return {
        serverDetails,
    }
}


export default connect(mapStateToProps)(ServerDetails);