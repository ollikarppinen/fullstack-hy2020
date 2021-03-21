import { useEffect } from "react";
import { useSelector } from "react-redux";

import crudResourceService from "../services/crudResource";

export const useBlogsService = () => useCrudResource("/api/blogs");

export const useUsersService = () => useCrudResource("/api/users");

const useCrudResource = (baseUrl) => {
  const { token } = useSelector(({ user }) => user || {});

  crudResourceService.setBaseUrl(baseUrl);
  useEffect(() => crudResourceService.setToken(token), [token]);

  return crudResourceService;
};
