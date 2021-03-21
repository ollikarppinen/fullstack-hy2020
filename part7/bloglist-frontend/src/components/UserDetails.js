import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useUsersService } from "../hooks/index";
import { getAllUsers } from "../reducers/users";

import NoMatch from "./NoMatch";

const UserDetails = () => {
  const dispatch = useDispatch();

  const usersService = useUsersService();

  const users = useSelector(({ users: { users } }) => users);

  useEffect(() => {
    if (!users.length) dispatch(getAllUsers(usersService));
  }, [users]);

  const id = useParams().id;
  const user = users.find((user) => user.id === id);

  if (!user) return <NoMatch />;

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <BlogList user={user} />
    </>
  );
};

const BlogList = ({ user: { blogs } }) => {
  if (blogs.length === 0) return "No blogs";
  return <ul>{blogs.map(BlogListItem)}</ul>;
};

const BlogListItem = ({ title }) => <li>{title}</li>;

export default UserDetails;
