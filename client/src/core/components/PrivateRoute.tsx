import { Navigate, Route, RouteProps } from "react-router";
import { useSelector } from 'react-redux'

import { RootStore } from "../../utils/TypeScript";

type PrivateRouteProps = {
  roles?: string[];
} & RouteProps;

const PrivateRoute = ({
  children,
  roles,
  ...routeProps
}: PrivateRouteProps) => {
  const { auth } = useSelector((state: RootStore) => state)

  if (auth.token !== null) {
    return <Route {...routeProps} />;
  } else {
    return <Navigate to={`/${process.env.PUBLIC_URL}/login`} />;
  }
};

export default PrivateRoute;
