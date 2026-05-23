import jwt, { Secret } from "jsonwebtoken";

export const createToken = (
  payload: object,
  secret: Secret,
  expiresIn: string,
) => {
  return jwt.sign(payload, secret, {
    expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
  });
};
