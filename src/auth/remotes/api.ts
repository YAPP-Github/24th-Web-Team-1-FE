export const API_ROUTE = {
  MEMBERS: () => `/api/v1/members`,
  TOKEN: (auth_token: string) =>  `/api/v1/members/token/${auth_token}`
};
export const QUERY_KEY = {
  MEMBERS: "members",
  TOKEN: "token"
};
