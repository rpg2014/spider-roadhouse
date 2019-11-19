import React from 'react';
import { IServerStatus } from "../../interfaces/IServerStatus";
import { IFetchingState } from "../../interfaces/IFetchingState";
import IApplicationStore from "../../interfaces/IApplicationStore";
import { connect } from "react-redux";

// returns a div containing the server status and a refresh button? or on timer?





export function ServerStatus(props: IFetchingState<IServerStatus>) {
    let text = "Server is ";

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



function mapStateToProps(state: IApplicationStore){
    return state.serverStatus;
}

export default connect(mapStateToProps)(ServerStatus);