import React from 'react';
import { NavLink } from 'react-router-dom';


export function NavBar(): JSX.Element {
    return(
        <header className="masthead mb-auto">
          <div className="inner">
            <h3 className="masthead-brand">Parker</h3>
            <nav className="nav nav-masthead justify-content-center">
              <NavLink className="nav-link" activeClassName="active" to="/">Home</NavLink>
              <NavLink to='/server' className='nav-link' activeClassName="active">
                     Server
                </NavLink>
              <NavLink className='nav-link'  activeClassName='active' to='/game-of-life'>Life</NavLink>
              <a className="nav-link" href="https://github.com/rpg2014">My Github</a>
            </nav>
          </div>
        </header>
    )
}