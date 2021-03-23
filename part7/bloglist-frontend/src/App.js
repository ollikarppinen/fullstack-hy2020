import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import "./App.css";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import BlogDetails from "./components/BlogDetails";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import NoMatch from "./components/NoMatch";
import Navbar from "./components/Navbar";

const App = () => {
  const currentUser = useSelector(({ currentUser }) => currentUser);

  if (!currentUser)
    return (
      <Container>
        <LoginForm />
      </Container>
    );

  return (
    <Container>
      <Router>
        <Navbar />
        <Notification />
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
    </Container>
  );
};

export default App;
