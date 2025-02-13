
import React from "react";
import { Task, Event } from "@/types/task";
import TaskItem from "./TaskItem";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="w-full overflow-x-auto">
        <div className="flex gap-6 pb-6 min-w-full">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg p-4 shadow-lg min-w-[300px]">
              <h2 className="text-xl font-bold mb-4 text-sky-600">{event.name}</h2>
              <div className="space-y-4">
                {tasksToShow
                  .filter((task) => task.category === event.id)
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
      </ScrollArea>
    </div>
  );
};

export default TaskList;
