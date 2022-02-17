/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';

import {
  ConstructorElement, DragIcon, CurrencyIcon, Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import 'simplebar/dist/simplebar.min.css';
import burgerConstructorStyles from './burger-constructor.module.css';

import { IngredientsContext } from '../../services/ingredientsContext';
import { ErrorContext, OrderNumberContext, TotalPriceContext } from '../../services/appContext';

import { domainURL } from '../../utils/constants';

function BurgerConstructor({ basket, onOpenModal }) {
  const { totalPriceState, totalPriceDispatcher } = useContext(TotalPriceContext);
  const { errorDispatcher } = useContext(ErrorContext);

  const { ingredients } = useContext(IngredientsContext);
  const { setOrderNumber } = useContext(OrderNumberContext);

  const [burgerBun, setBurgerBun] = useState(undefined);
  const [burgerStuffing, setBurgerStuffing] = useState([]);
  const [isWaitingForOrderNumber, setIsWaitingForOrderNumber] = useState(false);

  const makeOrder = async () => {
    if (isWaitingForOrderNumber) return;

    setIsWaitingForOrderNumber(true);
    setOrderNumber(null);

    try {
      const fetchedOrderNumber = await fetch(`${domainURL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: basket }),
      })
        .then((res) => {
          if (!res.ok) {
            return Promise.reject(new Error('Unable to post data to requested url'));
          }

          return res.json();
        })
        .then((res) => {
          if (!res.success) {
            return Promise.reject(new Error('Something went wrong while processing requrest'));
          }

          if (res.order && res.order.number) {
            return res.order.number;
          }
          return Promise.reject(new Error('Order number is missing in response'));
        })

        .catch((error) => { throw new Error(error); })
        .finally(() => setIsWaitingForOrderNumber(false));

      setOrderNumber(fetchedOrderNumber);
      errorDispatcher({ type: 'reset' });

      onOpenModal({
        type: 'order_details',
        orderNumber: fetchedOrderNumber,
        header: '',
      });
    } catch (err) {
      errorDispatcher({ type: 'set', payload: err.message });
    }
  };

  useEffect(() => {
    if (ingredients && basket) {
      const inBasketIngredients = [];
      basket.forEach((ingredientId) => {
        const ingredient = ingredients.find((i) => i._id === ingredientId);
        if (ingredient) {
          inBasketIngredients.push(ingredient);
        }
      });

      totalPriceDispatcher({
        type: 'set',
        payload: (
          inBasketIngredients
            .map((ingredient) => ingredient.price * (ingredient.type === 'bun' ? 2 : 1))
            .reduce((acc, price) => acc + price)
        ),
      });

      setBurgerBun(inBasketIngredients.find((ingredient) => ingredient.type === 'bun') || null);
      setBurgerStuffing(inBasketIngredients.filter((ingredient) => ingredient.type !== 'bun') || []);
    } else {
      setBurgerBun(null);
      setBurgerStuffing([]);
      totalPriceDispatcher({ type: 'reset' });
    }
  }, [ingredients, basket, totalPriceDispatcher]);

  // @ts-ignore
  return (
    <>
      <div className={classNames(burgerConstructorStyles.basketListContainer)}>
        {burgerBun && (
        <div className={classNames(burgerConstructorStyles.bulletEdge, 'mr-4', 'mb-4')}>
          <ConstructorElement
            type="top"
            isLocked
            text={`${burgerBun.name} (верх)`}
            price={burgerBun.price}
            thumbnail={burgerBun.image}
          />
        </div>
        )}
        <SimpleBar className={classNames(burgerConstructorStyles.basketListBar)}>
          <div className={classNames(burgerConstructorStyles.basketList, 'mr-4')}>
            {burgerStuffing.map((ingredient, index) => (
              <div
                className={classNames(burgerConstructorStyles.basketListElem, 'ml-4')}
                key={`${index}_${ingredient._id}`}
              >
                <DragIcon type="primary" />
                <div className={classNames(burgerConstructorStyles.bullet, 'ml-2')}>
                  <ConstructorElement
                    isLocked={false}
                    text={`${ingredient.name}`}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                  />
                </div>
              </div>
            ))}
          </div>
        </SimpleBar>
        {burgerBun && (
        <div className={classNames(burgerConstructorStyles.bulletEdge, 'mr-4', 'mt-4')}>
          <ConstructorElement
            type="bottom"
            isLocked
            text={`${burgerBun.name} (низ)`}
            price={burgerBun.price}
            thumbnail={burgerBun.image}
          />
        </div>
        )}
      </div>

      <div className={classNames(burgerConstructorStyles.orderInfo, 'mt-10', 'mr-4')}>
        <div className={classNames(burgerConstructorStyles.orderInfoPrice, 'mr-10')}>
          <span className={classNames('text', 'text_type_digits-medium', 'mr-2')}>{totalPriceState.totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={makeOrder}
          disabled={isWaitingForOrderNumber}
        >
          Оформить заказ
        </Button>
      </div>
    </>
  );
}

BurgerConstructor.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
