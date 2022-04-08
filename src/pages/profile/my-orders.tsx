import React, { FC, useMemo } from 'react';
import { OrdersList } from '../../components/orders-list';
import { useAppSelector } from '../../hooks';

export const MyOrdersPage: FC = () => {
  const { orders } = useAppSelector((state) => state.feed);
  const myOrders = useMemo(() => orders?.filter((order) => !!order._isOwn) || null, [orders]);

  return (
    <OrdersList orders={myOrders} showOrderStatus />
  );
};
