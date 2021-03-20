import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import blogsService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";
import Togglable from "./components/Togglable";
import NewBlogForm from "./components/NewBlogForm";
import PropTypes from "prop-types";

import { showMessage, showErrorMessage } from "./reducers/messages";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showMessage("FIRST MESSAGE!"));
    blogsService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  const errorMessage = useSelector(
    ({ messages: { errorMessage } }) => errorMessage
  );
  const message = useSelector(({ messages: { message } }) => message);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogsService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      blogsService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(showErrorMessage("Wrong credentials"));
    }
  };

  const handleLogout = () => {
    setUser(null);
    blogsService.setToken(null);
    window.localStorage.removeItem("loggedBlogAppUser");
  };

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification className="error" message={errorMessage} />
      <Notification className="success" message={message} />
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

  const createBlog = async (newBlog) => {
    try {
      const createdBlog = await blogsService.create(newBlog);
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(createdBlog));
      dispatch(
        showMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      );
    } catch (exception) {
      dispatch(showErrorMessage(exception.response.data.error));
    }
  };

  const likeBlog = async (blog) => {
    const updatedBlog = await blogsService.put({
      ...blog,
      likes: blog.likes + 1,
    });
    setBlogs(
      blogs
        .map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
        .sort((a, b) => b.likes - a.likes)
    );
  };

  const removeBlog = async (blog) => {
    await blogsService.remove(blog);
    setBlogs(
      blogs.filter(({ id }) => id !== blog.id).sort((a, b) => b.likes - a.likes)
    );
  };

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <Notification className="error" message={errorMessage} />
      <Notification className="success" message={message} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
      </p>
      <Togglable
        showButtonLabel="new note"
        hideButtonLabel="cancel"
        ref={blogFormRef}
      >
        <NewBlogForm createBlog={createBlog} />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogList()}
    </div>
  );
};

const Notification = ({ message, ...props }) => {
  if (message === null) {
    return null;
  }

  return <div {...props}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
};

export default App;
