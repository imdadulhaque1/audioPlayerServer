import { createUser } from "#/@types/user";
import User from "#/models/user";
import { MAILTRAP_PASS, MAILTRAP_USER } from "#/utils/variables";
import { RequestHandler } from "express";
import nodemailer from "nodemailer";

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

  transport.sendMail({
    to: user.email,
    from: "imdadulhaque1440@gmail.com",
    html: "<h1>123456</h1>",
  });

  res.status(201).json({ user });
};
