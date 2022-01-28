import React from 'react';

import classNames from 'classnames';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import appStyles from './app.module.css';

import { ingredients, defaultBasket } from '../../utils/data';


const App = () => {
  const [state, setState] = React.useState({
    activeTab: 'constructor',
    basket: defaultBasket,
    ingredients: ingredients
  });

  const selectTab = (tab) => setState({ ...state, activeTab: tab });

  return (
    <>
      <AppHeader activeTab={state.activeTab} selectTab={selectTab}/>
      <main className={appStyles.content}>
        <section className={classNames(appStyles.contentBlock, 'mt-10')}>
          <BurgerIngredients ingredients={state.ingredients} basket={state.basket} />
        </section>
        <section className={classNames(appStyles.contentBlock, 'mt-25')}>
          <BurgerConstructor ingredients={state.ingredients} basket={state.basket} />
        </section>
      </main>
    </>
  );
}

export default App;
