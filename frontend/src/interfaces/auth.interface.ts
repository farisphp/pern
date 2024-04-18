export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  email: string;
  username: string;
  fullname: string;
  password: string;
}

export interface IUser {
  id: string;
  fulllname: string;
  uid: string;
  email: string;
  username: string;
}

export interface IAuth {
  user: IUser | null;
  loading: boolean;
  SignUp: (creds: RegisterFormValues) => Promise<void>;
  SignIn: (creds: LoginFormValues) => Promise<void>;
  SignOut: () => void;
}
