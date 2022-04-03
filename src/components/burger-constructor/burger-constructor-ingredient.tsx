import React, { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import { IIngredient } from '../../utils/interfaces/ingredient.interface';
import { objectHasKeys } from '../../utils/validation';
import { changeConstructorIngredientPosition } from '../../store/actions/constructor-ingredients';

interface IBurgerConstructorIngredientProps {
  index: number,
  ingredient: (IIngredient & { _uid: string }),
  onClick: (e: React.MouseEvent<HTMLDivElement>, uid: string) => void
}

export const BurgerConstructorIngredient: FC<IBurgerConstructorIngredientProps> = ({
  index, ingredient, onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
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

      let definedItem;
      if (typeof item === 'object' && objectHasKeys(item, ['index', 'ingredient'])) {
        definedItem = item as { index: number, ingredient: (IIngredient & { _uid: string }) };
      } else {
        return;
      }

      if (definedItem.ingredient._uid === ingredient._uid) {
        return;
      }

      const dragIndex = definedItem.index;
      const hoverIndex = index;

      const hoverBoundingRect = ref ? ref.current.getBoundingClientRect() : undefined;
      if (!hoverBoundingRect) {
        return;
      }

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) {
        return;
      }

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(
        changeConstructorIngredientPosition({
          whichIngredientDroppedId: definedItem.ingredient._uid,
          onWhichIngredientDroppedId: ingredient._uid,
        }),
      );
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
};
