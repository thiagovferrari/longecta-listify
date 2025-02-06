export type TaskStatus = "todo" | "progress" | "done";

export type EventCategory = "Civat" | "Bahia" | "Cisp" | "TecnoMKT";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  category: EventCategory;
}