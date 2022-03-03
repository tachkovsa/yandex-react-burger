/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  useEffect, useState, useCallback,
} from 'react';
import classNames from 'classnames';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { getIngredients } from '../../services/actions/ingredients';
import Actions from '../../services/actions';

import styles from './app.module.css';
import { Routes } from '../../routes';

function App() {
  const [activeTab, setActiveTab] = useState('constructor');

  return (
    <>
      <AppHeader activeTab={activeTab} selectTab={setActiveTab} />
      <Routes />
    </>
  );
}

export default App;
