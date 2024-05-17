import express from "express";
import "dotenv/config"; //Should be upper than db
import "express-async-errors";
import "./db"; //Should be below than "dotenv/config"

import authRouter from "./routers/auth";
import { errorhandler } from "./middleware/error";

const app = express();

// register our middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);

app.use(errorhandler);

const PORT = process.env.PORT || 8989;
app.listen(PORT, () => {
  console.log("Listening Port: ", PORT);
});
