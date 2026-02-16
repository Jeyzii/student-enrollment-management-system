import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("staffLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // redirect if not logged in
  }

  return children; // show page if logged in
};

export default PrivateRoute;
