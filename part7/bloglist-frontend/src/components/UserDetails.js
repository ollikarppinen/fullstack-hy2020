import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

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
  return <ListGroup>{blogs.map(BlogListItem)}</ListGroup>;
};

const BlogListItem = ({ id, title }) => (
  <ListGroup.Item key={id}>
    <Link to={`/blogs/${id}`}>{title}</Link>
  </ListGroup.Item>
);

export default UserDetails;
