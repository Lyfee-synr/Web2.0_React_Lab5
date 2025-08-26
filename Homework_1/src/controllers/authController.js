import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
}

// POST /api/auth/register
export async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "username, email, password are required" });

    const user = await User.create({ username, email, password });
    const token = signToken(user);
    res.status(201).json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    // duplicate key
    if (err?.code === 11000) {
      return res.status(409).json({ message: `Duplicate ${Object.keys(err.keyPattern).join(", ")}` });
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
}

// POST /api/auth/login
export async function login(req, res, next) {
  try {
    const { email, username, password } = req.body;
    if (!password || (!email && !username))
      return res.status(400).json({ message: "Provide email/username and password" });

    const query = email ? { email } : { username };
    const user = await User.findOne(query).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/auth/profile (protected)
export async function profile(req, res) {
  res.json({ id: req.user.id, username: req.user.username, email: req.user.email });
}
