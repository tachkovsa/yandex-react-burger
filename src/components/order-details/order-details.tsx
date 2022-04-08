import React, {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useParams } from 'react-router-dom';

import classNames from 'classnames';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import SimpleBar from 'simplebar-react';

import { humanizationDate, humanizationOrderStatus } from '../../utils/helpers';
import { IIngredient } from '../../utils/interfaces/ingredient.interface';
import { useWebSocket } from '../../hooks/useWebSocket';
import { useAppSelector } from '../../hooks';

import styles from './order-details.module.css';
import 'simplebar/dist/simplebar.min.css';

export const OrderDetails: FC = () => {
  useWebSocket();

  const { orderId } = useParams<{ orderId?: string }>();
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
  const { orders } = useAppSelector((state) => state.feed);

  const [orderIngredients, setOrderIngredients] = useState<(IIngredient & { _count?: number })[]>([]);

  const orderDetails = useMemo(
    () => orders?.find((order) => order._id === orderId)
      || null,
    [orders, orderId],
  );

  useEffect(() => {
    if (orderDetails) {
      const { ingredients: orderIngredients } = orderDetails;
      const uniqIngredients = Array.from(new Set(orderIngredients));

      setOrderIngredients(
        uniqIngredients
          .map((orderIngredient) => {
            const ingredient = ingredients.find((ingredient) => ingredient._id === orderIngredient);

            return (ingredient === undefined)
              ? undefined
              : {
                ...ingredient,
                _count: (orderIngredients.filter((ingredientId) => ingredientId === ingredient._id).length),
              };
          })
          .filter((ingredient) => ingredient !== undefined) as IIngredient[],
      );
    }
  }, [ingredients, orderDetails]);

  const orderStatus = useMemo(() => {
    if (orderDetails) {
      const { status } = orderDetails;
      return humanizationOrderStatus(status);
    }

    return { name: 'Не определен', fontClass: '' };
  }, [orderDetails]);

  const orderPrice = useCallback(
    () => (orderIngredients.length > 0 ? orderIngredients?.map((ingredient) => ingredient.price)
      .reduce((acc, price) => acc + price) : 0),
    [orderIngredients],
  );

  return (
    <div className={classNames(styles.orderDetails)}>
      {orderDetails && (
        <>
          <p className={classNames('text text_type_digits-default', styles.header)}>
            {`#${orderDetails.number}`}
          </p>
          <p className="text text_type_main-medium mt-10">
            {orderDetails.name}
          </p>
          <p className={classNames(orderStatus.fontClass, 'text text_type_main-default mt-3')}>
            {orderStatus.name}
          </p>
          <p className="text text_type_main-medium mt-15">
            Состав:
          </p>
          <SimpleBar className={classNames(styles.ingredients, 'mt-6')}>
            {orderIngredients.map((ingredient) => (
              <div className={classNames(styles.ingredient)} key={ingredient._id}>
                <div className={classNames(styles.ingredientPreview, 'mr-4')}>
                  <div
                    className={classNames(styles.ingredientPreviewImage)}
                    style={{ backgroundImage: `url(${ingredient.image})` }}
                  />
                </div>
                <div className={classNames(styles.ingredientName, 'mr-4')}>
                  {ingredient.name}
                </div>
                <div className={classNames(styles.ingredientCountNPrice)}>
                  <p className="text text_type_digits-default mr-2">{`${ingredient._count} x ${ingredient.price}`}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            ))}
          </SimpleBar>
          <div className={classNames(styles.footer, 'mt-10')}>
            <div className={classNames(styles.orderStamp, 'text text_type_main-default text_color_inactive')}>{humanizationDate(orderDetails.createdAt)}</div>
            <div className={styles.orderPrice}>
              <p className="text text_type_digits-default mr-2">
                {orderPrice()}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
