// import { useAuth } from '../services/auth';
import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export function ProtectedRoute({ children, accessType = 'anonymous', ...rest }) {
  const { user, token } = useSelector((state) => state.auth);

  // let { getUser, ...auth } = useAuth();
  // const [isUserLoaded, setUserLoaded] = useState(false);

  const init = useCallback(async () => {
    // TODO: Request user info
    console.log('init user...', !!user);
    // const success = await getUser();
    //
    // setUserLoaded(success ? true : null);
  }, [user]);

  const render = () => {
    let elementToRender = (<Route {...rest} render={() => children} />);

    switch (accessType) {
      case 'authorized':
        // TODO: Add expires checking
        if (!user) { // !expired
          elementToRender = (
            <Route render={({ location }) => (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location },
                }}
              />
            )}
            />
          );
        }
        break;
      case 'unauthorized':
        if (user) {
          elementToRender = (
            <Route render={({ location }) => (
              <Redirect
                to={{
                  pathname: (location.pathname === '/login' && location.state)
                    ? location.state.from.pathname
                    : '/',
                  state: { from: location },
                }}
              />
            )}
            />
          );
        }
        break;
      default:
        break;
    }

    return elementToRender;
  };

  useEffect(() => {
    init();
  }, [init]);

  return render();
}

ProtectedRoute.propTypes = {
  accessType: PropTypes.oneOf(['authorized', 'anonymous', 'unauthorized']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
