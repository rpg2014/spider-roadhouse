import React, { ComponentType, Suspense } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'
import { routes } from '../..';
import { LoadingSpinner } from '../LoadingSpinner';



export function NavBar(): JSX.Element {
      return(
      <div className='row center'>
        <div className='col max_width'>
        <header className="masthead mb-auto">
          <div className="inner">
            <h3 className="masthead-brand">Parker</h3>
            <nav className="nav nav-masthead justify-content-center">
              {routes.map(route => (
                  <NavLink className='nav-link' activeClassName='active' to={route.path} exact={route.exact} key={route.name}>
                    {route.name}
                  </NavLink>
                )
              )}
              <a className="nav-link" href="https://github.com/rpg2014">My Github</a>
            </nav>
          </div>
        </header>
        </div>
      </div>
    )
}



export default function getLazyLoadedComponent(name: string, componentFunction: () => JSX.Element){
  return ( () => {
      React.useEffect(() => {
          document.title = name;
      }, [])

      return (
          <div className=' d-flex row py-3 mx-auto flex-column'>
              <Suspense fallback={<LoadingSpinner/>}>
                  {componentFunction()}
              </Suspense>
          </div>
      )
    }
  )
}
