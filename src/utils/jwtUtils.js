import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const generateJWT = (user) => {
  try {
    const expiresIn = "1h";
    const token = jwt.sign(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      config.jwt_secret_key,
      {
        // const token = jwt.sign({ id: user._id }, config.get("jwtsecret"), {
        expiresIn,
      }
    );
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};
