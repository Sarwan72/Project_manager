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
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
     console.log("USER ID:", req.userId);
    console.log("BODY:", req.body);
    const task = await Task.create({
      ...req.body,
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
  const { id } = req.params;

  const task = await Task.findOneAndUpdate(
    { _id: id, creatorId: req.userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};


export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    getIO().emit("task:deleted", req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Task delete failed" });
  }
};
