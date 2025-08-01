import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
