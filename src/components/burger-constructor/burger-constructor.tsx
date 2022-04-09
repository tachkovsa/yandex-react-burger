import React, { useCallback } from 'react';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import {
  ConstructorElement, CurrencyIcon, Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useHistory } from 'react-router-dom';
import { postOrder } from '../../store/actions/order';
import { BurgerConstructorIngredient } from './burger-constructor-ingredient';
import { useDispatch, useSelector } from '../../hooks';
import { auth } from '../../services/auth';
import { IIngredient } from '../../utils/interfaces/ingredient.interface';

import styles from './burger-constructor.module.css';
import 'simplebar/dist/simplebar.min.css';
import {
  addBunToConstructor,
  addIngredientToConstructor,
  removeIngredientFromConstructor,
} from '../../store/actions/constructor-ingredients';

export function BurgerConstructor() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { accessToken, refreshToken } = auth();

  const { ingredientDragged } = useSelector((state) => state.ingredients);
  const { basket } = useSelector((state) => state.constructorIngredients);
  const isWaitingForOrderNumber = useSelector((state) => state.order.loading);

  const totalPrice = useSelector((state) => (state.constructorIngredients.basket.length > 0
    ? state.constructorIngredients.basket
      .map((ingredient) => ingredient.price * (ingredient.type === 'bun' ? 2 : 1))
      .reduce((acc, price) => acc + price)
    : 0));

  const burgerBun = useSelector((state) => state.constructorIngredients.basket.find((ingredient) => ingredient.type === 'bun') || null);
  const burgerStuffing = useSelector((state) => state.constructorIngredients.basket.filter((ingredient) => ingredient.type !== 'bun') || null);

  const isReadyForOrder = useCallback((): boolean => !!(
    basket.find((ingredient) => ingredient.type === 'bun')
      && basket.find((ingredient) => ingredient.type !== 'bun')
      && !isWaitingForOrderNumber
  ), [basket, isWaitingForOrderNumber]);

  const onDropIngredient = (ingredient: IIngredient) => {
    if (ingredient.type === 'bun') {
      dispatch(addBunToConstructor({ _uid: uuidv4(), ...ingredient }));
    } else {
      dispatch(addIngredientToConstructor({ _uid: uuidv4(), ...ingredient }));
    }
  };

  const onClickOnConstructorElement = (e: React.MouseEvent<HTMLElement>, uid: string) => {
    const target = e.target as Element;

    if (target.closest('.constructor-element__action')) {
      dispatch(removeIngredientFromConstructor(uid));
    }
  };

  const [{ isHoverIngredient }, basketRef] = useDrop({
    accept: 'ingredients',
    collect: (monitor) => ({
      isHoverIngredient: monitor.isOver(),
    }),
    drop: (ingredient: IIngredient) => onDropIngredient(ingredient),
  });

  const makeOrder = async () => {
    if (!(accessToken || refreshToken)) {
      history.push('/login');
    } else if (!isWaitingForOrderNumber) {
      dispatch(postOrder(basket.map((b) => b._id)));
    }
  };

  return (
    <>
      <div
        className={classNames(styles.basketListContainer, (isHoverIngredient ? styles.basketListContainerHovered : ''), (ingredientDragged ? styles.basketListContainerWaitingForIngredient : ''))}
        ref={basketRef}
      >
        <div className={classNames(styles.bulletEdge, 'mr-4', 'mb-4')}>

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
          <div className={classNames(styles.constructorElement, 'constructor-element constructor-element_pos_top')}>
            <span className="text text_type_main-default text_color_inactive">Выберите булочку</span>
          </div>
          )}
        </div>

        {burgerStuffing.length > 0 && (
          <SimpleBar className={classNames(styles.basketListBar)}>
            <div className={classNames(styles.basketList, 'mr-4')}>
              {burgerStuffing.map((ingredient, index) => (
                <BurgerConstructorIngredient
                  key={ingredient._uid}
                  index={index}
                  ingredient={ingredient}
                  onClick={onClickOnConstructorElement}
                />
              ))}
            </div>
          </SimpleBar>
        )}

        {burgerStuffing.length === 0 && (
        <div className={classNames(styles.basketNoStuffing, styles.constructorElement, 'ml-15')}>
          <span className="text text_type_main-default text_color_inactive">Выберите наполнение</span>
        </div>
        )}
        <div className={classNames(styles.bulletEdge, 'mr-4', 'mt-4')}>
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
            <div className={classNames(styles.constructorElement, 'constructor-element constructor-element_pos_bottom')}>
              <span className="text text_type_main-default text_color_inactive">Выберите булочку</span>
            </div>
            )}
        </div>
      </div>

      <div className={classNames(styles.orderInfo, 'mt-10', 'mr-4', 'mb-10')}>
        {basket.length > 0 && (
          <div className={classNames(styles.orderInfoPrice, 'mr-10')}>
            <span className={classNames('text', 'text_type_digits-medium', 'mr-2')}>{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
        )}
        <Button
          type="primary"
          size="large"
          onClick={makeOrder}
          disabled={!isReadyForOrder()}
        >
          Оформить заказ
        </Button>
      </div>
    </>
  );
}
