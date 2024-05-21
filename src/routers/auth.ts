import {
  create,
  generateForgotPasswordLink,
  grantValid,
  sendReVerificationToken,
  verifyEmail,
} from "#/controllers/user";
import { isValidPassResetToken } from "#/middleware/auth";
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
  isValidPassResetToken,
  grantValid
);

export default router;
