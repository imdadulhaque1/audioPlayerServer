import { compare, hash } from "bcrypt";
import { Model, model, ObjectId, Schema } from "mongoose";

// user Interfaces
interface passwordResetTokenDocument {
  owner: ObjectId;
  token: string;
  createdAt: Date;
}

interface Methods {
  compareToken(token: string): Promise<boolean>;
}

const passwordResetTokenSchema = new Schema<
  passwordResetTokenDocument,
  {},
  Methods
>({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 12 * 3600, // Token will be expired after 1 day
    default: Date.now(),
  },
});

passwordResetTokenSchema.pre("save", async function (next) {
  // ====> Hash the token
  if (this.isModified("token")) {
    this.token = await hash(this.token, 10);
  }
  next();
});

passwordResetTokenSchema.methods.compareToken = async function (token) {
  const result = await compare(token, this.token);
  return result;
};

export default model("PasswordResetToken", passwordResetTokenSchema) as Model<
  passwordResetTokenDocument,
  {},
  Methods
>;
