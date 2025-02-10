
import React, { useState } from "react";
import TaskList from "@/components/TaskList";
import TaskInput from "@/components/TaskInput";
import Navbar from "@/components/Navbar";
import { Task, EventCategory } from "@/types/task";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Task["status"] | "all">("all");

  const addTask = (title: string, category: EventCategory) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      status: "todo",
      category,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "all" ? true : task.status === filter
  );

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 mb-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-sky-600 mb-2">
                Longecta Demands
              </h1>
              <p className="text-gray-600">
                Gerencie suas tarefas de forma simples e eficiente
              </p>
            </div>

            <TaskInput onAddTask={addTask} />

            <div className="flex gap-2 justify-center">
              {(["all", "todo", "done"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    filter === status
                      ? "bg-sky-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {status === "all"
                    ? "Todas"
                    : status === "todo"
                    ? "A fazer"
                    : "Concluídas"}
                </button>
              ))}
            </div>
          </div>

          <TaskList 
            tasks={filteredTasks} 
            onTaskUpdate={updateTask} 
            onTaskDelete={deleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
