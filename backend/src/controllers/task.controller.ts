import { Response } from "express";
import Task from "../models/task";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getIO } from "../socket";

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({
      $or: [
        { creatorId: req.userId },
        { assignedToId: req.userId },
      ],
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    //  VALIDATION
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description?.trim() || "",
      priority: priority || "Medium",
      status: status || "To Do",
      dueDate: dueDate || null,
      creatorId: req.userId,
    });

    getIO().emit("task:created", task);
    res.status(201).json(task);
  } catch (error) {
    console.error("CREATE TASK ERROR:", error);
    res.status(500).json({ message: "Task creation failed" });
  }
};



export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status, dueDate } = req.body;

    //  VALIDATION
    if (title !== undefined && !title.trim()) {
      return res.status(400).json({ message: "Title cannot be empty" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, creatorId: req.userId },
      {
        ...(title !== undefined && { title: title.trim() }),
        ...(description !== undefined && {
          description: description.trim(),
        }),
        ...(priority && { priority }),
        ...(status && { status }),
        ...(dueDate && { dueDate }),
      },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    getIO().emit("task:updated", task);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Task update failed" });
  }
};



export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      creatorId: req.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    getIO().emit("task:deleted", req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Task delete failed" });
  }
};
