import { IOrderDetails } from './order.interface';

export type TFeedTypes = 'all' | 'my';

export type TServerFeedMessage = {
  orders: Array<IOrderDetails>;
  total: number;
  totalToday: number;
  success: boolean;
};
