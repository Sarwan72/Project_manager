import { useState } from "react";
import type { Task, Status } from "../types/task";

interface Props {
  task: Task;
  onStatusChange: (status: Status) => void;
  onDelete: () => void;
  onUpdate: (data: Partial<Task>) => void;
}

const statusColors: Record<Status, string> = {
  "To Do": "bg-gray-600",
  "In Progress": "bg-blue-600",
  "Review": "bg-yellow-600",
  "Completed": "bg-green-600",
};

const priorityColors: Record<string, string> = {
  Low: "text-green-400",
  Medium: "text-yellow-400",
  High: "text-orange-400",
  Urgent: "text-red-500",
};

const TaskItem = ({
  task,
  onStatusChange,
  onDelete,
  onUpdate,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const isOverdue =
    new Date(task.dueDate) < new Date() &&
    task.status !== "Completed";

  const handleSave = () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    onUpdate({
      title: title.trim(),
      description: description.trim(),
    });

    setIsEditing(false);
  };

  return (
    <div
      className={`rounded-lg p-4 bg-gray-800 border shadow ${
        isOverdue ? "border-red-500" : "border-gray-700"
      }`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          {isEditing ? (
            <>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-700 text-white px-2 py-1 rounded mb-2"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-700 text-white px-2 py-1 rounded"
              />
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-white">
                {task.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                {task.description || "No description"}
              </p>
            </>
          )}
        </div>

        <span
          className={`px-3 py-1 rounded text-xs font-semibold text-white ${statusColors[task.status]}`}
        >
          {task.status}
        </span>
      </div>

      {/* META */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-sm text-gray-300">
        <div>
          <p className="text-gray-400">Due Date</p>
          <p>{new Date(task.dueDate).toLocaleDateString()}</p>
        </div>

        <div>
          <p className="text-gray-400">Priority</p>
          <p className={priorityColors[task.priority]}>
            {task.priority}
          </p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-between items-center mt-4">
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(e.target.value as Status)
          }
          className="bg-gray-700 text-white px-3 py-1 rounded"
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Review</option>
          <option>Completed</option>
        </select>

        <div className="flex gap-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="text-green-400 hover:text-green-300 text-sm"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-yellow-400 hover:text-yellow-300 text-sm"
            >
              Edit
            </button>
          )}

          <button
            onClick={onDelete}
            className="text-red-400 hover:text-red-300 text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      {isOverdue && (
        <p className="text-red-400 text-xs mt-2">
          ⚠ Overdue Task
        </p>
      )}
    </div>
  );
};

export default TaskItem;
