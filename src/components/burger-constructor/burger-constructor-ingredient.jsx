import classNames from 'classnames';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import { ingredientsPropTypes } from '../../utils/types';

export function BurgerConstructorIngredient({ ingredient, onClick }) {
  return (
    <div
      className={classNames(burgerConstructorStyles.basketListElem, 'ml-4')}
    >
      <div className={burgerConstructorStyles.basketListDragIcon}>
        <DragIcon type="primary" />
      </div>
      <div
        className={classNames(burgerConstructorStyles.bullet, 'ml-2')}
        onClick={(e) => onClick(e, ingredient._uid)}

      >
        <ConstructorElement
          isLocked={false}
          text={`${ingredient.name}`}
          price={ingredient.price}
          thumbnail={ingredient.image}
        />
      </div>
    </div>
  );
}

BurgerConstructorIngredient.propTypes = {
  ingredient: ingredientsPropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
};
