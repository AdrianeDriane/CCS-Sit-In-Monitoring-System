import { ROLE_OPTIONS, type UserRole } from "../types";

export const getRoleRoute = (role: UserRole) => {
  const option = ROLE_OPTIONS.find((item) => item.value === role);
  return option ? `/${option.routePrefix}` : "/login";
};
