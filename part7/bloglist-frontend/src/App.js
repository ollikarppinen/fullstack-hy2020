import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import "./App.css";

import { useBlogsService } from "./hooks/index";
import { getAllBlogs } from "./reducers/blogs";

import Notification from "./components/Notification";
import LogoutForm from "./components/LogoutForm";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";

const App = () => {
  const dispatch = useDispatch();

  const blogsService = useBlogsService();

  const user = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(getAllBlogs(blogsService));
  }, []);

  if (!user) return <LoginForm />;

  return (
    <div>
      <h2>blogs</h2>
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

const UserList = () => {
  return <div>users</div>;
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
