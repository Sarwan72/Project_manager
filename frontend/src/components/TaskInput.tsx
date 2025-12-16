import { useState } from "react";
import type { Task, Priority,category } from "../types/task";
import { nanoid } from "nanoid";

interface Props {
  addTask: (task: Task) => void;
}

const TaskInput = ({ onSubmit }: Props) => {
  const [task, setTask]= useState("");
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  // const [category, setCategory] = useState<Category>("General");
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
  dueDate: new Date(),      
  priority,
  status: "To Do",           
    });

    setText("");
    setPriority("Medium");
    // setCategory("General");
  };

  return (
    <div className="flex items-center gap-3 bg-gray-800 p-4 rounded-full shadow-md">
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter your task"
        className="flex-1 bg-transparent text-white outline-none px-4"
      />
      <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Task description"
  className="flex-1 bg-transparent text-white outline-none items-center pt-4.5 px-4"
/>


      <button
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

      {/* <select
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
        className="rounded-md px-3 py-2"
      >
        <option>General</option>
        <option>Work</option>
        <option>Personal</option>
      </select> */}
    </div>
  );
};

export default TaskInput;
