import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import "./App.css";

import Notification from "./components/Notification";
import LogoutForm from "./components/LogoutForm";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";

const App = () => {
  const currentUser = useSelector(({ currentUser }) => currentUser);

  if (!currentUser) return <LoginForm />;

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <LogoutForm />
      <Router>
        <Switch>
          <Route exact path={["/", "/blogs"]}>
            <BlogList />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

const NoMatch = () => {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
};

export default App;
