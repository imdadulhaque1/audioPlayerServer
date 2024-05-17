import mongoose from "mongoose";
import { MONGO_URI } from "../utils/variables";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("DB is successfuly connected!");
  })
  .catch((err) => {
    console.log("DB connection failed!", err);
  });
