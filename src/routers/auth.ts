import {
  create,
  generateForgotPasswordLink,
  sendReVerificationToken,
  verifyEmail,
} from "#/controllers/user";
import { validate } from "#/middleware/validator";
import {
  createUserSchema,
  EmailVerificationBody,
} from "#/utils/validationSchema";
import { Router } from "express";
const router = Router();

router.post("/create", validate(createUserSchema), create);
router.post("/verify-email", validate(EmailVerificationBody), verifyEmail);
router.post("/re-verify-email", sendReVerificationToken);
router.post("/forgot-password", generateForgotPasswordLink);

export default router;
