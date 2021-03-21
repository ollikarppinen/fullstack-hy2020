import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import blogsService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";
import Togglable from "./components/Togglable";
import NewBlogForm from "./components/NewBlogForm";

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

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(getAllBlogs(blogsService));
  }, []);

  useEffect(() => {
    if (user && user.token) {
      blogsService.setToken(user.token);
    }
  }, [user]);

  return <div>{user ? <BlogList /> : <LoginForm />}</div>;
};

const BlogList = () => {
  const dispatch = useDispatch();

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

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      dispatch(setUser(user));
      blogsService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(showErrorMessage("Wrong credentials"));
    }
  };

  return (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

const Notification = () => {
  const errorMessage = useSelector(
    ({ messages: { errorMessage } }) => errorMessage
  );

  const message = useSelector(({ messages: { message } }) => message);

  return (
    <>
      {message ? <div className="success">{message}</div> : null}
      {errorMessage ? <div className="error">{errorMessage}</div> : null}
    </>
  );
};

export default App;
