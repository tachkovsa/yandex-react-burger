import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { wsConnect, wsDisconnect } from '../store/actions/websockets';

export const useWebSocket = () => {
  const location = useLocation();
  const dispatch = useDispatch();

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
