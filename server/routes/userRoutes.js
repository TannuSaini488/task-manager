import express from "express";
import User from "../models/User.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

router.patch("/:id/role", protect, adminOnly, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.role = req.body.role || user.role;
  await user.save();
  res.json({ message: "Role updated", user });
});

export default router;
