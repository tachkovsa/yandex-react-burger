export interface ICommonResponse {
  success: boolean;
  message: string;
}

export interface ITokenResponse extends ICommonResponse {
  accessToken: string;
  refreshToken: string;
}
