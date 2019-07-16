import React from 'react';
import logo from './logo.svg';
import { Route, Switch}from 'react-router'
import './App.css';
import { Provider } from 'react-redux';
import Button from './components/Button';
import createInitialStore, {history} from './store/store';
import { ConnectedRouter } from 'connected-react-router';

export const store = createInitialStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
    <Switch>
      <Route exact path='/' render={() => (
        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <Button></Button>
        </header>
      </div>
      )}/>
    </Switch>
    </ConnectedRouter>
    </Provider>
  );
}

export default App;
