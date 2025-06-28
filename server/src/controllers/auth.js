import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../data/index.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check password strength
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const existingUser = await db.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new user with initial credits and lastCreditReset timestamp
    const newUser = await db.createUser({
      username,
      email,
      password: hashedPassword,
      credits: 15, // Assign initial credits
      lastCreditReset: new Date().toISOString(), // Set initial reset timestamp
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        credits: newUser.credits, // Include credits in the response
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(error.status || 500).json({
      message: error.message || "Registration failed",
      error: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await db.findUserByEmail(email);
    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        credits: user.credits, // Include credits in the response
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
