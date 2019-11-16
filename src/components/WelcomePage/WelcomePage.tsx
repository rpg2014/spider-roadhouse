import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css'
import { NavBar } from '../NavBar/NavBar';



export interface IWelcomeProps {
    
}

export function WelcomePage(): JSX.Element {
    return(<>
        
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column ">
        <header className="masthead mb-auto">
          <NavBar/>
        </header>
        <main role="main" className="inner cover">
        <h1 className="cover-heading">Welcome</h1>
        <p className="lead">I am a software developer current employed at Amazon.  I have a wide range of experience, from systems programming with rust, to frontend development with typescript and React</p>
        <p className="lead">
        <a href="https://www.linkedin.com/in/parker-given-47279b12b/" className="btn btn-lg btn-secondary">Learn more</a>
        </p>
  </main>
  <footer className="mastfoot mt-auto">
    <div className="inner">
      <p>Made by <a href="https://github.com/rpg2014/spider-roadhouse">Parker</a>.</p>
    </div>
  </footer>
</div>

</>




        // <div id="welcome-container">
        //     <h1> Hello </h1>
        //     <div id="button-to-server-container">
        //         <Link to='/server'>
        //             <button id='button-to-server'>Click to control the server</button>
        //         </Link>
        //     </div>
        // </div>
    )
}