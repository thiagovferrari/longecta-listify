import React, { useState } from "react";
import TaskList from "@/components/TaskList";
import TaskInput from "@/components/TaskInput";
import { Task, TaskStatus } from "@/types/task";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskStatus | "all">("all");

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      status: "todo",
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "all" ? true : task.status === filter
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-longecta-primary mb-2">
              Longecta Demands
            </h1>
            <p className="text-gray-600">
              Gerencie suas tarefas de forma simples e eficiente
            </p>
          </div>

          <TaskInput onAddTask={addTask} />

          <div className="flex gap-2 justify-center">
            {(["all", "todo", "progress", "done"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  filter === status
                    ? "bg-longecta-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status === "all"
                  ? "Todas"
                  : status === "todo"
                  ? "A fazer"
                  : status === "progress"
                  ? "Em andamento"
                  : "Concluídas"}
              </button>
            ))}
          </div>

          <TaskList tasks={filteredTasks} onTaskUpdate={updateTask} />

          {filteredTasks.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              Nenhuma tarefa encontrada
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;