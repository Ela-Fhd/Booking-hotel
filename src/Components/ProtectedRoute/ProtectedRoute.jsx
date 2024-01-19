import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/LoginProvider";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth, navigate]);

  return isAuth ? children : null;
}

export default ProtectedRoute;
