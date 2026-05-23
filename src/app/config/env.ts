import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  port: string;

  database_url: string;

  node_env: string;

  bcrypt_salt_rounds: string;

  jwt_access_secret: string;

  jwt_access_expires_in: string;

  jwt_refresh_secret: string;

  jwt_refresh_expires_in: string;
}

export const envVars: EnvConfig = {
  port: process.env.PORT || "5000",

  database_url: process.env.DATABASE_URL || "",

  node_env: process.env.NODE_ENV || "development",

  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || "10",

  jwt_access_secret: process.env.JWT_ACCESS_SECRET || "",

  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || "1d",

  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || "",

  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
};
