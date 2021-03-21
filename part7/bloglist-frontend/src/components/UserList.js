import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
    <table>
      <tr>
        <th></th>
        <th>blogs created</th>
      </tr>
      {users.map(User)}
    </table>
  );

  return (
    <div>
      <h2>Users</h2>
      {users.length > 0 ? usersTable() : "no users"}
    </div>
  );
};

const User = ({ name, blogs }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{blogs.length}</td>
    </tr>
  );
};

export default UserList;
