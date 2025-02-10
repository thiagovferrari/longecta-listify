
import React from "react";
import { useParams } from "react-router-dom";
import TaskList from "@/components/TaskList";
import TaskInput from "@/components/TaskInput";
import Navbar from "@/components/Navbar";
import { Task, EventCategory } from "@/types/task";

interface EventPageProps {
  tasks: Task[];
  onAddTask: (title: string, category: EventCategory) => void;
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskDelete: (taskId: string) => void;
}

const EventPage: React.FC<EventPageProps> = ({ tasks, onAddTask, onTaskUpdate, onTaskDelete }) => {
  const { category } = useParams<{ category: string }>();
  const eventCategory = category as EventCategory;

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 mb-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-sky-600 mb-2">
                {eventCategory}
              </h1>
              <p className="text-gray-600 mb-4">
                Gerencie as demandas específicas deste evento
              </p>
            </div>

            <TaskInput onAddTask={(title) => onAddTask(title, eventCategory)} defaultCategory={eventCategory} />
          </div>

          <TaskList 
            tasks={tasks} 
            onTaskUpdate={onTaskUpdate} 
            onTaskDelete={onTaskDelete}
            category={eventCategory}
          />
        </div>
      </main>
    </div>
  );
};

export default EventPage;
