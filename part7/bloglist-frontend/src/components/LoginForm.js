import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import loginService from "../services/login";
import { useBlogsService } from "../hooks/index";
import { setCurrentUser } from "../reducers/currentUser";
import { showErrorMessage } from "../reducers/messages";
import Notification from "./Notification";

const LoginForm = () => {
  const dispatch = useDispatch();

  const blogsService = useBlogsService();

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
      dispatch(setCurrentUser(user));
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
        <Button id="login-button" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
