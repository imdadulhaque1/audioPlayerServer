import { create, verifyEmail } from "#/controllers/user";
import { validate } from "#/middleware/validator";
import { createUserSchema } from "#/utils/validationSchema";
import { Router } from "express";
const router = Router();

router.post("/create", validate(createUserSchema), create);
router.post("/verify-email", verifyEmail);

export default router;
