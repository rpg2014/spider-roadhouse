import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ServerControlsWithAuth, { store } from './components/ServerControlsWithAuth/ServerControlsWithAuth';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';
import {history} from './store/store';
import { WelcomePage } from './components/WelcomePage/WelcomePage';
import GameOfLifeWithNav from './components/GameOfLifePage/GameOfLifeWithNav';
import SwitchWithSlide from "./components/Slider/SwitchWithSlide";
import { NavBar } from './components/NavBar/NavBar';





ReactDOM.render(
    <div className='h-100'>
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path='/server' component={ServerControlsWithAuth} className='h-100 ' />
                <Route exact path='/' component={WelcomePage}/>
                <Route exact path='/game-of-life' component={GameOfLifeWithNav}/>
            </Switch>
        </ConnectedRouter>
    </Provider>
    </div>

, document.getElementById('root'));

const onSuccess = () => {
    console.log("Service Worker Installed successfully");
}

const onUpdate = () => {
    console.log("Service Worker updated")
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
    onSuccess,
    onUpdate
});



