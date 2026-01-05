import { useState } from "react";
import type { Task, Priority } from "../types/task";

interface Props {
  onSubmit: (task: Omit<Task, "_id">) => void;
}

const TaskInput = ({ onSubmit }: Props) => {
  const [task, setTask]= useState("");
 
  const [priority, setPriority] = useState<Priority>("Medium");

  const [description, setDescription] = useState("");


 const submit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!task || !task.trim()) {
    alert("Task title is required");
    return;
  }
  onSubmit({
  title: task.trim(),
  description: description.trim(),
  dueDate: new Date().toISOString(),
  priority,
  status: "To Do",
});

   setTask("");
setDescription("");
setPriority("Medium");

  };

  return (
    <div className="flex items-center gap-3 bg-gray-800 p-4 rounded-full shadow-md">
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter Project Name"
        className="flex-1 bg-transparent text-white outline-none px-4"
      />
      <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Task description"
  className="flex-1 bg-transparent text-white outline-none items-center pt-4.5 px-4"
/>


      <button
        type="button"
        onClick={submit}
        className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300"
      >
        Add Task
      </button>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        className="rounded-md px-3 py-2"
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

    </div>
  );
};

export default TaskInput;
