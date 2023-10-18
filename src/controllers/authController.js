import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import { BadUserRequestError } from "../error/error.js";
import { userValidator, loginValidator } from "../validators/authValidator.js";
import { generateJWT } from "../utils/jwtUtils.js";
import config from "../config/index.js";
import dotenv from "dotenv";

dotenv.config({ path: "./configenv.env" });

const authController = {
  signUpController: async (req, res) => {
    const { error } = userValidator.validate(req.body);
    if (error) throw error;
    const { firstName, lastName, email, password } = req.body;
    const emailExists = await User.find({ email });
    if (emailExists.length > 0)
      throw new BadUserRequestError(
        "An account with this email already exists"
      );
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });
    newUser.save().then((user) => {
      const token = generateJWT(user); // Generate JWT using the helper function
      res.json({
        token,
        user: {
          id: user._id,
          firstname: user.firstName,
          lastname: user.lastName,
          email: user.email,
        },
      });
    });
  },
  loginController: async (req, res) => {
    const { error } = loginValidator.validate(req.body);
    if (error) throw error;
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
      // email: req.body?.email,
    });
    if (!user) throw new BadUserRequestError("Incorrect email");

    const hash = bcrypt.compareSync(req.body.password, user.password);
    // const hash = bcrypt.compareSync(req.body.password, user.password);
    if (!hash) throw new BadUserRequestError("incorrect password");

    const token = generateJWT(user);

    res.json({
      token,
      user: {
        id: user._id,
        firstname: user.firstName,
        email: user.email,
      },
    });
  },
  getOneUser: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const userDetails = {
        id: user._id,
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
      };

      res.json(userDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default authController;
