
import React, { useState } from "react";
import TaskList from "@/components/TaskList";
import TaskInput from "@/components/TaskInput";
import Navbar from "@/components/Navbar";
import { Task, EventCategory, Event } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

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
  const [filter, setFilter] = useState<Task["status"] | "all">("all");
  const [newEvent, setNewEvent] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { toast } = useToast();

  const handleAddEvent = () => {
    if (newEvent.trim() && !events.includes(newEvent.trim())) {
      onAddEvent(newEvent.trim());
      setNewEvent("");
      toast({
        title: "Evento adicionado",
        description: `O evento ${newEvent} foi adicionado com sucesso!`,
      });
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    onDeleteEvent(eventId);
    toast({
      title: "Evento excluído",
      description: "O evento foi excluído com sucesso!",
    });
  };

  const handleUpdateEvent = (eventId: string, updates: Partial<Event>) => {
    onUpdateEvent(eventId, updates);
    setSelectedEvent(null);
    toast({
      title: "Evento atualizado",
      description: "O evento foi atualizado com sucesso!",
    });
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "all" ? true : task.status === filter
  );

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar events={events} />
      
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

            <div className="flex justify-between items-center gap-4">
              <TaskInput onAddTask={onAddTask} events={events} />
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Novo Evento
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Evento</DialogTitle>
                    <DialogDescription>
                      Digite o nome do novo evento que deseja adicionar.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-2">
                    <Input
                      value={newEvent}
                      onChange={(e) => setNewEvent(e.target.value)}
                      placeholder="Nome do novo evento..."
                    />
                    <Button onClick={handleAddEvent}>
                      Adicionar
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {eventsList.map((event) => (
                <div key={event.id} className="relative group">
                  <div className="absolute top-2 right-2 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="secondary" size="icon" onClick={() => setSelectedEvent(event)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Evento</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Input
                            defaultValue={event.name}
                            onChange={(e) => {
                              if (selectedEvent) {
                                setSelectedEvent({
                                  ...selectedEvent,
                                  name: e.target.value
                                });
                              }
                            }}
                            placeholder="Nome do evento"
                          />
                          <Input
                            defaultValue={event.banner}
                            onChange={(e) => {
                              if (selectedEvent) {
                                setSelectedEvent({
                                  ...selectedEvent,
                                  banner: e.target.value
                                });
                              }
                            }}
                            placeholder="URL do banner"
                          />
                          <Button 
                            onClick={() => selectedEvent && handleUpdateEvent(selectedEvent.id, selectedEvent)}
                          >
                            Salvar
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <TaskList 
            tasks={filteredTasks} 
            onTaskUpdate={onTaskUpdate} 
            onTaskDelete={onTaskDelete}
            events={events}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;

