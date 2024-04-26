import { RequestHandler } from "express";
import { createUser } from "#/@types/user";
import User from "#/models/user";
import { generateToken } from "#/utils/helper";
import { sendVerificationmail } from "#/utils/mail";

export const create: RequestHandler = async (req: createUser, res) => {
  const { email, password, name } = req.body;

  const user = await User.create({ email, password, name });

  // send verification Email
  const token = generateToken();
  sendVerificationmail(token, { name, email, userId: user._id.toString() });

  res.status(201).json({ user: { id: user._id, name, email } });
};
