
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EventPage from "./pages/EventPage";
import NotFound from "./pages/NotFound";
import { Task, Event } from "./types/task";
import { fetchTasks, fetchEvents, addTask, updateTask, deleteTask, addEvent, updateEvent, deleteEvent } from "./lib/supabase";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const queryClient = useQueryClient();

  // Queries
  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks
  });

  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents
  });

  // Mutations
  const addTaskMutation = useMutation({
    mutationFn: ({ title, category }: { title: string, category: string }) => 
      addTask(title, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const updateTaskMutation = useMutation({
    mutationFn: (task: Task) => updateTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const addEventMutation = useMutation({
    mutationFn: (eventName: string) => addEvent(eventName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    }
  });

  const updateEventMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string, updates: Partial<Event> }) => 
      updateEvent(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    }
  });

  const deleteEventMutation = useMutation({
    mutationFn: (eventId: string) => deleteEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    }
  });

  return (
    <TooltipProvider>
      <Routes>
        <Route 
          path="/" 
          element={
            <Index 
              tasks={tasks}
              events={events.map(e => e.name)}
              onAddTask={(title, category) => addTaskMutation.mutate({ title, category })}
              onTaskUpdate={(task) => updateTaskMutation.mutate(task)}
              onTaskDelete={(taskId) => deleteTaskMutation.mutate(taskId)}
              onAddEvent={(name) => addEventMutation.mutate(name)}
              onUpdateEvent={(id, updates) => updateEventMutation.mutate({ id, updates })}
              onDeleteEvent={(id) => deleteEventMutation.mutate(id)}
              eventsList={events}
            />
          } 
        />
        <Route 
          path="/event/:category" 
          element={
            <EventPage 
              tasks={tasks}
              events={events.map(e => e.name)}
              eventsList={events}
              onAddTask={(title, category) => addTaskMutation.mutate({ title, category })}
              onTaskUpdate={(task) => updateTaskMutation.mutate(task)}
              onTaskDelete={(taskId) => deleteTaskMutation.mutate(taskId)}
              onUpdateEvent={(id, updates) => updateEventMutation.mutate({ id, updates })}
              onDeleteEvent={(id) => deleteEventMutation.mutate(id)}
            />
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;

