import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import headerStyles from './app-header.module.css';

const AppHeader = ({ activeTab, selectTab }) => {

    return (
        <header className={`${headerStyles.header} pt-4 pb-4`}>
            <nav className={`${headerStyles.content} `}>
                <div className={`${headerStyles.side} ${headerStyles.leftSide}`}>
                    <button
                        className={`${headerStyles.menuBtn} ${activeTab === 'constructor' ? headerStyles.menuBtnActive : ''} pt-4 pr-5 pb-4 pl-5`}
                        type="button"
                        onClick={() => selectTab('constructor')}
                    >
                        <BurgerIcon type={activeTab === 'constructor' ? 'primary' : 'secondary'} />
                        <span className={classNames('text', 'text_type_main-default', 'ml-2')}>Конструктор</span>
                    </button>
                    <button
                        className={`${headerStyles.menuBtn} ${activeTab === 'order_list' ? headerStyles.menuBtnActive : ''} pt-4 pr-5 pb-4 pl-5`}
                        type="button"
                        onClick={() => selectTab('order_list')}
                    >
                        <ListIcon type={activeTab === 'order_list' ? 'primary' : 'secondary'}/>
                        <span className={classNames('text', 'text_type_main-default', 'ml-2')}>Лист заказов</span>
                    </button>
                </div>
                <div className={`${headerStyles.side} ${headerStyles.rightSide}`}>
                    <button  className={`${headerStyles.menuBtn} ${activeTab === 'profile' ? headerStyles.menuBtnActive : ''} pt-4 pr-5 pb-4 pl-5`}
                        type="button"
                        onClick={() => selectTab('profile')}
                    >
                        <ProfileIcon type={activeTab === 'profile' ? 'primary' : 'secondary'}/>
                        <span className={classNames('text', 'text_type_main-default', 'ml-2')}>Личный кабинет</span>
                    </button>
                </div>
                <div className={`${headerStyles.side} ${headerStyles.middleSide}`}>
                    <Logo />
                </div>
            </nav>
        </header>
    );
}

AppHeader.propTypes = {
    activeTab: PropTypes.oneOf(['constructor', 'order_list', 'profile']),
    selectTab: PropTypes.func
}

export default AppHeader;