import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredientsPropTypes } from '../../utils/types';

import Actions from '../../store/actions';
import styles from './burger-constructor.module.css';

export function BurgerConstructorIngredient({
  index, ingredient, onClick,
}) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [{ handlerId }, drop] = useDrop({
    accept: 'constructorIngredients',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      if (item.ingredient._uid === ingredient._uid) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      const hoverBoundingRect = ref.current ? ref.current.getBoundingClientRect() : undefined;
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: Actions.CHANGE_CONSTRUCTOR_INGREDIENT_POSITION,
        payload: {
          whichIngredientDroppedId: item.ingredient._uid,
          onWhichIngredientDroppedId: ingredient._uid,
        },
      });
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'constructorIngredients',
    item: () => ({ ingredient, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      className={classNames(styles.basketListElem, isDragging ? styles.basketListElemDragging : null, styles.basketListElemDraggable, 'ml-4')}
      ref={ref}
      data-handler-id={handlerId}
    >
      <div className={styles.basketListDragIcon}>
        <DragIcon type="primary" />
      </div>
      <div
        className={classNames(styles.bullet, 'ml-2')}
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
  index: PropTypes.number.isRequired,
  ingredient: ingredientsPropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
};
