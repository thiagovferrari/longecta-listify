
import React from "react";
import TaskList from "@/components/TaskList";
import TaskInput from "@/components/TaskInput";
import { Task, EventCategory, Event } from "@/types/task";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface IndexProps {
  tasks: Task[];
  events: EventCategory[];
  eventsList: Event[];
  onAddTask: (title: string, category: EventCategory) => void;
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskDelete: (taskId: string) => void;
  onAddEvent: (eventName: string) => void;
  onUpdateEvent: (eventId: string, updates: Partial<Event>) => void;
  onDeleteEvent: (eventId: string) => void;
}

const Index: React.FC<IndexProps> = ({ 
  tasks, 
  events, 
  eventsList,
  onAddTask, 
  onTaskUpdate, 
  onTaskDelete,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent
}) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-b from-blue-50 to-white">
        <AppSidebar events={eventsList} onAddEvent={onAddEvent} />
        
        <main className="flex-grow p-8">
          <div className="container mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6 mb-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  Gerenciamento de Demandas
                </h1>
                <p className="text-sm text-gray-600">
                  Gerencie suas tarefas de forma simples e eficiente
                </p>
              </div>

              <TaskInput onAddTask={onAddTask} events={eventsList} />
            </div>

            <TaskList 
              tasks={tasks} 
              onTaskUpdate={onTaskUpdate} 
              onTaskDelete={onTaskDelete}
              events={eventsList}
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
