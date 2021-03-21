import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";

import { useBlogsService } from "./hooks/index";
import { getAllBlogs } from "./reducers/blogs";

import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";

const App = () => {
  const dispatch = useDispatch();

  const blogsService = useBlogsService();

  const user = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(getAllBlogs(blogsService));
  }, []);

  return <div>{user ? <BlogList /> : <LoginForm />}</div>;
};

export default App;
