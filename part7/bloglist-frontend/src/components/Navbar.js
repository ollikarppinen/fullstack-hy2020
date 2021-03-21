import React from "react";
import { Link } from "react-router-dom";

import LogoutForm from "./LogoutForm";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to={`/blogs`}>blogs</Link>
      <Link to={`/users`}>users</Link>
      <LogoutForm />
    </div>
  );
};

export default Navbar;
