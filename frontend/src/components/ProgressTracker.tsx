import type { Task } from "../types/task";

interface Props {
  tasks: Task[];
}

const ProgressTracker = ({ tasks }: Props) => {
  const total = tasks.length;
  const completed = tasks.filter(
    (t) => t.status === "Completed"
  ).length;

  const pending = total - completed;

  const overdue = tasks.filter(
    (t) =>
      new Date(t.dueDate) < new Date() &&
      t.status !== "Completed"
  ).length;

  const percentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold text-white">
        📊 Progress Tracker
      </h2>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-gray-400 text-sm">Total</p>
          <p className="text-white text-xl font-bold">{total}</p>
        </div>

        <div className="bg-gray-800 p-4 rounded">
          <p className="text-gray-400 text-sm">Completed</p>
          <p className="text-green-400 text-xl font-bold">
            {completed}
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded">
          <p className="text-gray-400 text-sm">Pending</p>
          <p className="text-yellow-400 text-xl font-bold">
            {pending}
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded">
          <p className="text-gray-400 text-sm">Overdue</p>
          <p className="text-red-400 text-xl font-bold">
            {overdue}
          </p>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div>
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Completion</span>
          <span>{percentage}%</span>
        </div>

        <div className="w-full bg-gray-700 h-3 rounded">
          <div
            className="bg-green-500 h-3 rounded transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
