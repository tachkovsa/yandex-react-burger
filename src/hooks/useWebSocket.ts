import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { wsConnect, wsDisconnect } from '../store/actions/websockets';
import { useAppDispatch } from './index';

export const useWebSocket = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { pathname } = location;

    if (pathname.startsWith('/feed')) {
      dispatch(wsConnect('all'));
    } else if (pathname.startsWith('/profile')) {
      dispatch(wsConnect('my'));
    }

    return () => { dispatch(wsDisconnect()); };
  }, [location, dispatch]);
};
