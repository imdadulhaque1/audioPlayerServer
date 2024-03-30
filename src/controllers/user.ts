import { RequestHandler } from "express";
import nodemailer from "nodemailer";

import { createUser } from "#/@types/user";
import EmailVerificationToken from "#/models/emailVerificationToken";
import User from "#/models/user";
import { generateToken } from "#/utils/helper";
import { MAILTRAP_PASS, MAILTRAP_USER } from "#/utils/variables";

export const create: RequestHandler = async (req: createUser, res) => {
  const { email, password, name } = req.body;

  const user = await User.create({ email, password, name });

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASS,
    },
  });

  const token = generateToken();
  await EmailVerificationToken.create({
    owner: user._id,
    token,
  });

  console.log("Token: ", token);

  transport.sendMail({
    to: user.email,
    from: "imdadulhaque1440@gmail.com",
    html: `Your verification token is: ${token}`,
  });

  res.status(201).json({ user });
};
