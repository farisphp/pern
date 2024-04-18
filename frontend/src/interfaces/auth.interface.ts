import { User } from "firebase/auth"; //type User import

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface IAuth {
  user: User | null; //type User comes from firebase
  loading: boolean;
  SignIn: (creds: LoginFormValues) => Promise<void>;
  // SignUp: (creds:  UserFormValues) =>  void;
  SignOut: () => void;
}
