
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EventPage from "./pages/EventPage";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import { Task, EventCategory } from "./types/task";

const queryClient = new QueryClient();

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

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

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <Index 
                  tasks={tasks}
                  onAddTask={addTask}
                  onTaskUpdate={updateTask}
                  onTaskDelete={deleteTask}
                />
              } 
            />
            <Route 
              path="/event/:category" 
              element={
                <EventPage 
                  tasks={tasks}
                  onAddTask={addTask}
                  onTaskUpdate={updateTask}
                  onTaskDelete={deleteTask}
                />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
