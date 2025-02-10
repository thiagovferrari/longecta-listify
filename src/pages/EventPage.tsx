
import React from "react";
import { useParams } from "react-router-dom";
import TaskList from "@/components/TaskList";
import TaskInput from "@/components/TaskInput";
import Navbar from "@/components/Navbar";
import { Task, EventCategory } from "@/types/task";

interface EventPageProps {
  tasks: Task[];
  events: EventCategory[];
  onAddTask: (title: string, category: EventCategory) => void;
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskDelete: (taskId: string) => void;
}

const EventPage: React.FC<EventPageProps> = ({ tasks, events, onAddTask, onTaskUpdate, onTaskDelete }) => {
  const { category } = useParams<{ category: string }>();
  const eventCategory = category as EventCategory;

  // URLs dos banners para cada evento
  const eventBanners: Record<string, string> = {
    Civat: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    Bahia: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    Cisp: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    TecnoMKT: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar events={events} />
      
      <main className="flex-grow">
        {/* Banner do Evento */}
        <div 
          className="w-full h-[200px] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${eventBanners[eventCategory] || eventBanners.Civat})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">
              {eventCategory}
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 mb-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-sky-600 mb-2">
                Demandas do {eventCategory}
              </h2>
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
