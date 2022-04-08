import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import classNames from 'classnames';
import { auth } from '../services/auth';
import { fetchUser } from '../store/actions/auth';
import { useDispatch, useSelector } from '../hooks';

import commonStyles from '../pages/common.module.css';

export type TRouterAccessTypes = 'anonymous' | 'authorized' | 'unauthorized';

export interface IExpandedLocation extends Location {
  state: {
    from?: Location,
    ingredientModal?: Location,
    feedModal?: Location
    profileFeedModal?: Location;
  }
}

interface IProtectedRouteProps {
  accessType: TRouterAccessTypes;
}

export const ProtectedRoute: FC<IProtectedRouteProps & RouteProps> = ({
  children,
  accessType = 'anonymous',
  ...rest
}) => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { accessToken, refreshToken } = auth();

  const [loadingText, setLoadingText] = useState<string>('Проверяем авторизацию...');
  const isAuth = useCallback((): boolean => !!((accessToken || refreshToken) && user), [accessToken, refreshToken, user]);

  // TODO: Move this code to helper
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let tick: number = 0;
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
    if (accessType !== 'anonymous' && !user && loading) {
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
            <Route render={({ location }) => {
              const definedLocation = location as IExpandedLocation;

              return (
                <Redirect
                  to={{
                    pathname: (definedLocation.pathname === '/login' && !!definedLocation.state)
                      ? definedLocation.state.from?.pathname
                      : '/',
                    state: { from: definedLocation },
                  }}
                />
              );
            }}
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
};
