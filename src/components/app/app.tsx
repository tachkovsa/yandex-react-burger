import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import appStyles from './app.module.css';

import { ingredients, defaultBasket } from '../../utils/data';

export const ingredientsPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['bun', 'main', 'sauce']),
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number
});

export const basketPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired
});

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
