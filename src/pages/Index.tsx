
import React, { useState } from "react";
import TaskList from "@/components/TaskList";
import TaskInput from "@/components/TaskInput";
import Navbar from "@/components/Navbar";
import { Task, EventCategory, Event } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";

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
  const [addEventOpen, setAddEventOpen] = useState(false);
  const { toast } = useToast();

  const handleAddEvent = () => {
    if (newEvent.trim() && !events.includes(newEvent.trim())) {
      onAddEvent(newEvent.trim());
      setNewEvent("");
      setAddEventOpen(false);
      toast({
        title: "Evento adicionado",
        description: `O evento ${newEvent} foi adicionado com sucesso!`,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddEvent();
    }
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "all" ? true : task.status === filter
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Navbar events={events} />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6 mb-6 transform hover:shadow-2xl transition-all duration-300">
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Longecta Demands
              </h1>
              <p className="text-gray-600">
                Gerencie suas tarefas de forma simples e eficiente
              </p>
            </div>

            <div className="flex justify-between items-center gap-4">
              <TaskInput onAddTask={onAddTask} events={eventsList} />
              
              <Dialog open={addEventOpen} onOpenChange={setAddEventOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Plus className="h-4 w-4" />
                    Novo Evento
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white rounded-2xl shadow-2xl">
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
                      onKeyDown={handleKeyPress}
                      placeholder="Nome do novo evento..."
                      className="shadow-inner"
                    />
                    <Button 
                      onClick={handleAddEvent}
                      className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                    >
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
                  className={`px-6 py-2 rounded-full text-sm transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl ${
                    filter === status
                      ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
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
