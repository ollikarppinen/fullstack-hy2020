import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";

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
      {currentUser.name} logged in
      <Button onClick={handleLogout}>log out</Button>
    </>
  );
};

export default LogoutForm;
