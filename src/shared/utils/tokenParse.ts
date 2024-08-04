import { Token } from "@shared/types/token";

export const tokenParse = (token: string): Token => {
  const base64 = Buffer.from(token.split(".")[1], "base64").toString();
  return JSON.parse(base64);
};
