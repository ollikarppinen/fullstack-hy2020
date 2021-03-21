import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useBlogsService } from "../hooks/index";
import { removeCurrentUser } from "../reducers/currentUser";

const LogoutForm = () => {
  const dispatch = useDispatch();

  const blogsService = useBlogsService();

  const currentUser = useSelector(({ currentUser }) => currentUser);

  const handleLogout = () => {
    dispatch(removeCurrentUser());
    blogsService.setToken(null);
    window.localStorage.removeItem("loggedBlogAppUser");
  };

  return (
    <>
      <p>{currentUser.name} logged in </p>
      <button onClick={handleLogout}>log out</button>
    </>
  );
};

export default LogoutForm;
