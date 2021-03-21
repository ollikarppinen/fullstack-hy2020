import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import loginService from "./services/login";
import "./App.css";
import Togglable from "./components/Togglable";
import NewBlogForm from "./components/NewBlogForm";

import { useBlogsService } from "./hooks/index";
import { setUser, removeUser } from "./reducers/user";
import {
  showMessage,
  showErrorMessage,
  handleError,
} from "./reducers/messages";
import {
  createBlog,
  getAllBlogs,
  updateBlog,
  removeBlog,
} from "./reducers/blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";

const App = () => {
  const dispatch = useDispatch();

  const blogsService = useBlogsService();

  const user = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(getAllBlogs(blogsService));
  }, []);

  return <div>{user ? <BlogList /> : <LoginForm />}</div>;
};

const BlogList = () => {
  const dispatch = useDispatch();

  const blogsService = useBlogsService();

  const blogFormRef = useRef();

  const blogs = useSelector(({ blogs: { blogs } }) => blogs);

  const handleBlogRemove = (blog) =>
    dispatch(handleError(removeBlog(blogsService, blog)));

  const handleBlogLike = (blog) =>
    dispatch(
      handleError(
        updateBlog(blogsService, {
          ...blog,
          likes: blog.likes + 1,
        })
      )
    );

  const handleBlogCreate = (newBlog) => {
    dispatch(handleError(createBlog(blogsService, newBlog)));
    blogFormRef.current.toggleVisibility();
    dispatch(
      showMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    );
  };
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <LogoutForm />
      <Togglable
        showButtonLabel="new note"
        hideButtonLabel="cancel"
        ref={blogFormRef}
      >
        <NewBlogForm createBlog={handleBlogCreate} />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={handleBlogLike}
            removeBlog={handleBlogRemove}
          />
        ))}
      </div>
    </div>
  );
};

const LogoutForm = () => {
  const dispatch = useDispatch();

  const blogsService = useBlogsService();

  const user = useSelector(({ user }) => user);

  const handleLogout = () => {
    dispatch(removeUser());
    blogsService.setToken(null);
    window.localStorage.removeItem("loggedBlogAppUser");
  };

  return (
    <p>
      {user.name} logged in <button onClick={handleLogout}>log out</button>
    </p>
  );
};

export default App;
