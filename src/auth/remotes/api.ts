export const API_ROUTE = {
  MEMBERS: () => `/api/v1/members`,
  TOKEN: (auth_token: string) =>  `/api/v1/members/token/${auth_token}`,
  LOGOUT: () => `/api/v1/members`
};
export const QUERY_KEY = {
  MEMBERS: "members",
  TOKEN: "token",
  LOGOUT: "logout"
};
