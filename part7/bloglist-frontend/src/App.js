import React, { useEffect, useState } from "react";
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

  const [filterValue, setFilterValue] = useState(0);

  useEffect(() => {
    setTimeout(() => setFilterValue(filterValue + 5), 100);
  }, [filterValue]);

  const hueRotateValue = filterValue % 10000;
  const invertValue = Math.floor((filterValue / 100) % 2)
    ? 100 - (filterValue % 100)
    : filterValue % 100;

  const style = {
    filter: `hue-rotate(${hueRotateValue}deg) invert(${invertValue}%)`,
    height: "100%",
  };

  if (!currentUser)
    return (
      <Container style={style}>
        <LoginForm />
      </Container>
    );

  return (
    <div style={style}>
      <Router>
        <Navbar />
        <Container>
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
        </Container>
      </Router>
    </div>
  );
};

export default App;
