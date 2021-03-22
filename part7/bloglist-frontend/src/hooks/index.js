import { useEffect } from "react";
import { useSelector } from "react-redux";

import crudResourceService from "../services/crudResource";

export const useBlogsService = () => useCrudResourceService("/api/blogs");

export const useUsersService = () => useCrudResourceService("/api/users");

export const useBlogCommentsService = ({ id }) =>
  useCrudResourceService(`/api/blogs/${id}/comments`);

const useCrudResourceService = (baseUrl) => {
  const { token } = useSelector(({ currentUser }) => currentUser || {});

  const service = crudResourceService(baseUrl);
  useEffect(() => service.setToken(token), [token]);

  return service;
};
