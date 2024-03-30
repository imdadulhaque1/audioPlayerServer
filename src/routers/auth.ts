// import { createUser } from "#/@types/user";
// import { validate } from "#/middleware/validator";
// import User from "#/models/user";
// import { createUserSchema } from "#/utils/validationSchema";
import { create } from "#/controllers/user";
import { validate } from "#/middleware/validator";
import { createUserSchema } from "#/utils/validationSchema";
import { Router } from "express";
const router = Router();

// router.post(
//   "/create",
//   validate(createUserSchema),
//   async (req: createUser, res) => {
//     const { email, password, name } = req.body;

//     createUserSchema.validate({ email, password, name }).catch((error) => {});

//     const newUser = await User.create({ name, email, password });
//     res.json({ newUser });
//   }
// );

router.post("/create", validate(createUserSchema), create);

export default router;
