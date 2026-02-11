import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  address: String,
  phoneNumber: String,
  hobbies: {
    type: [String],
    default: [],
  },
});

const UserModel =
  mongoose.models.usertbl || mongoose.model("usertbl", userSchema);

export default UserModel;
