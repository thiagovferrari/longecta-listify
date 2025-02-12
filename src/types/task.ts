
export type TaskStatus = "todo" | "progress" | "done";

export type EventCategory = string;

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  category: EventCategory;
  created_at?: string;
  description?: string;
}

export interface Event {
  id: string;
  name: string;
  banner?: string;
  description: string;
  date: string;
  created_at?: string;
}
