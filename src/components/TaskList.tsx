
import React from "react";
import { Task, EventCategory } from "@/types/task";
import TaskItem from "./TaskItem";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskDelete: (taskId: string) => void;
  category?: EventCategory;
  events?: EventCategory[];
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onTaskUpdate, 
  onTaskDelete, 
  category,
  events = ["Civat", "Bahia", "Cisp", "TecnoMKT"]
}) => {
  const { toast } = useToast();

  const handleStatusChange = (task: Task) => {
    const newStatus: Task["status"] = task.status === "done" ? "todo" : "done";
    
    const updatedTask = { ...task, status: newStatus };
    onTaskUpdate(updatedTask);
    
    toast({
      title: "Status atualizado",
      description: `Tarefa "${task.title}" ${newStatus === "done" ? "concluída" : "movida para a fazer"}`,
    });
  };

  const handleEdit = (task: Task, newTitle: string) => {
    const updatedTask = { ...task, title: newTitle };
    onTaskUpdate(updatedTask);
    
    toast({
      title: "Tarefa atualizada",
      description: "O título da tarefa foi atualizado com sucesso",
    });
  };

  const handleDelete = (task: Task) => {
    onTaskDelete(task.id);
    
    toast({
      title: "Tarefa excluída",
      description: `A tarefa "${task.title}" foi excluída com sucesso`,
    });
  };

  const tasksToShow = category ? tasks.filter((task) => task.category === category) : tasks;
  const categoriesToShow = category ? [category] : events;

  const handleWheel = (e: React.WheelEvent) => {
    const container = e.currentTarget;
    container.scrollLeft += e.deltaY;
    e.preventDefault();
  };

  return (
    <div className="flex flex-col h-full">
      <div 
        className="overflow-x-auto pb-6" 
        onWheel={handleWheel}
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="flex space-x-6 min-w-full">
          {categoriesToShow.map((cat) => (
            <div key={cat} className="bg-white rounded-lg p-4 shadow-lg min-w-[300px]">
              <h2 className="text-xl font-bold mb-4 text-sky-600">{cat}</h2>
              <div className="space-y-4">
                {tasksToShow
                  .filter((task) => task.category === cat)
                  .map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onStatusChange={() => handleStatusChange(task)}
                      onDelete={() => handleDelete(task)}
                      onEdit={(newTitle) => handleEdit(task, newTitle)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ScrollArea className="w-full mt-2">
        <div className="flex space-x-6">
          {categoriesToShow.map((cat) => (
            <div key={cat} className="min-w-[300px]" />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-3" />
      </ScrollArea>
    </div>
  );
};

export default TaskList;
