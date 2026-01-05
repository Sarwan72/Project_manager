import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Header from "../components/Header";
import TaskInput from "../components/TaskInput";
import TaskItem from "../components/TaskItem";
import ProgressTracker from "../components/ProgressTracker";

import type { Task, Status } from "../types/task";
import { socket } from "../socket";

import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/task.api";

const Home = () => {
  const queryClient = useQueryClient();



 const { data: tasks = [], isLoading } = useQuery<Task[]>({
  queryKey: ["tasks"],
  queryFn: fetchTasks,
});

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  useEffect(() => {
    socket.on("task:created", () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    socket.on("task:updated", () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    socket.on("task:deleted", () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    return () => {
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("task:deleted");
    };
  }, [queryClient]);
const orderedTasks = [...tasks].reverse();
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="max-w-6xl mx-auto p-6 space-y-6">
       
        <TaskInput onSubmit={(data) => createMutation.mutate(data)} />

        {/* TASK LIST */}
        <div className="space-y-4">
          {isLoading && (
            <p className="text-gray-400 text-center">Loading tasks...</p>
          )}

          {!isLoading && tasks.length === 0 && (
            <p className="text-gray-500 text-center">
              No tasks found. Create your first task 
            </p>
          )}

         {orderedTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onStatusChange={(status: Status) =>
                updateMutation.mutate({
                  id: task._id,
                  data: { status },
                })
              }
              onUpdate={(data) =>
                updateMutation.mutate({
                  id: task._id,
                  data,
                })
              }
              onDelete={() => deleteMutation.mutate(task._id)}
            />
          ))}
        </div>

     
        <ProgressTracker tasks={tasks} />
      </main>
    </div>
  );
};

export default Home;




