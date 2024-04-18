import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
export default function AppPage() {
  const { user, SignOut } = useAuth();
  return (
    <div className="w-full h-screen flex flex-col gap-2 items-center justify-center">
      <h1>Welcome to Dashboard, {user?.displayName}</h1>
      <Button onClick={() => SignOut()}>Log out</Button>
    </div>
  );
}
