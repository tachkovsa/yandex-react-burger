import { useDispatch } from 'react-redux';
import React, { useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import classNames from 'classnames';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Actions from '../../services/actions';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { ingredientsPropTypes } from '../../utils/types';

function BurgerIngredient({ ingredient, inBasketCount }) {
  const dispatch = useDispatch();
  const didMount = useRef(false);

  const { _id, type } = ingredient;

  const [{ isDrag }, drag] = useDrag({
    type: 'ingredients',
    item: { _id, type },
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
    <div ref={drag} className={classNames(burgerIngredientsStyles.ingredientItem, isDrag ? burgerIngredientsStyles.ingredientItemDragged : '')}>
      {!!inBasketCount && (<div className={classNames(burgerIngredientsStyles.ingredientItemCount, 'text', 'text_type_digits-default')}>{ inBasketCount }</div>)}
      <picture className={classNames(burgerIngredientsStyles.ingredientItemImg, 'ml-4', 'mr-4')}>
        <source media="(max-width: 640px)" srcSet={ingredient.image_mobile} />
        <source media="(min-width: 1921px)" srcSet={ingredient.image_large} />
        <img src={ingredient.image} alt={ingredient.name} />
      </picture>
      <div className={classNames(burgerIngredientsStyles.ingredientItemPrice, 'mt-1')}>
        <CurrencyIcon type="primary" />
        <span className={classNames(burgerIngredientsStyles.ingredientItemPricePriceValue, 'ml-2', 'text', 'text_type_digits-default')}>{ ingredient.price }</span>
      </div>
      <div className={classNames(burgerIngredientsStyles.ingredientItemName, 'mt-1', 'text', 'text_type_main-default')}>
        { ingredient.name }
      </div>
    </div>
  );
}

BurgerIngredient.propTypes = {
  ingredient: ingredientsPropTypes.isRequired,
  inBasketCount: PropTypes.number.isRequired,
};

export default BurgerIngredient;
