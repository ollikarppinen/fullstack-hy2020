import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useBlogsService } from "../hooks/index";
import { removeUser } from "../reducers/user";

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

export default LogoutForm;
