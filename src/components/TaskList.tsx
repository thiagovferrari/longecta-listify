
import React, { useEffect, useRef } from "react";
import { Task, Event } from "@/types/task";
import TaskItem from "./TaskItem";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Check, Clock } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskDelete: (taskId: string) => void;
  category?: string;
  events: Event[];
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onTaskUpdate, 
  onTaskDelete, 
  category,
  events = []
}) => {
  const { toast } = useToast();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      // Se a tecla Shift está pressionada, deixa o comportamento padrão (scroll vertical)
      if (e.shiftKey) return;

      // Impede o comportamento padrão do scroll
      e.preventDefault();

      // Scroll horizontal usando o deltaY (mais suave e intuitivo)
      // Multiplica por um fator para tornar o scroll mais suave
      const scrollAmount = e.deltaY * 0.8;
      scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    };

    // Usa { passive: false } para permitir preventDefault
    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleStatusChange = (task: Task) => {
    const newStatus: Task["status"] = task.status === "done" ? "todo" : "done";
    
    const updatedTask = { ...task, status: newStatus };
    onTaskUpdate(updatedTask);
    
    toast({
      title: "Status atualizado",
      description: `Tarefa "${task.title}" ${newStatus === "done" ? "concluída" : "movida para a fazer"}`,
    });
  };

  const handleEdit = (task: Task, updates: Partial<Task>) => {
    const updatedTask = { ...task, ...updates };
    onTaskUpdate(updatedTask);
    
    toast({
      title: "Tarefa atualizada",
      description: "A tarefa foi atualizada com sucesso",
    });
  };

  const handleDelete = (task: Task) => {
    onTaskDelete(task.id);
    
    toast({
      title: "Tarefa excluída",
      description: `A tarefa "${task.title}" foi excluída com sucesso`,
    });
  };

  const displayEvents = category 
    ? events.filter(event => event.id === category)
    : events;

  const getTasksForEvent = (eventId: string) => {
    return tasks.filter(task => task.category === eventId);
  };

  const getEventStatus = (eventId: string) => {
    const eventTasks = getTasksForEvent(eventId);
    if (eventTasks.length === 0) return "todo";
    const allDone = eventTasks.every(task => task.status === "done");
    return allDone ? "done" : "todo";
  };

  if (!events.length) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        Nenhum evento encontrado. Crie um novo evento para começar.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto pb-6 hide-scrollbar"
        style={{ 
          WebkitOverflowScrolling: 'touch',
          background: 'linear-gradient(109.6deg, rgba(223,234,247,0.9) 11.2%, rgba(244,248,252,0.9) 91.1%)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          scrollbarWidth: 'none', // Firefox
        }}
      >
        <div className="flex gap-6 p-4 min-w-max">
          {displayEvents.map((event) => {
            const eventTasks = getTasksForEvent(event.id);
            const eventStatus = getEventStatus(event.id);
            
            return (
              <div 
                key={event.id} 
                className="bg-white/70 backdrop-blur-lg rounded-lg p-4 shadow-lg min-w-[300px] flex-shrink-0 border border-white/20"
                style={{
                  background: 'linear-gradient(to right, rgba(255,255,255,0.7), rgba(255,255,255,0.5))',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-medium text-sky-600">{event.name}</h2>
                  <Badge 
                    variant={eventStatus === "done" ? "default" : "destructive"}
                    className="flex items-center gap-1 bg-sky-500/80 backdrop-blur-sm"
                  >
                    {eventStatus === "done" ? (
                      <><Check className="w-3 h-3" /> Concluído</>
                    ) : (
                      <><Clock className="w-3 h-3" /> A fazer</>
                    )}
                  </Badge>
                </div>
                <div className="space-y-4">
                  {eventTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onStatusChange={() => handleStatusChange(task)}
                      onDelete={() => handleDelete(task)}
                      onEdit={(updates) => handleEdit(task, updates)}
                    />
                  ))}
                  {eventTasks.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      Nenhuma tarefa neste evento
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
