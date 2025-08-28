import { AuthContext } from "@/context/FakeAuthContext";
import { useContext } from "react";

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("This context was used outside the AuthProvider");
  }

  return context;
}

export { useAuth };
