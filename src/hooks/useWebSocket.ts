import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { wsConnect, wsDisconnect } from '../store/actions/websockets';
import { useDispatch } from './index';
import { webSocketURL } from '../utils/constants';
import { getTokens } from '../services/auth';

export const useWebSocket = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const { pathname } = location;

    let type;
    if (pathname.startsWith('/feed')) {
      type = 'all';
    } else if (pathname.startsWith('/profile')) {
      type = 'my';
    }

    let url = `${webSocketURL}/orders`;
    switch (type) {
      case 'all':
        url += '/all';
        break;
      case 'my': {
        const { accessToken } = getTokens();
        url += `?token=${accessToken?.split(' ')[1]}`;
        break;
      }
      default:
    }

    dispatch(wsConnect({ url, type }));

    return () => { dispatch(wsDisconnect()); };
  }, [location, dispatch]);
};
