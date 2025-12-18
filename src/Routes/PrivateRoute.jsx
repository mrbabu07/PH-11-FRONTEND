import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import Loading from "../Pages/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoading, userStatus } = useContext(AuthContext);
  if(loading || roleLoading){
    return <p><Loading/></p>
  }

  if (!user || !userStatus == 'active') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
