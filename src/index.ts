import express from "express";
import "dotenv/config"; //Should be upper than db
import "./db"; //Should be below than "dotenv/config"

const app = express();

const PORT = process.env.PORT || 8989;
app.listen(PORT, () => {
  console.log("Listening Port: ", PORT);
});
