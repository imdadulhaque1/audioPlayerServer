import { compare, hash } from "bcrypt";
import { Model, model, ObjectId, Schema } from "mongoose";

// user Interfaces
interface EmailVerificationTokenDocument {
  owner: ObjectId;
  token: string;
  createdAt: Date;
}

interface Methods {
  compareToken(token: string): Promise<boolean>;
}

const emailVerificationToken = new Schema<
  EmailVerificationTokenDocument,
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
    expires: 3600, // Token expired times
    default: Date.now(),
  },
});

emailVerificationToken.pre("save", async function (next) {
  // ====> Hash the token
  if (this.isModified("token")) {
    this.token = await hash(this.token, 10);
  }
  next();
});

emailVerificationToken.methods.compareToken = async function (token) {
  const result = await compare(token, this.token);
  return result;
};

export default model("EmailVerificationToken", emailVerificationToken) as Model<
  EmailVerificationTokenDocument,
  {},
  Methods
>;
