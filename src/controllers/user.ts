import { RequestHandler } from "express";
import { createUser, VerifyEmailRequest } from "#/@types/user";
import User from "#/models/user";
import { generateToken } from "#/utils/helper";
import { sendForgotPasswordLink, sendVerificationMail } from "#/utils/mail";
import EmailVerificationToken from "#/models/emailVerificationToken";
import { isValidObjectId } from "mongoose";
import PasswordResetToken from "#/models/passwordResetToken";
import crypto from "crypto";
import { PASSWORD_RESET_LINK } from "#/utils/variables";

export const create: RequestHandler = async (req: createUser, res) => {
  const { email, password, name } = req.body;

  const user = await User.create({ email, password, name });

  // send verification Email
  const token = generateToken();

  await EmailVerificationToken.create({
    owner: user._id,
    token,
  });

  sendVerificationMail(token, { name, email, userId: user._id.toString() });

  res.status(201).json({ user: { id: user._id, name, email } });
};

export const verifyEmail: RequestHandler = async (
  req: VerifyEmailRequest,
  res
) => {
  const { token, userId } = req.body;
  const verificationToken = await EmailVerificationToken.findOne({
    owner: userId,
  });

  // Check verificattionToken null value
  if (!verificationToken)
    return res.status(403).json({ error: "Invalid token!" });

  const matched = await verificationToken?.compareToken(token);

  if (!matched) return res.status(403).json({ error: "Invalid token!" });

  await User.findByIdAndUpdate(userId, {
    verified: true,
  });

  await EmailVerificationToken.findByIdAndDelete(verificationToken._id);

  res.json({ message: "Your email is verified!" });
};

export const sendReVerificationToken: RequestHandler = async (req, res) => {
  const { userId } = req.body;

  if (!isValidObjectId(userId))
    return res.status(403).json({ error: "Invalid Request!" });

  const user = await User.findById(userId);
  if (!user) return res.status(403).json({ error: "Invalid Request!" });

  await EmailVerificationToken.findOneAndDelete({ owner: userId });

  const token = generateToken();

  await EmailVerificationToken.create({
    owner: userId,
    token,
  });

  sendVerificationMail(token, {
    name: user?.name,
    email: user?.email,
    userId: user?._id.toString(),
  });

  res.json({ message: "Please check your email!" });
};

export const generateForgotPasswordLink: RequestHandler = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: " Account not found!" });

  // Generate The Password Reset Link
  //TODO:---> https://appDomainName.com/reset-password?token=skldjfnlsdkfsdfpowepdfwdelkndslkfnksadfjbskdfbksdfjcksjdfh

  await PasswordResetToken.findOneAndDelete({ owner: user._id });

  const token = crypto.randomBytes(36).toString("hex");

  await PasswordResetToken.create({ owner: user._id, token });

  const resetLink = `${PASSWORD_RESET_LINK}?token=${token}&userId=${user._id}`;

  sendForgotPasswordLink({ email: user.email, link: resetLink });

  res.json({ message: "Check your reggistered email!" });
};

export const isValidPassResetToken: RequestHandler = async (req, res) => {
  const { token, userId } = req.body;

  const resetToken = await PasswordResetToken.findOne({ owner: userId });
  if (!resetToken)
    return res
      .status(403)
      .json({ error: "Unauthorized access || Invalid token!" });

  const matched = await resetToken.compareToken(token);
  if (!matched)
    return res
      .status(403)
      .json({ error: "Unauthorized access || Invalid token!" });

  res.json({ message: "Your token is valid!" });
};
