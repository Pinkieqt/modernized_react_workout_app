import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../App";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const currentUser = useContext(AuthContext);

  return <Route {...rest} render={(routeProps) => (!!currentUser ? <RouteComponent {...routeProps} /> : <Redirect to={"/login"} />)} />;
};

export default PrivateRoute;
