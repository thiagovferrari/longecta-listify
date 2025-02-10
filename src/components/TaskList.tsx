
import React from "react";
import { Task, EventCategory } from "@/types/task";
import TaskItem from "./TaskItem";
import { useToast } from "@/components/ui/use-toast";

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categoriesToShow.map((cat) => (
        <div key={cat} className="bg-white rounded-lg p-4 shadow-lg">
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
  );
};

export default TaskList;
