import { IUser } from './user.interface';
import { IIngredient } from './ingredient.interface';

export interface ICommonResponse {
  success: boolean;
  message: string;
}

export interface ITokenResponse extends ICommonResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterResponse extends ITokenResponse {
  user: IUser;
}

export interface ILoginResponse extends IRegisterResponse {}

export interface IFetchUserInfoResponse extends ICommonResponse {
  user: IUser;
}

export interface IIngredientsResponse extends ICommonResponse {
  data: IIngredient[];
}

export interface IPostOrderResponse extends ICommonResponse {
  order: {
    number: number;
    name: string;
  }
}
