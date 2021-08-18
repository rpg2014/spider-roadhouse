import React from 'react';
import { connect } from 'react-redux';
import RefreshButton from './RefreshButton';
import { Status } from './Status';
import ServerDetails from './ServerDetails';
import { serverStatusAction } from '../../../actions/serverStatusAction';
import { serverDetailsAction } from '../../../actions/serverDetailsActions';
import { IServerStatus, ServerStatus } from '../../../interfaces/IServerStatus';
import IApplicationStore from '../../../interfaces/IApplicationStore';

interface IServerTextProps {
  serverStatus?: IServerStatus;
  hasAccessToken: boolean;
  fetchStatus: () => void;
  fetchDetails: () => void;
}

class ServerText extends React.Component<IServerTextProps> {
  detailsLoaded: boolean = false;
  statusInitallyLoaded: boolean = false;
  componentDidMount() {
    if (this.props.hasAccessToken) {
      this.props.fetchStatus();
      this.statusInitallyLoaded = true;
    }
  }

  componentDidUpdate() {
    if (
      this.props.serverStatus &&
      this.props.serverStatus.status === ServerStatus.Running &&
      this.detailsLoaded !== true
    ) {
      this.props.fetchDetails();
      this.detailsLoaded = true;
    }
    if (!this.statusInitallyLoaded) {
      this.props.fetchStatus();
      this.statusInitallyLoaded = true;
    }
  }

  getServerDetails() {
    if (this.props.serverStatus && this.props.serverStatus.status !== ServerStatus.Running) {
      this.detailsLoaded = false;
      return null;
    }
    return <ServerDetails />;
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="parent-container">
            <div className="d-flex ">
              <div className="flex-fill pl-lg-5 text-center ">
                <Status />
              </div>

              <div className="flex-fill ">
                <RefreshButton />
              </div>
            </div>
          </div>
          <div className="">{this.getServerDetails()}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: IApplicationStore) {
  let serverStatus = {
    status: ServerStatus.Terminated,
  };
  if (state.serverStatus.data) {
    serverStatus = state.serverStatus.data;
  }
  let hasAccessToken = state.authDetails.accessToken ? true : false;

  return {
    serverStatus,
    hasAccessToken,
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    fetchStatus: () => dispatch(serverStatusAction()),
    fetchDetails: () => dispatch(serverDetailsAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerText);
