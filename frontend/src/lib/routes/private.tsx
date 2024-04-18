import { useAuth } from "@/context/auth";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  return children;
};

export default PrivateRoute;
