import { Request } from "express";

export interface createUser extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}
