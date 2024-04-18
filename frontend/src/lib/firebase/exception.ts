import { toast } from "@/components/ui/use-toast";
import { FirebaseError } from "firebase/app";

export function handleException(error: unknown) {
  if (error instanceof FirebaseError) {
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
  } else {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
    });
  }
}
