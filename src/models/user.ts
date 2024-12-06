import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IUser {
  name: string;
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
