import { createUser } from "#/@types/user";
import User from "#/models/user";
import { Router } from "express";
const router = Router();

router.post("/create", async (req: createUser, res) => {
  const { email, password, name } = req.body;

  const newUser = await User.create({ name, email, password });
  res.json({ newUser });
});

export default router;
