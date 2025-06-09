import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer"; // Removed as email verification is removed
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;


export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists" });
    }

    // Debug print (optional, can be removed in production)
    console.log("JWT_SECRET in signup:", process.env.JWT_SECRET);

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user, setting isVerified to true by default
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      isVerified: true, // User is now automatically verified
      // verificationToken: token, // No longer storing verification token
    });
    await newUser.save();
    console.log("User created successfully:", newUser);

    // No email sending for verification

    return res.status(200).json({
      success: true,
      message: "Account created successfully!", // Updated message
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Use JWT_SECRET from environment variables
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Debug prints (optional, can be removed in production)
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    console.log("JWT_SECRET in signup:", JWT_SECRET, "|", typeof JWT_SECRET);
    console.log(
      "process.env.JWT_SECRET in signup:",
      process.env.JWT_SECRET,
      "|",
      typeof process.env.JWT_SECRET
    );
    
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      name: user.name,
      email: user.email,
      avatar: user.avatar || "",
      role: user.role,
      department: user.department || "Administration",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};