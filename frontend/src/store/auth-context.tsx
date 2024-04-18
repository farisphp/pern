import {
  IAuth,
  IUser,
  LoginFormValues,
  RegisterFormValues,
} from "@/interfaces/auth.interface";
import { firebaseAuth } from "../lib/firebase/setup";
import {
  SignIn as FirebaseSignIn,
  SignOut as FirebaseSignOut,
  SignInCustomToken,
} from "../lib/firebase";
import { createContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { login, register } from "@/services/auth";
import { handleException } from "@/lib/firebase/exception";

export const AuthContext = createContext<IAuth>({
  user: null,
  loading: false,
  SignUp: async () => {},
  SignIn: async () => {},
  SignOut: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();

  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchUser = async (user: User) => {
    const token = await user.getIdToken();
    const res = await login(token);
    setCurrentUser(res);
  };

  const SignUp = async (payload: RegisterFormValues) => {
    try {
      setIsLoading(true);

      const { token } = await register(payload);
      const { user } = await SignInCustomToken(token);
      if (user) {
        fetchUser(user);
        navigate("/", { replace: true });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }

      setIsLoading(false);
    } catch (error) {
      handleException(error);

      setIsLoading(false);
    }
  };

  const SignIn = async (payload: LoginFormValues) => {
    try {
      setIsLoading(true);
      const { user } = await FirebaseSignIn(payload);

      if (user) {
        fetchUser(user);
        navigate("/", { replace: true });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }

      setIsLoading(false);
    } catch (error) {
      handleException(error);

      setIsLoading(false);
    }
  };

  const SignOut = async () => {
    setIsLoading(true);
    try {
      await FirebaseSignOut();
      setCurrentUser(null);
      navigate("/login", { replace: true });
      setIsLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      setIsLoading(false);
    }
  };

  const authValues: IAuth = {
    user: currentUser,
    loading: isLoading,
    SignIn,
    SignUp,
    SignOut,
  };

  useEffect(() => {
    //onAuthStateChanged check if the user is still logged in or not
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) fetchUser(user);
      setIsAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  //If loading for the first time when visiting the page
  if (isAuthLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
