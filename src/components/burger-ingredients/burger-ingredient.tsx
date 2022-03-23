import React, { FC, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import classNames from 'classnames';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient } from '../../utils/interfaces/ingredient.interface';

import Actions from '../../store/actions';
import styles from './burger-ingredients.module.css';

export interface IBurgerIngredientProps {
  ingredient: IIngredient,
  inBasketCount: number
}

export const BurgerIngredient: FC<IBurgerIngredientProps> = ({ ingredient, inBasketCount }) => {
  const dispatch = useDispatch();
  const didMount = useRef(false);

  const [{ isDrag }, drag] = useDrag({
    type: 'ingredients',
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (didMount.current) {
      if (isDrag) {
        dispatch({ type: Actions.DRAG_INGREDIENT });
      } else {
        dispatch({ type: Actions.DROP_INGREDIENT });
      }
    } else {
      didMount.current = true;
    }
  }, [dispatch, isDrag]);

  return (
    <div ref={drag} className={classNames(styles.ingredientItem, isDrag ? styles.ingredientItemDragged : '')}>
      {!!inBasketCount && (<div className={classNames(styles.ingredientItemCount, 'text', 'text_type_digits-default')}>{ inBasketCount }</div>)}
      <picture className={classNames(styles.ingredientItemImg, 'ml-4', 'mr-4')}>
        <source media="(max-width: 640px)" srcSet={ingredient.image_mobile} />
        <source media="(min-width: 1921px)" srcSet={ingredient.image_large} />
        <img src={ingredient.image} alt={ingredient.name} />
      </picture>
      <div className={classNames(styles.ingredientItemPrice, 'mt-1')}>
        <CurrencyIcon type="primary" />
        <span className={classNames(styles.ingredientItemPricePriceValue, 'ml-2', 'text', 'text_type_digits-default')}>{ ingredient.price }</span>
      </div>
      <div className={classNames(styles.ingredientItemName, 'mt-1', 'text', 'text_type_main-default')}>
        { ingredient.name }
      </div>
    </div>
  );
};
