import { useAuth } from "@/context/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export { ProtectedRoute };
