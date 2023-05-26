import "./styles/index.scss";

import { MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import { SignIn } from "./Containers/Auth/containers";
import { getAuth } from "./Containers/Auth/store/selectors";
import PageWrapper from "./Containers/Common/PageWrapper";
import Spinner from "./Containers/Common/Spinner";
import {
  ChiefDetails,
  ChiefsList,
  CustomerDetails,
  CustomersList,
  StoreDetails,
  StoresList,
} from "./Containers/Customers/containers";
import Dashboard from "./Containers/Dashboard";
import {
  DetectiveDetails,
  DetectivesList,
} from "./Containers/Detectives/containers";
import PracticeDetails from "./Containers/Practices/containers/PracticeDetails";
import PracticesList from "./Containers/Practices/containers/PracticesList";
import {
  ServicesList,
  StatusesList,
} from "./Containers/TypesAndStatuses/containers";
import { ROLES, ROUTES } from "./routes/constants";
import { PrivateRoute, PublicRoute } from "./routes/containers";
import Error from "./shared/Error/Error";
import Loader from "./shared/Loader/Loader";
import muiTheme from "./themes/muiTheme";
import useAuth from "./utils/useAuth";

export default (props) => {
  const { isLoading } = useAuth();
  const isAuthenticated = useSelector(getAuth());

  return (
    <>
      {!isLoading ? (
        <MuiThemeProvider theme={muiTheme}>
          <Loader />
          <Error />
          <main className="container">
            <Routes>
              <Route
                path={ROUTES.SIGN_IN}
                element={
                  <PublicRoute
                    component={SignIn}
                    isAuthenticated={isAuthenticated}
                    restricted={true}
                  />
                }
              />
              <Route
                element={
                  <PageWrapper>
                    <Outlet />
                  </PageWrapper>
                }
              >
                <Route
                  path={ROUTES.DASHBOARD}
                  element={
                    <PrivateRoute
                      roles={[ROLES.ADMIN]}
                      component={Dashboard}
                      isAuthenticated={isAuthenticated}
                    />
                  }
                />
                <Route path={ROUTES.PRACTICES} element={<Outlet />}>
                  <Route
                    index
                    element={
                      <PrivateRoute
                        roles={[ROLES.ADMIN]}
                        component={PracticesList}
                        isAuthenticated={isAuthenticated}
                      />
                    }
                  />
                  <Route
                    path=":practiceId"
                    element={
                      <PrivateRoute
                        roles={[ROLES.ADMIN]}
                        component={PracticeDetails}
                        isAuthenticated={isAuthenticated}
                      />
                    }
                  />
                  <Route
                    path="pending"
                    element={
                      <PrivateRoute
                        roles={[ROLES.ADMIN]}
                        component={() => <PracticesList statusId={4} />}
                        isAuthenticated={isAuthenticated}
                      />
                    }
                  />
                </Route>
                <Route path={ROUTES.CUSTOMERS} element={<Outlet />}>
                  <Route
                    index
                    element={
                      <PrivateRoute
                        roles={[ROLES.ADMIN]}
                        component={CustomersList}
                        isAuthenticated={isAuthenticated}
                      />
                    }
                  />
                  <Route
                    path=":customerId"
                    element={
                      <PrivateRoute
                        roles={[ROLES.ADMIN]}
                        component={CustomerDetails}
                        isAuthenticated={isAuthenticated}
                      />
                    }
                  />
                </Route>
                <Route path={ROUTES.STORES} element={<Outlet />}>
                  <Route
                    index
                    element={
                      <PrivateRoute
                        roles={[ROLES.ADMIN]}
                        component={StoresList}
                        isAuthenticated={isAuthenticated}
                      />
                    }
                  />
                  <Route
                    path=":storeId"
                    element={
                      <PrivateRoute
                        roles={[ROLES.ADMIN]}
                        component={StoreDetails}
                        isAuthenticated={isAuthenticated}
                      />
                    }
                  />
                </Route>
                <Route path={ROUTES.CHIEF_MANAGERS} element={<Outlet />}>
                  <Route
                    index
                    element={
                      <PrivateRoute
                        roles={[ROLES.ADMIN]}
                        component={ChiefsList}
                        isAuthenticated={isAuthenticated}
                      />
                    }
                  />
                  <Route
                    path=":chiefId"
                    element={
                      <PrivateRoute
                        roles={[ROLES.ADMIN]}
                        component={ChiefDetails}
                        isAuthenticated={isAuthenticated}
                      />
                    }
                  />
                </Route>
                <Route element={<Outlet />}>
                  <Route
                    path={`${ROUTES.INTEGRATION}/statuses`}
                    element={
                      <PrivateRoute
                        roles={[ROLES.ADMIN]}
                        component={StatusesList}
                        isAuthenticated={isAuthenticated}
                      />
                    }
                  />
                  <Route
                    path={`${ROUTES.INTEGRATION}/services`}
                    element={
                      <PrivateRoute
                        roles={[ROLES.ADMIN]}
                        component={ServicesList}
                        isAuthenticated={isAuthenticated}
                      />
                    }
                  />
                  <Route path={ROUTES.DETECTIVES} element={<Outlet />}>
                    <Route
                      index
                      element={
                        <PrivateRoute
                          roles={[ROLES.ADMIN]}
                          component={DetectivesList}
                          isAuthenticated={isAuthenticated}
                        />
                      }
                    />
                    <Route
                      path=":detectiveId"
                      element={
                        <PrivateRoute
                          roles={[ROLES.ADMIN]}
                          component={DetectiveDetails}
                          isAuthenticated={isAuthenticated}
                        />
                      }
                    />
                  </Route>
                </Route>
                <Route
                  path="*"
                  element={
                    isAuthenticated ? (
                      <Navigate to={ROUTES.DASHBOARD} />
                    ) : (
                      <Navigate to={ROUTES.SIGN_IN} />
                    )
                  }
                />
              </Route>
            </Routes>
          </main>
        </MuiThemeProvider>
      ) : (
        <Spinner />
      )}
    </>
  );
};
