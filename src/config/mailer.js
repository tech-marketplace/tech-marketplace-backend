import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Tech Marketplace",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

export const generateEmailConfirmToken = (id, userType) => {
  try {
    const expiresIn = "7d";
    const token = jwt.sign(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      //  return jwt.sign({ id, userRole }, config.jwt_secret_key, {
      config.jwt_secret_key,
      {
        expiresIn,
      }
    );
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};

export async function sendConfirmationEmail(email, firstName, token) {
  try {
    const confirmationUrl = `http://localhost:3001/api/useremail/confirm/${token}`;
    const currentUrl = "http://localhost:3001/";

    await sendEmail({
      email: userEmail,
      subject: "Verify Email Address",
      message: `Click this link to confirm your email: ${confirmationUrl}`,
      html: `
         <p>
         Dear ${firstName},
         </p>
         <p>Verify your email to complete your signup and login into your account</p>
         <p>This link <b>expires in 6 hours</b>.</p>
         <p>Press <a href="${currentUrl}api/useremail/confirm/${token}">here</a> to proceed.</p>
       `,
    });

    // Return true to indicate that the email was successfully sent
    return true;
  } catch (error) {
    console.error("Email sending error:", error);

    // Return false to indicate that there was an error sending the email
    return false;
  }
}
