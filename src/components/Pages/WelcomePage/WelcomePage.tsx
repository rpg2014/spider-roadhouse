import React from 'react';
import './WelcomePage.css';
import { MiniServerStatus } from '../Server/Status';

export function WelcomePage(): JSX.Element {
  React.useEffect(() => {
    document.title = "Parker's Site";
  }, []);
  return (
    <>
      <div className="row  flex-grow-1 m-auto flex-fill">
        <div className="col cover-container  m-auto">
          <main role="main" className="inner cover m-auto ">
            <h1 className="cover-heading">Welcome</h1>
            <p className="lead">
              I am a software developer currently employed at Amazon. I have a wide range of interests, from systems
              programming with Rust, to frontend development with Typescript and React
            </p>
            <p className="lead">
              <a href="https://github.com/rpg2014/spider-roadhouse" className="btn btn-lg btn-dark">
                This sites's repository
              </a>
            </p>
          </main>
        </div>
      </div>
      <div className="row">
        <MiniServerStatus />
      </div>
      <div className="row">
        <footer className=" col mastfoot mt-auto">
          <div className="inner">
            <p>
              Made by <a href="https://www.linkedin.com/in/parker-given-47279b12b/">Parker</a>.
            </p>
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
  );
}
