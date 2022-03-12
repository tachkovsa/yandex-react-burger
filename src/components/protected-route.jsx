import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { auth } from '../services/auth';
import { fetchUser } from '../store/actions/auth';
import commonStyles from '../pages/common.module.css';

export function ProtectedRoute({ children, accessType = 'anonymous', ...rest }) {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { accessToken, refreshToken } = auth();

  const [loadingText, setLoadingText] = useState('Проверяем авторизацию...');
  const isAuth = useCallback(() => !!((accessToken || refreshToken) && user), [accessToken, refreshToken, user]);

  // TODO: Move this code to helper
  useEffect(() => {
    let interval; let
      tick = 0;
    if (loading) {
      interval = setInterval(() => {
        setLoadingText(`Проверяем авторизацию${'.'.repeat(tick)}`);
        tick = tick === 3 ? 0 : ++tick;
      }, 450);
    }

    return () => clearInterval(interval);
  }, [setLoadingText, loading]);

  useEffect(() => {
    if ((accessToken || refreshToken) && !user) {
      dispatch(fetchUser());
    }
  }, [accessToken, dispatch, refreshToken, user]);

  const render = () => {
    if (accessType !== 'anonymous' && loading) {
      return (
        <div className={classNames(commonStyles.loader, 'text', 'text_type_main-default')}>{loadingText}</div>
      );
    }

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
