import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

import { useUsersService } from "../hooks/index";
import { getAllUsers } from "../reducers/users";

const UserList = () => {
  const dispatch = useDispatch();

  const usersService = useUsersService();

  useEffect(() => {
    dispatch(getAllUsers(usersService));
  }, []);

  const users = useSelector(({ users: { users } }) => users);

  const usersTable = () => (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>name</th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>{users.map(User)}</tbody>
    </Table>
  );

  return (
    <>
      <h2>Users</h2>
      {users.length > 0 ? usersTable() : "no users"}
    </>
  );
};

const User = ({ id, name, blogs }) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${id}`}>{name}</Link>
      </td>
      <td>{blogs.length}</td>
    </tr>
  );
};

export default UserList;
