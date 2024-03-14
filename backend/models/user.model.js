import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  avatar: {
    public_url: String,
    url: String,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, " Email  is already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
