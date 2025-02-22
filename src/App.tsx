
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";
import Index from "./pages/Index";
import EventPage from "./pages/EventPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { Task, Event } from "./types/task";
import { fetchTasks, fetchEvents, addTask, updateTask, deleteTask, addEvent, updateEvent, deleteEvent } from "./lib/supabase";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

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
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
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
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/event/:category" 
          element={
            <ProtectedRoute>
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
            </ProtectedRoute>
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
