import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IUser {
  name: string;
  email: string;
  password: string;
  tokens: string[];
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: {
    type: [String],
  },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
