import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  title: z.string().max(100),
  description: z.string(),
  dueDate: z.string(),
  priority: z.enum(["Low", "Medium", "High", "Urgent"]),
});

type FormData = z.infer<typeof schema>;

const TaskForm = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 rounded shadow space-y-3"
    >
      <input {...register("title")} placeholder="Title" className="input" />
      <textarea
        {...register("description")}
        placeholder="Description"
        className="input"
      />
      <input type="date" {...register("dueDate")} className="input" />
      <select {...register("priority")} className="input">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Urgent</option>
      </select>
      <button className="btn-primary w-full">Create Task</button>
    </form>
  );
};

export default TaskForm;
