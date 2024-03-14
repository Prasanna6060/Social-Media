import mongoose from "mongoose";
import bcrypt from 'bcrypt'

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

userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      next();
  } catch (error) {
      return next(error);
  }
})

const User = mongoose.model("User", userSchema);

export default User;
