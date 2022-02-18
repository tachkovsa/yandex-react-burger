/* eslint-disable react/no-array-index-key */

import React, {
  useEffect, useState, useContext, useRef,
} from 'react';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';

import {
  ConstructorElement, DragIcon, CurrencyIcon, Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import 'simplebar/dist/simplebar.min.css';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import burgerConstructorStyles from './burger-constructor.module.css';

import { OrderNumberContext } from '../../services/appContext';

import Actions from '../../services/actions';
import { postOrder } from '../../services/actions/order';
import { BurgerConstructorIngredient } from './burger-constructor-ingredient';

function BurgerConstructor() {
  const dispatch = useDispatch();

  const { ingredientDragged } = useSelector((state) => state.ingredients);
  const { basket } = useSelector((state) => state.constructorIngredients);

  const readyForOrder = useSelector((state) => (state.constructorIngredients.basket.find((ingredient) => ingredient.type === 'bun')
      && state.constructorIngredients.basket.length >= 2));

  const totalPrice = useSelector((state) => (state.constructorIngredients.basket.length > 0
    ? state.constructorIngredients.basket
      .map((ingredient) => ingredient.price * (ingredient.type === 'bun' ? 2 : 1))
      .reduce((acc, price) => acc + price)
    : 0));

  const burgerBun = useSelector((state) => state.constructorIngredients.basket.find((ingredient) => ingredient.type === 'bun') || null);
  const burgerStuffing = useSelector((state) => state.constructorIngredients.basket.filter((ingredient) => ingredient.type !== 'bun') || null);

  const isWaitingForOrderNumber = useSelector((state) => state.order.loading);

  const onDropIngredient = (ingredient) => {
    if (ingredient.type === 'bun') {
      dispatch({ type: Actions.ADD_BUN_TO_CONSTRUCTOR, payload: { _uid: uuidv4(), ...ingredient } });
    } else {
      dispatch({ type: Actions.ADD_INGREDIENT_TO_CONSTRUCTOR, payload: { _uid: uuidv4(), ...ingredient } });
    }
  };

  const onClickOnConstructorElement = (e, uid) => {
    if (e.target.closest('.constructor-element__action')) {
      dispatch({ type: Actions.REMOVE_INGREDIENT_FROM_CONSTRUCTOR, payload: uid });
    }
  };

  const onMoveConstructorElement = (whichIngredientDroppedIndex, onWhichIngredientDroppedIndex) => {
    dispatch({ type: Actions.CHANGE_CONSTRUCTOR_INGREDIENT_POSITION, payload: { whichIngredientDroppedIndex, onWhichIngredientDroppedIndex } });
  };

  const [{ isHoverIngredient }, basketRef] = useDrop({
    accept: 'ingredients',
    collect: (monitor) => ({
      isHoverIngredient: monitor.isOver(),
    }),
    drop: (ingredient) => onDropIngredient(ingredient),
  });

  // const [{ isHoverConstructorIngredient }, constructorRef] = useDrop({
  //   accept: 'constructorIngredients',
  //   collect: ((monitor) => ({
  //     isHoverConstructorIngredient: monitor.isOver(),
  //   })),
  //   drop: (ingredient) => onDropConstructorIngredient(ingredient),
  // });

  const makeOrder = async () => {
    if (isWaitingForOrderNumber) return;

    dispatch(postOrder(basket.map((b) => b._id)));
  };

  return (
    <>
      <div
        className={classNames(burgerConstructorStyles.basketListContainer, (isHoverIngredient ? burgerConstructorStyles.basketListContainerHovered : ''), (ingredientDragged ? burgerConstructorStyles.basketListContainerWaitingForIngredient : ''))}
        ref={basketRef}
      >
        <div className={classNames(burgerConstructorStyles.bulletEdge, 'mr-4', 'mb-4')}>

          {burgerBun && (
            <ConstructorElement
              type="top"
              isLocked
              text={`${burgerBun.name} (верх)`}
              price={burgerBun.price}
              thumbnail={burgerBun.image}
            />
          )}
          {!burgerBun && (
          <div className={classNames(burgerConstructorStyles.constructorElement, 'constructor-element constructor-element_pos_top')}>
            <span className="text text_type_main-default text_color_inactive">Выберите булочку</span>
          </div>
          )}
        </div>

        {burgerStuffing.length > 0 && (
          <SimpleBar className={classNames(burgerConstructorStyles.basketListBar)}>
            <div className={classNames(burgerConstructorStyles.basketList, 'mr-4')}>
              {burgerStuffing.map((ingredient, index) => (
                <BurgerConstructorIngredient
                  key={ingredient._uid}
                  index={index}
                  ingredient={ingredient}
                  onClick={onClickOnConstructorElement}
                  onMove={onMoveConstructorElement}
                />
              ))}
            </div>
          </SimpleBar>
        )}

        {burgerStuffing.length === 0 && (
        <div className={classNames(burgerConstructorStyles.basketNoStuffing, burgerConstructorStyles.constructorElement, 'ml-15')}>
          <span className="text text_type_main-default text_color_inactive">Выберите наполнение</span>
        </div>
        )}
        <div className={classNames(burgerConstructorStyles.bulletEdge, 'mr-4', 'mt-4')}>
          {burgerBun && (
          <ConstructorElement
            type="bottom"
            isLocked
            text={`${burgerBun.name} (низ)`}
            price={burgerBun.price}
            thumbnail={burgerBun.image}
          />
          )}
          {!burgerBun
            && (
            <div className={classNames(burgerConstructorStyles.constructorElement, 'constructor-element constructor-element_pos_bottom')}>
              <span className="text text_type_main-default text_color_inactive">Выберите булочку</span>
            </div>
            )}
        </div>
      </div>

      <div className={classNames(burgerConstructorStyles.orderInfo, 'mt-10', 'mr-4')}>
        {basket.length > 0 && (
          <div className={classNames(burgerConstructorStyles.orderInfoPrice, 'mr-10')}>
            <span className={classNames('text', 'text_type_digits-medium', 'mr-2')}>{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
        )}
        <Button
          type="primary"
          size="large"
          onClick={makeOrder}
          disabled={!readyForOrder || isWaitingForOrderNumber}
        >
          Оформить заказ
        </Button>
      </div>
    </>
  );
}

export default BurgerConstructor;
