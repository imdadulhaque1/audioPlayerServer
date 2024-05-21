import {
  create,
  generateForgotPasswordLink,
  sendReVerificationToken,
  verifyEmail,
  isValidPassResetToken,
} from "#/controllers/user";
import { validate } from "#/middleware/validator";
import {
  createUserSchema,
  TokenAndIDValidation,
} from "#/utils/validationSchema";
import { Router } from "express";
const router = Router();

router.post("/create", validate(createUserSchema), create);
router.post("/verify-email", validate(TokenAndIDValidation), verifyEmail);
router.post("/re-verify-email", sendReVerificationToken);
router.post("/forgot-password", generateForgotPasswordLink);
router.post(
  "/verify-pass-reset-token",
  validate(TokenAndIDValidation),
  isValidPassResetToken
);

export default router;
