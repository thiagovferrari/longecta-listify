
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskList from "@/components/TaskList";
import TaskInput from "@/components/TaskInput";
import Navbar from "@/components/Navbar";
import { Task, EventCategory, Event } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";

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
  
  const currentEvent = eventsList.find(event => event.name === eventCategory);
  const [bannerUrl, setBannerUrl] = useState(currentEvent?.banner || "");
  const [editBannerOpen, setEditBannerOpen] = useState(false);

  if (!currentEvent) {
    return <div>Evento não encontrado</div>;
  }

  const handleUpdateBanner = () => {
    if (bannerUrl.trim()) {
      onUpdateEvent(currentEvent.id, { ...currentEvent, banner: bannerUrl });
      setEditBannerOpen(false);
      toast({
        title: "Banner atualizado",
        description: "O banner do evento foi atualizado com sucesso!",
      });
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
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar events={events} />
      
      <main className="flex-grow">
        <div className="relative">
          <div 
            className="w-full h-[200px] bg-cover bg-center relative"
            style={{ backgroundImage: `url(${currentEvent.banner})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white">
                {eventCategory}
              </h1>
            </div>
          </div>

          <div className="absolute top-4 right-4 space-x-2">
            <Dialog open={editBannerOpen} onOpenChange={setEditBannerOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <Pencil className="h-4 w-4 mr-2" />
                  Editar Banner
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Atualizar Banner do Evento</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    value={bannerUrl}
                    onChange={(e) => setBannerUrl(e.target.value)}
                    placeholder="URL da nova imagem do banner..."
                  />
                  <Button onClick={handleUpdateBanner}>
                    Atualizar Banner
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button 
              variant="destructive"
              onClick={handleDeleteEvent}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir Evento
            </Button>
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

            <TaskInput 
              onAddTask={(title) => onAddTask(title, eventCategory)} 
              defaultCategory={eventCategory} 
            />
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
