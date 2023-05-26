import { Navigate, useLocation } from "react-router-dom";

import { ROUTES } from "../constants";

export const PublicRoute = ({
  component: RouteComponent,
  isAuthenticated,
  restricted = false,
}) => {
  let location = useLocation();

  if (isAuthenticated && restricted) {
    return <Navigate to={ROUTES.DASHBOARD} state={{ from: location }} />;
  }

  return <RouteComponent />;
};
