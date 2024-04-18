import instance from "@/lib/axios";
import { IUser, RegisterFormValues } from "@/interfaces/auth.interface";

export const login = async (token: string) => {
  const { data } = await instance.post<IUser>("auth/login", { token });

  return data;
};

export const register = async (payload: RegisterFormValues) => {
  const { data } = await instance.post("auth/register", payload);

  return data;
};
