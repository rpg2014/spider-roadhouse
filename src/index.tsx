import React, { lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ServerControlsWithAuth from './components/ServerControlsWithAuth/ServerControlsWithAuth';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router';
import createInitialStore, {history} from './store/store';
import { WelcomePage } from './components/WelcomePage/WelcomePage';
import { JournalPageWithAuth } from './components/JournalPage/JournalPageWithAuth';
import getLazyLoadedComponent, { NavBar } from './components/NavBar/NavBar';
import { IntranetLinksWithAuth } from './components/IntranetLinks/IntranetLinksWithAuth'
import Amplify from 'aws-amplify';

import 'bootstrap' // import bootstrap js
import { CSSTransition } from 'react-transition-group';
import GameOfLife from './components/GameOfLifePage/GameOfLife';
import Boids from './components/Boids/Boids';




export const store = createInitialStore();

const LazyLoadedGameOfLife: React.LazyExoticComponent<typeof GameOfLife> = lazy(() => import('./components/GameOfLifePage/GameOfLife'));
const LazyLoadedBoids: React.LazyExoticComponent<typeof Boids> = lazy(() => import('./components/Boids/Boids'));

export const routes = [
    { path: '/', name: 'Home', Component: WelcomePage, exact: true, requiresAuth: false},
    { path: '/server', name: 'Server', Component: ServerControlsWithAuth, exact: true, requiresAuth: false},
    { path: '/journal', name: 'Journal', Component: JournalPageWithAuth, exact: false, requiresAuth: false},
    { path: '/game-of-life', name: 'Life', Component: getLazyLoadedComponent('Life', () => <LazyLoadedGameOfLife />), exact: true, requiresAuth: false},
    { path: '/boids', name: 'Boids', Component: getLazyLoadedComponent('Boids', () => <LazyLoadedBoids />), requiresAuth: false},
    { path: '/intranet', name: "Links", Component: IntranetLinksWithAuth, exact: true, requiresAuth: true}  ]

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div className=' h-100 p-3 mx-auto flex-column d-flex container-fluid text-center overflow-rules'>
                <NavBar />
                {routes.map(route => (
                    <Route key={route.path} exact={route.exact} path={route.path}>
                    {route.name === 'Life' /* The canvas in life doesn't like the css transition*/
                    ? <route.Component /> 
                    : ({ match }) => (
                      <CSSTransition
                        in={match !== null}
                        timeout={300}
                        classNames="fade-in"
                        unmountOnExit
                        exit={false}
                      >
                        
                          <route.Component />
                        
                      </CSSTransition>
                    )}
                  </Route>
                ))}
            </div>
        </ConnectedRouter>
    </Provider>


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



// Amplify setup
Amplify.configure({
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
        
        // REQUIRED - Amazon Cognito Region
        region: 'us-east-1',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        // identityPoolRegion: ' us-east-1',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_mX9fI3lzt',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '333d4m712mtbsjpaj5efdj0fh4',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        // mandatorySignIn: false,

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        cookieStorage: {
        // REQUIRED - Cookie domain (only required if cookieStorage is provided)
            domain: 'pwa.parkergiven.com',
        // OPTIONAL - Cookie path
            //path: '/',
        // OPTIONAL - Cookie expiration in days
            expires: 365,
        // OPTIONAL - Cookie secure flag
        // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
            secure: true
        },

        // OPTIONAL - customized storage object
        // storage: new MyStorage(),
        
        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        // authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
});