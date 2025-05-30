import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";
const JWT_SECRET = process.env.JWT_SECRET;
const BASE_URL = "http://localhost:5000";
const transporter = nodemailer.createTransport({
  service: "Gmail", // or "Outlook", etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
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

    // Create verification token
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1d" });

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user with verification token
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      verificationToken: token,
    });
    await newUser.save();

    // Send verification email
    const verificationLink = `${BASE_URL}/api/auth/verify/${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your Email",
      html: `<p>Click the link to verify your account: <a href="${verificationLink}">${verificationLink}</a></p>`,
    });

    return res.status(200).json({
      success: true,
      message:
        "Account created successfully, check your email to verify your account",
    });
  } catch (error) {
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
    // if (!user.isVerified)
    //   return res
    //     .status(401)
    //     .json({ message: "Please verify your email first." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
