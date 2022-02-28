import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  BurgerIcon, ListIcon, Logo, ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';

function AppHeader({ activeTab, selectTab }) {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={`${styles.content} `}>
        <div className={`${styles.side} ${styles.leftSide}`}>
          <button
            className={`${styles.menuBtn} ${activeTab === 'constructor' ? styles.menuBtnActive : ''} pt-4 pr-5 pb-4 pl-5`}
            type="button"
            onClick={() => selectTab('constructor')}
          >
            <BurgerIcon type={activeTab === 'constructor' ? 'primary' : 'secondary'} />
            <span className={classNames('text', 'text_type_main-default', 'ml-2')}>Конструктор</span>
          </button>
          <button
            className={`${styles.menuBtn} ${activeTab === 'order_list' ? styles.menuBtnActive : ''} pt-4 pr-5 pb-4 pl-5`}
            type="button"
            onClick={() => selectTab('order_list')}
          >
            <ListIcon type={activeTab === 'order_list' ? 'primary' : 'secondary'} />
            <span className={classNames('text', 'text_type_main-default', 'ml-2')}>Лист заказов</span>
          </button>
        </div>
        <div className={`${styles.side} ${styles.rightSide}`}>
          <button
            className={`${styles.menuBtn} ${activeTab === 'profile' ? styles.menuBtnActive : ''} pt-4 pr-5 pb-4 pl-5`}
            type="button"
            onClick={() => selectTab('profile')}
          >
            <ProfileIcon type={activeTab === 'profile' ? 'primary' : 'secondary'} />
            <span className={classNames('text', 'text_type_main-default', 'ml-2')}>Личный кабинет</span>
          </button>
        </div>
        <div className={`${styles.side} ${styles.middleSide}`}>
          <Logo />
        </div>
      </nav>
    </header>
  );
}

AppHeader.propTypes = {
  activeTab: PropTypes.oneOf(['constructor', 'order_list', 'profile']).isRequired,
  selectTab: PropTypes.func.isRequired,
};

export default AppHeader;
