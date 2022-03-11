import React from 'react';
import classNames from 'classnames';
import {
  NavLink, matchPath, useLocation,
} from 'react-router-dom';

import {
  BurgerIcon, ListIcon, Logo, ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';

function AppHeader() {
  const location = useLocation();

  const matchedMain = matchPath(location.pathname, { path: '/', exact: true });
  const matchedOrders = matchPath(location.pathname, { path: '/orders', exact: true });
  const matchedProfile = matchPath(location.pathname, { path: '/profile' });

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={`${styles.content} `}>
        <div className={`${styles.side} ${styles.leftSide}`}>
          <NavLink
            className={classNames(styles.menuBtn, 'pt-4 pr-5 pb-4 pl-5')}
            activeClassName={styles.menuBtnActive}
            type="button"
            exact
            to="/"
          >
            <BurgerIcon type={matchedMain ? 'primary' : 'secondary'} />
            <span className={classNames('text', 'text_type_main-default', 'ml-2')}>Конструктор</span>
          </NavLink>
          <NavLink
            className={classNames(styles.menuBtn, 'pt-4 pr-5 pb-4 pl-5')}
            activeClassName={styles.menuBtnActive}
            to="/orders"
          >
            <ListIcon type={matchedOrders ? 'primary' : 'secondary'} />
            <span className={classNames('text', 'text_type_main-default', 'ml-2')}>Лист заказов</span>
          </NavLink>
        </div>
        <div className={`${styles.side} ${styles.rightSide}`}>
          <NavLink
            className={classNames(styles.menuBtn, 'pt-4 pr-5 pb-4 pl-5')}
            activeClassName={styles.menuBtnActive}
            to="/profile"
          >
            <ProfileIcon type={matchedProfile ? 'primary' : 'secondary'} />
            <span className={classNames('text', 'text_type_main-default', 'ml-2')}>Личный кабинет</span>
          </NavLink>
        </div>
        <div className={`${styles.side} ${styles.middleSide}`}>
          <Logo />
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
