
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EventPage from "./pages/EventPage";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import { Task, EventCategory, Event } from "./types/task";

const queryClient = new QueryClient();

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<Event[]>([
    { id: "1", name: "Civat", banner: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81", description: "Civat Event" },
    { id: "2", name: "Bahia", banner: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", description: "Bahia Event" },
    { id: "3", name: "Cisp", banner: "https://images.unsplash.com/photo-1519389950473-47ba0277781c", description: "Cisp Event" },
    { id: "4", name: "TecnoMKT", banner: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81", description: "TecnoMKT Event" }
  ]);

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

  const addEvent = (eventName: string) => {
    if (eventName.trim() && !events.find(e => e.name === eventName.trim())) {
      const newEvent: Event = {
        id: Date.now().toString(),
        name: eventName.trim(),
        description: `${eventName.trim()} Event`,
        banner: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81" // Default banner
      };
      setEvents([...events, newEvent]);
    }
  };

  const updateEvent = (eventId: string, updates: Partial<Event>) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, ...updates } : event
    ));
  };

  const deleteEvent = (eventId: string) => {
    // Delete all tasks associated with this event first
    const event = events.find(e => e.id === eventId);
    if (event) {
      setTasks(tasks.filter(task => task.category !== event.name));
    }
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            <Route 
              path="/" 
              element={
                <Index 
                  tasks={tasks}
                  events={events.map(e => e.name)}
                  onAddTask={addTask}
                  onTaskUpdate={updateTask}
                  onTaskDelete={deleteTask}
                  onAddEvent={addEvent}
                  onUpdateEvent={updateEvent}
                  onDeleteEvent={deleteEvent}
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
                  onAddTask={addTask}
                  onTaskUpdate={updateTask}
                  onTaskDelete={deleteTask}
                  onUpdateEvent={updateEvent}
                  onDeleteEvent={deleteEvent}
                />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

