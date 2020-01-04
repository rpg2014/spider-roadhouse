import React from 'react'
import { serverStatusAction } from '../../actions/serverStatusAction';
import { connect } from "react-redux";
import { IServerStatus, ServerStatus } from '../../interfaces/IServerStatus';
import IApplicationStore from '../../interfaces/IApplicationStore';


export interface IRefreshButtonProps {
    fetchStatus: () => void;
    serverStatus?: IServerStatus;
}

interface IRefreshState {
    interval: NodeJS.Timeout;
}


export class RefreshButton extends React.Component<IRefreshButtonProps, IRefreshState> {
    constructor(props: IRefreshButtonProps){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
       this.setState({
           interval: setInterval(this.props.fetchStatus, 60000),
       });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    handleClick(){
        this.props.fetchStatus();
        
    }


    render() {
        return (<div >
            <button type="button" className="btn btn-outline-light" onClick={this.handleClick}><i className='fas fa-sync'></i></button>
        </div>)
    }
}


function mapStateToProps(state: IApplicationStore){
    let serverStatus = {
        status: ServerStatus.Terminated,
    }
    if(state.serverStatus.data){
        serverStatus = state.serverStatus.data;
    }
    return serverStatus;
}




function mapDispatchToProps(dispatch: Function){
    return {
        fetchStatus:  () => dispatch(serverStatusAction()),
        // fetchDetails: () => dispatch(serverDetailsAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefreshButton);