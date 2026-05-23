import jwt, { Secret, SignOptions } from "jsonwebtoken";

export const createToken = (
  jwtPayload: object,
  secret: Secret,
  expiresIn: SignOptions["expiresIn"],
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
