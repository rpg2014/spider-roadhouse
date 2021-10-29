import React, { ComponentType, Suspense } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { routes } from '../..';
import { LoadingSpinner } from '../LoadingSpinner';
import { useAuthData } from '../Auth/common';
import IApplicationStore from '../../interfaces/IApplicationStore';
import { useSelector } from 'react-redux';

export function NavBar(): JSX.Element {
  const isLoggedIn = useSelector((state: IApplicationStore) => (state.authDetails.accessToken ? true : false));
  return (
    <div className="row center">
      <div className="col max_width">
        <header className="masthead mb-auto">
          <div className="inner">
            <h3 className="masthead-brand">Parker</h3>
            <nav className="nav nav-masthead justify-content-center">
              {routes.map((route) => {
                if (!route.requiresAuth) {
                  return getNavLink(route);
                } else {
                  return true ? getNavLink(route) : null;
                }
              })}
              <a className="nav-link" href="https://github.com/rpg2014">
                My Github
              </a>
            </nav>
          </div>
        </header>
      </div>
    </div>
  );
}

const getNavLink = (route: any): any => {
  return (
    <NavLink className="nav-link" activeClassName="active" to={route.path} exact={route.exact} key={route.name}>
      {route.name}
    </NavLink>
  );
};

export default function getLazyLoadedComponent(name: string, componentFunction: () => JSX.Element) {
  return () => {
    React.useEffect(() => {
      document.title = name;
    }, []);

    return (
      <div className=" d-flex row py-3 mx-auto flex-column">
        <Suspense fallback={<LoadingSpinner />}>{componentFunction()}</Suspense>
      </div>
    );
  };
}
