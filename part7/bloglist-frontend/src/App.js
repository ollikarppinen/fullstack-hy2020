import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Notification from "./components/Notification";
import LogoutForm from "./components/LogoutForm";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import BlogDetails from "./components/BlogDetails";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import NoMatch from "./components/NoMatch";

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
          <Route path="/blogs/:id">
            <BlogDetails />
          </Route>
          <Route path="/users/:id">
            <UserDetails />
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

export default App;
