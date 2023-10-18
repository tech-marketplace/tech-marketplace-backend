import dotenv from "dotenv";

dotenv.config({ path: "./configenv.env" });

const production = {
  MONGODB_CONNECTION_URL: process.env.PRODUCTION_MONGODB_CONNECTION_URL,
  bcrypt_salt_round: process.env.PRODUCTION_BCRYPT_SALT_ROUND,
  jwt_secret_key: process.env.PRODUCTION_JWT_SECRET,
  //   refresh_secret_key: process.env.PRODUCTION_REFRESH_JWT_SECRET,
  PORT: process.env.PORT,
};

export default production;
