
import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskList from "@/components/TaskList";
import TaskInput from "@/components/TaskInput";
import Navbar from "@/components/Navbar";
import { Task, EventCategory, Event } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, Trash2, Upload } from "lucide-react";
import { uploadEventBanner } from "@/lib/supabase";

interface EventPageProps {
  tasks: Task[];
  events: EventCategory[];
  eventsList: Event[];
  onAddTask: (title: string, category: EventCategory) => void;
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskDelete: (taskId: string) => void;
  onUpdateEvent: (eventId: string, updates: Partial<Event>) => void;
  onDeleteEvent: (eventId: string) => void;
}

const EventPage: React.FC<EventPageProps> = ({ 
  tasks, 
  events, 
  eventsList,
  onAddTask, 
  onTaskUpdate, 
  onTaskDelete,
  onUpdateEvent,
  onDeleteEvent
}) => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const eventCategory = category as EventCategory;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const currentEvent = eventsList.find(event => event.name === eventCategory);
  const [bannerUrl, setBannerUrl] = useState(currentEvent?.banner || "");
  const [editBannerOpen, setEditBannerOpen] = useState(false);

  if (!currentEvent) {
    return <div>Evento não encontrado</div>;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const publicUrl = await uploadEventBanner(file);
        await onUpdateEvent(currentEvent.id, { ...currentEvent, banner: publicUrl });
        setBannerUrl(publicUrl);
        setEditBannerOpen(false);
        toast({
          title: "Banner atualizado",
          description: "O banner do evento foi atualizado com sucesso!",
        });
      } catch (error) {
        toast({
          title: "Erro ao atualizar banner",
          description: "Ocorreu um erro ao fazer upload da imagem.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteEvent = () => {
    onDeleteEvent(currentEvent.id);
    toast({
      title: "Evento excluído",
      description: "O evento foi excluído com sucesso!",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Navbar events={events} />
      
      <main className="flex-grow">
        <div className="relative">
          <div 
            className="w-full h-[300px] bg-cover bg-center relative overflow-hidden rounded-b-3xl shadow-2xl"
            style={{ 
              backgroundImage: `url(${currentEvent.banner || 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81'})`,
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 backdrop-blur-sm flex items-center justify-center">
              <h1 className="text-5xl font-bold text-white text-center drop-shadow-lg">
                {eventCategory}
              </h1>
            </div>
          </div>

          <div className="absolute top-4 right-4 space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            
            <Button 
              variant="secondary"
              className="bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Alterar Banner
            </Button>

            <Button 
              variant="destructive"
              className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              onClick={handleDeleteEvent}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir Evento
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6 mb-6 transform hover:shadow-2xl transition-all duration-300">
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Demandas do {eventCategory}
              </h2>
              <p className="text-gray-600 mb-4">
                Gerencie as demandas específicas deste evento
              </p>
            </div>

            <TaskInput 
              onAddTask={(title) => onAddTask(title, currentEvent.id)} 
              defaultCategory={currentEvent.id}
              events={eventsList}
            />
          </div>

          <TaskList 
            tasks={tasks} 
            onTaskUpdate={onTaskUpdate} 
            onTaskDelete={onTaskDelete}
            category={currentEvent.id}
            events={eventsList}
          />
        </div>
      </main>
    </div>
  );
};

export default EventPage;
