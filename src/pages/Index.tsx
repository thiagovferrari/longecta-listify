
import React, { useState } from "react";
import TaskList from "@/components/TaskList";
import TaskInput from "@/components/TaskInput";
import Navbar from "@/components/Navbar";
import { Task, EventCategory } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";

interface IndexProps {
  tasks: Task[];
  events: EventCategory[];
  onAddTask: (title: string, category: EventCategory) => void;
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskDelete: (taskId: string) => void;
  onAddEvent: (eventName: string) => void;
}

const Index: React.FC<IndexProps> = ({ 
  tasks, 
  events, 
  onAddTask, 
  onTaskUpdate, 
  onTaskDelete,
  onAddEvent 
}) => {
  const [filter, setFilter] = useState<Task["status"] | "all">("all");
  const [newEvent, setNewEvent] = useState("");
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
