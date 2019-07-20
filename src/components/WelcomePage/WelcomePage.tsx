import React from 'react';
import { Link } from 'react-router-dom';



export interface IWelcomeProps {
    
}

export function WelcomePage(): JSX.Element {
    return(
        <div id="welcome-container">
            <h1> Hello </h1>
            <div id="button-to-server-container">
                <Link to='/server'>
                    <button id='button-to-server'>Click to control the server</button>
                </Link>
            </div>
        </div>
    )
}