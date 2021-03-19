import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Metrics from "./pages/Metrics";
import Weights from "./pages/Weights";
import Settings from "./pages/Settings";
import ThemeProvider from "./providers/ThemeProvider";
import DefaultUserProvider from "./providers/DefaultUserProvider";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { auth, firestore } from "./utils/Firebase";
import LoadingComponent from "./components/LoadingComponent";
import { ToastProvider } from "react-toast-notifications";

// Auth + usersdata context - here because of loading
export const AuthContext = createContext(null);
export const UsersDataContext = createContext();

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      setIsLoading(true);
      setCurrentUser(authUser);

      //if logged in
      if (authUser) {
        const myPromise = new Promise((resolve, reject) => {
          firestore.collection("users").onSnapshot((serverUpdate) => {
            const dbdata = serverUpdate.docs.map((_doc) => {
              const data = _doc.data();
              data["id"] = _doc.id;
              return data;
            });
            setUsersData(dbdata);
            resolve(true);
          });
        });
        myPromise.then(() => setIsLoading(false));
      }

      //If not logged in
      else {
        setIsLoading(false);
      }
    });
  }, [currentUser]);

  return (
    <AuthContext.Provider value={currentUser}>
      <UsersDataContext.Provider value={usersData}>
        <ThemeProvider>
          <ToastProvider autoDismiss={true} autoDismissTimeout={2500} placement="top-center">
            <DefaultUserProvider>
              {isLoading ? (
                <LoadingComponent />
              ) : (
                <Router>
                  {currentUser != null && <NavBar />}
                  <Switch>
                    <PrivateRoute path="/" exact>
                      <Redirect to="/dashboard" />
                    </PrivateRoute>
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute path="/metrics" exact component={Metrics} />
                    <PrivateRoute path="/weights" exact component={Weights} />
                    <PrivateRoute path="/settings" exact component={Settings} />
                    <Route path="/login" exact component={Login} />
                  </Switch>
                </Router>
              )}
            </DefaultUserProvider>
          </ToastProvider>
        </ThemeProvider>
      </UsersDataContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
