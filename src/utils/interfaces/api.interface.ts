import { IUser } from './user.interface';

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
