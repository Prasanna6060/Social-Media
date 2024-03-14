import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).json({ message: "User already exists" });
    }
    const newUser = new userModel({
      name,
      email,
      password,
    });
    const savedUser = await newUser.save();
    return res.status(201).json({ success: "true", message: savedUser });
  } catch (error) {
    res.status(500).json({ message: "Interal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return res
        .status(404)
        .json({ success: "false", message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Invalid Password" });
    }
    const jwtToken = jwt.sign(
      { userId: findUser._id, email: findUser.email },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    return res.status(201).json({ success: true, findUser, token: jwtToken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
