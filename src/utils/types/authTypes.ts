export type IUserType = 'customer' | 'merchant' | 'admin'

export interface IRegisterActionBody {
  name: string;
  email: string;
  usertype: IUserType;
  phone: string;
  password: string;
  password_confirmation: string;
}

export interface IAttemptLoginActionBody {
  email: string;
  password: string;
}