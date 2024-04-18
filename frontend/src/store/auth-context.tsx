import { IAuth, LoginFormValues } from "@/interfaces/auth.interface";
import { firebaseAuth } from "../lib/firebase/setup";
import {
  SignIn as FirebaseSignIn,
  SignOut as FirebaseSignOut,
} from "../lib/firebase";
import { createContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";

export const AuthContext = createContext<IAuth>({
  user: firebaseAuth.currentUser,
  loading: false,
  SignIn: async () => {},
  SignOut: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  //   //Sign up
  //   const SignUp = (creds: UserFormValues) => {
  //     //implement sign up here - which is implemented below
  //   };

  const SignIn = async (creds: LoginFormValues) => {
    setIsLoading(true);
    FirebaseSignIn(creds)
      .then((userCredential) => {
        const { user } = userCredential;
        if (user) {
          setCurrentUser(user);
          navigate("/", { replace: true });
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        }

        setIsLoading(false);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/wrong-password":
            toast({
              variant: "destructive",
              title: "Invalid password.",
              description: "Make sure your password is correct.",
            });

            break;
          case "auth/invalid-credential":
            toast({
              variant: "destructive",
              title: "Invalid credentials.",
              description: "Make sure your email is correct.",
            });
            break;

          default:
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            });
            break;
        }

        setIsLoading(false);
      });
  };

  const SignOut = async () => {
    setIsLoading(true);
    try {
      await FirebaseSignOut();
      setCurrentUser(null);
      navigate("/login", { replace: true });
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
    // SignUp,
    SignOut,
  };

  useEffect(() => {
    //onAuthStateChanged check if the user is still logged in or not
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setCurrentUser(user);
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
