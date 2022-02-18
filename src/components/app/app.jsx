/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  useEffect, useState, useReducer, useCallback,
} from 'react';
import classNames from 'classnames';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { defaultBasket } from '../../utils/data';
import { domainURL } from '../../utils/constants';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { IngredientsContext } from '../../services/ingredientsContext';
import { TotalPriceContext, OrderNumberContext, ErrorContext } from '../../services/appContext';
import appStyles from './app.module.css';
import Actions from '../../services/actions';
import { getIngredients } from '../../services/actions/ingredients';

const totalPriceInitialState = { totalPrice: null };

function totalPriceReducer(state, action) {
  switch (action.type) {
    case 'set':
      return { totalPrice: action.payload };
    case 'reset':
      return totalPriceInitialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const errorInititalState = {
  hasError: false,
  errorText: null,
};

function errorReducer(state, action) {
  switch (action.type) {
    case 'set':
      return { hasError: true, errorText: action.payload };
    case 'reset':
      return errorInititalState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function App() {
  const dispatch = useDispatch();

  // const [totalPriceState, totalPriceDispatcher] = useReducer(totalPriceReducer, totalPriceInitialState, undefined);
  // const [errorState, errorDispatcher] = useReducer(errorReducer, errorInititalState, undefined);
  const orderNumber = useSelector((state) => state.order.orderNumber);
  const detailedIngredient = useSelector((state) => state.currentIngredient.detailedIngredient);

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const isLoading = useSelector((state) => state.ingredients.loading);
  const ingredientsErrorText = useSelector((state) => state.ingredients.error);
  const orderErrorText = useSelector((state) => state.order.error);

  const hasError = useCallback(
    () => ingredientsErrorText || orderErrorText,
    [ingredientsErrorText, orderErrorText],
  );

  const [activeTab, setActiveTab] = useState('constructor');
  // const [basket, setBasket] = useState(defaultBasket);
  // const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  // const [modalVisible, setModalVisible] = useState(false);
  // const [modalPayload, setModalPayload] = useState(null);
  //
  // const handleOpenModal = (payload) => {
  //   setModalPayload(payload);
  //   setModalVisible(true);
  // };

  const handleCloseOrderModal = () => {
    dispatch({ type: Actions.RESET_CONSTRUCTOR_INGREDIENTS });
    dispatch({ type: Actions.RESET_ORDER_NUMBER });
  };
  const handleCloseDetailedIngredientModal = () => dispatch({ type: Actions.RESET_DETAILED_INGREDIENT });

  useEffect(() => {
    let interval; let
      tick = 0;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingText(`Верстаем меню${'.'.repeat(tick)}`);
        tick = tick === 3 ? 0 : ++tick;
      }, 450);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader activeTab={activeTab} selectTab={setActiveTab} />
      {isLoading && (
        <div className={classNames(appStyles.loader, 'text', 'text_type_main-default')}>{loadingText}</div>
      )}
      {ingredientsErrorText && (
        <div className={classNames(appStyles.error, 'text', 'text_type_main-default')}>
          При загрузке ингредиетов произошла ошибка... 😞
          <span className={classNames('mt-2', 'text', 'text_type_main-default', 'text_color_inactive')}>{ingredientsErrorText}</span>
        </div>
      )}
      {orderErrorText && (
        <div className={classNames(appStyles.error, 'text', 'text_type_main-default')}>
          При обработке заказа произошла ошибка... 😞
          <span className={classNames('mt-2', 'text', 'text_type_main-default', 'text_color_inactive')}>{orderErrorText}</span>
        </div>
      )}
      {!isLoading && !hasError() && ingredients.length > 0 && (
      <DndProvider backend={HTML5Backend}>
        <main className={appStyles.content}>
          <section className={classNames(appStyles.contentBlock, 'mt-10')}>
            <BurgerIngredients />
          </section>
          <section className={classNames(appStyles.contentBlock, 'mt-25')}>
            <BurgerConstructor />
          </section>
        </main>
      </DndProvider>
      )}
      {orderNumber && (
      <Modal onClose={handleCloseOrderModal}>
        <OrderDetails orderNumber={orderNumber} />
      </Modal>
      )}
      {detailedIngredient && (
      <Modal header="Детали ингредиента" onClose={handleCloseDetailedIngredientModal}>
        <IngredientDetails ingredient={detailedIngredient} />
      </Modal>
      )}
    </>
  );
}

export default App;
