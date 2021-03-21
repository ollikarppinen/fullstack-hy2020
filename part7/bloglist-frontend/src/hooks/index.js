import { useEffect } from "react";
import { useSelector } from "react-redux";

import blogsService from "../services/blogs";

export const useBlogsService = () => {
  const { token } = useSelector(({ user }) => user || {});

  useEffect(() => blogsService.setToken(token), [token]);
  return blogsService;
};
