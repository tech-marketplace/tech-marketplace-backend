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
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    // .then((user) => {

    // const tokenPayload = { email: newUser.email, role: "Buyer" };
    // const verificationToken = generateToken(tokenPayload);

    // // const userVerificationLink = `https://mindafrikserver.onrender.com/user/verify-email?token=${verificationToken}`;
    // const userVerificationLink = `http://localhost:3000/user/verify-email?token=${verificationToken}`;
    // sendConfirmationEmail(
    //   req,
    //   newUser.email,
    //   newUser.firstName,
    //   userVerificationLink
    // );

    const token = generateJWT(newUser); // Generate JWT using the helper function

    // sendConfirmationEmail(req, user.email, user.firstName);

    res.json({
      // token,
      user: {
        id: newUser._id,
        firstname: newUser.firstName,
        lastname: newUser.lastName,
        email: newUser.email,
        token: token,
      },
    });
    console.log(user);
    // });
  },
  verifyEmailController: async (req, res) => {
    const { token } = req.query;
    try {
      const decoded = verifyToken(token);
      // const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const email = decoded.payload.email;
      const role = decoded.role;

      const user = await Counsellor.findOne({ email });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
          status: "Error",
        });
      }
      if (user.isEmailVerified) {
        return res.status(200).json({
          message: "Email already verified",
          status: "Success",
        });
      }

      user.isEmailVerified = true;
      await user.save();
      // res.redirect("https://www.mindafrik.com/email-verified");
      res.redirect("http://localhost:3000");
    } catch (error) {
      console.error("Token validation failed:", error);
      res.status(400).json({
        message: "Invalid token",
        status: "Error",
        // error: error.message,
      });
    }
  },

  loginController: async (req, res) => {
    const { error } = loginValidator.validate(req.body);
    if (error) throw error;
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
      // email: req.body?.email,
    });
    if (!user) throw new BadUserRequestError("Incorrect email or password");

    const hash = bcrypt.compareSync(req.body.password, user.password);
    // const hash = bcrypt.compareSync(req.body.password, user.password);
    if (!hash) throw new BadUserRequestError("incorrect email or password");

    const token = generateJWT(user);

    res.json({
      user: {
        id: user._id,
        firstname: user.firstName,
        email: user.email,
        token: token,
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
