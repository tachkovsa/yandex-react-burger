import React, { useEffect, useState, useReducer } from 'react';
import classNames from 'classnames';

import appStyles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { defaultBasket } from '../../utils/data';
import { domainURL } from '../../utils/constants';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { IngredientsContext } from '../services/ingredientsContext';
import { TotalPriceContext } from '../services/appContext';

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

const App = () => {
  const [totalPriceState, totalPriceDispatcher] = useReducer(totalPriceReducer, totalPriceInitialState, undefined);

  const [ingredients, setIngredients] = useState([]);
  
  const [activeTab, setActiveTab] = React.useState('constructor');
  const [basket, setBasket] = React.useState(defaultBasket);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorText, setErrorText] = React.useState(false);
  const [loadingText, setLoadingText] = React.useState('');

  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalPayload, setModalPayload] = React.useState(null);

  const handleOpenModal = (payload) => {
    setModalPayload(payload);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    let interval, tick = 0;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingText(`Верстаем меню${'.'.repeat(tick)}`)
        tick = tick === 3 ? 0 : ++tick;
      }, 450);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(true);

    fetch(`${domainURL}/api/ingredients`)
      .then(res => {
        if (!res.ok) {
          return Promise.reject('Unable to fetch data from requested url');
        }

        return res.json()
      })
      .then(res => {
        if (!res.success) {
          return Promise.reject('Something went wrong while processing requrest');
        }

        setIngredients(res.data);
        setErrorText(false);
      })
      .catch(error => setErrorText(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <AppHeader activeTab={activeTab} selectTab={setActiveTab}/>
      <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
        <TotalPriceContext.Provider value={{ totalPriceState, totalPriceDispatcher }}>
          {isLoading && (
            <div className={classNames(appStyles.loader, 'text', 'text_type_main-default')}>{loadingText}</div>
          )}
          {errorText && (
            <div className={classNames(appStyles.error, 'text', 'text_type_main-default')}>
              Что-то пошло не так... 😞
              <span className={classNames('mt-2', 'text', 'text_type_main-default', 'text_color_inactive')}>{errorText}</span>
            </div>
          )}
          {!isLoading && !errorText && ingredients.length > 0 && (
            <main className={appStyles.content}>
              <section className={classNames(appStyles.contentBlock, 'mt-10')}>
                <BurgerIngredients
                  basket={basket}
                  onOpenModal={handleOpenModal}
                />
              </section>
              <section className={classNames(appStyles.contentBlock, 'mt-25')}>
                <BurgerConstructor
                  basket={basket}
                  onOpenModal={handleOpenModal}
                />
              </section>
            </main>
          )}
          {modalVisible && (
            <Modal header={modalPayload.header} onClose={handleCloseModal}> 
              {modalPayload.type === 'order_details' && (
                <OrderDetails orderNumber={modalPayload.orderNumber} />
              )}
              {modalPayload.type === 'ingredient_details' && (
                <IngredientDetails ingredient={modalPayload.ingredient} />
              )}
            </Modal>
          )}
        </TotalPriceContext.Provider>
      </IngredientsContext.Provider>
    </>
  );
}

export default App;
