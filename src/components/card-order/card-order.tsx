import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';

import { IOrderDetails } from '../../utils/interfaces/order.interface';
import { humanizationDate } from '../../utils/helpers';
import { TRootState } from '../../utils/types';

import styles from './card-order.module.css';
import { IIngredient } from '../../utils/interfaces/ingredient.interface';

type CardOrderProps = { orderDetails: IOrderDetails, maxIngredientsOnPreview?: number };
export const CardOrder: FC<CardOrderProps> = ({ orderDetails, maxIngredientsOnPreview = 4 }) => {
  const history = useHistory();
  const ingredients = useSelector((state: TRootState) => state.ingredients.ingredients);
  const [orderIngredients, setOrderIngredients] = useState<IIngredient[]>([]);

  const orderPrice = useCallback(
    () => (orderIngredients.length > 0 ? orderIngredients?.map((ingredient) => ingredient.price)
      .reduce((acc, price) => acc + price) : 0),
    [orderIngredients],
  );

  const openOrderDetails = () => history.push(`/feed/${orderDetails._id}`);

  useEffect(() => {
    const { ingredients: orderIngredients } = orderDetails;

    setOrderIngredients(
      orderIngredients
        .map((orderIngredient) => ingredients
          .find((ingredient) => ingredient._id === orderIngredient))
        .filter((ingredient) => ingredient !== undefined) as IIngredient[],
    );
  }, [ingredients, orderDetails]);

  return (
    <div
      className={styles.cardOrder}
      onClick={() => openOrderDetails()}
    >
      <div className={styles.header}>
        <p className="text text_type_digits-default">
          {`#${orderDetails.number}`}
        </p>
        <p className={classNames('text text_type_main-default text_color_inactive', styles.createDate)}>
          {humanizationDate(orderDetails.createdAt)}
        </p>
      </div>
      <p className="text text_type_main-medium mt-6">
        {orderDetails.name}
      </p>
      <div className={styles.footer}>
        <ul className={styles.ingredientsPreview}>
          {orderIngredients.slice(0, maxIngredientsOnPreview).map((ingredient, index) => {
            const isLast = index === maxIngredientsOnPreview - 1;

            return (
              <li className={classNames(styles.ingredientPreview, styles.ingredientPreviewLast)}>
                <div
                  className={classNames(styles.ingredientPreviewImage, isLast ? styles.ingredientPreviewImageTranslucent : null)}
                  style={{ backgroundImage: `url(${ingredient.image})` }}
                />
                {isLast && ingredients.length > maxIngredientsOnPreview && (
                <span className={classNames(styles.ingredientPreviewOverflow, 'text text_type_main-default')}>
                  {`+${ingredients.length - maxIngredientsOnPreview}`}
                </span>
                )}
              </li>
            );
          })}
        </ul>
        <div className={classNames(styles.orderPrice, 'ml-6')}>
          <p className="text text_type_digits-default mr-2">
            {orderPrice()}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

CardOrder.defaultProps = {
  maxIngredientsOnPreview: 6,
};
