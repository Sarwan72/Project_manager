export type Priority = "Low" | "Medium" | "High" | "Urgent";
export type Status = "To Do" | "In Progress" | "Review" | "Completed";

export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  creatorId?: string;
  assignedToId?: string;
}

