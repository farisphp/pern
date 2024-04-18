import {
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  signInWithCustomToken,
} from "firebase/auth";
import { firebaseAuth } from "./setup";
import { LoginFormValues } from "@/interfaces/auth.interface";

setPersistence(firebaseAuth, browserLocalPersistence);

export const SignIn = async ({ email, password }: LoginFormValues) => {
  const result = await signInWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  return result;
};
export const SignInCustomToken = async (token: string) => {
  const result = await signInWithCustomToken(firebaseAuth, token);
  return result;
};

export const SignOut = async () => {
  await signOut(firebaseAuth);
};
