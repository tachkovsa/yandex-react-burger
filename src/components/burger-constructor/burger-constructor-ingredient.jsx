import classNames from 'classnames';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import burgerConstructorStyles from './burger-constructor.module.css';
import { ingredientsPropTypes } from '../../utils/types';

export function BurgerConstructorIngredient({
  index, ingredient, onClick, onMove,
}) {
  const ref = useRef(null);

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

      if (dragIndex === hoverIndex) {
        return;
      }

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

      onMove(dragIndex, hoverIndex);
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
      className={classNames(burgerConstructorStyles.basketListElem, isDragging ? burgerConstructorStyles.basketListElemDragging : null, burgerConstructorStyles.basketListElemDraggable, 'ml-4')}
      ref={ref}
      data-handler-id={handlerId}
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
  index: PropTypes.number.isRequired,
  ingredient: ingredientsPropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
};
