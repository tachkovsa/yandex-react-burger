import React, { useCallback, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { auth } from '../services/auth';
import { fetchUser } from '../store/actions/auth';

export function ProtectedRoute({ children, accessType = 'anonymous', ...rest }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { accessToken, refreshToken } = auth();

  const isAuth = useCallback(() => !!((accessToken || refreshToken) && user), [accessToken, refreshToken, user]);

  useEffect(() => {
    if ((accessToken || refreshToken) && !user) {
      dispatch(fetchUser());
    }
  }, [accessToken, dispatch, refreshToken, user]);

  const render = () => {
    let elementToRender = (<Route {...rest} render={() => children} />);

    switch (accessType) {
      case 'authorized':
        if (!isAuth()) {
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
        if (isAuth()) {
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

  return render();
}

ProtectedRoute.propTypes = {
  accessType: PropTypes.oneOf(['authorized', 'anonymous', 'unauthorized']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
