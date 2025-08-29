import express from "express";
import Task from "../models/Task.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const task = await Task.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(task);
});

router.get("/", protect, async (req, res) => {
  const { status, priority, search, page = 1, limit = 5 } = req.query;
  const query = {};

  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (search) query.title = { $regex: search, $options: "i" };

  const tasks = await Task.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .populate("assignee", "name email");

  const total = await Task.countDocuments(query);
  res.json({ tasks, total, page: Number(page), pages: Math.ceil(total / limit) });
});

router.get("/:id", protect, async (req, res) => {
  const task = await Task.findById(req.params.id).populate("assignee", "name email");
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

router.put("/:id", protect, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  Object.assign(task, req.body);
  await task.save();
  res.json(task);
});

router.delete("/:id", protect, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  await task.deleteOne();
  res.json({ message: "Task removed" });
});

export default router;
