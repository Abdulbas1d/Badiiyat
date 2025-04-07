import { Navigate } from "react-router-dom";

export function ProtectedRoutes({ admin, children }) {
  if (admin) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
