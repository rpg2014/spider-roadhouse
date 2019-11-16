import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ServerControlsWithAuth, { store } from './components/ServerControlsWithAuth/ServerControlsWithAuth';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';
import {history} from './store/store';
import { WelcomePage } from './components/WelcomePage/WelcomePage';


const lazyLoadedGameOfLife = lazy(() => import('./components/GameOfLifePage/GameOfLife'));


ReactDOM.render(
    <div className='h-100'>
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Suspense fallback={<div>Loading</div>}>
            <Switch>
                <Route exact path='/server' component={ServerControlsWithAuth} className='h-100 ' />
                <Route exact path='/' component={WelcomePage}/>
                <Route exact path='/game-of-life' component={lazyLoadedGameOfLife}/>
            </Switch>
            </Suspense>
        </ConnectedRouter>
    </Provider>
    </div>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
