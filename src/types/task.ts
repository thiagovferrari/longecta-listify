export type TaskStatus = "todo" | "progress" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}