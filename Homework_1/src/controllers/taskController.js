import { Task } from "../models/Task.js";
import mongoose from "mongoose";

function ensureObjectId(id) {
  if (!mongoose.isValidObjectId(id)) {
    const err = new Error("Invalid task id");
    err.status = 400;
    throw err;
  }
}

// GET /api/tasks
export async function getTasks(req, res, next) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) { next(err); }
}

// GET /api/tasks/:id
export async function getTaskById(req, res, next) {
  try {
    ensureObjectId(req.params.id);
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) { next(err); }
}

// POST /api/tasks
export async function createTask(req, res, next) {
  try {
    const { title, description, completed } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }
    const task = await Task.create({
      title: title.trim(),
      description: description ?? "",
      completed: completed ?? false
    });
    res.status(201).json(task);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
}

// PUT /api/tasks/:id
export async function updateTask(req, res, next) {
  try {
    ensureObjectId(req.params.id);
    const update = {};
    if (typeof req.body.title === "string") update.title = req.body.title.trim();
    if (typeof req.body.description === "string") update.description = req.body.description;
    if (typeof req.body.completed === "boolean") update.completed = req.body.completed;

    const task = await Task.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
}

// DELETE /api/tasks/:id
export async function deleteTask(req, res, next) {
  try {
    ensureObjectId(req.params.id);
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(204).send();
  } catch (err) { next(err); }
}
