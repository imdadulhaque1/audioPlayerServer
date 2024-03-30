import { Model, model, ObjectId, Schema } from "mongoose";

// user Interfaces
interface EmailVerificationTokenDocument {
  owner: ObjectId;
  token: string;
  createdAt: Date;
}

const emailVerificationToken = new Schema<EmailVerificationTokenDocument>({
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
    expires: 3600,
    default: Date.now(),
  },
});

export default model(
  "EmailVerificationToken",
  emailVerificationToken
) as Model<EmailVerificationTokenDocument>;
