
export type TaskStatus = "todo" | "progress" | "done";

// Alterando para string para permitir eventos dinâmicos
export type EventCategory = string;

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  category: EventCategory;
}

export interface Event {
  id: string;
  name: EventCategory;
  banner?: string;
  description: string;
}
