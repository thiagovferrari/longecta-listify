import React from "react";
import { Task } from "@/types/task";
import TaskItem from "./TaskItem";
import { useToast } from "@/components/ui/use-toast";

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (updatedTask: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskUpdate }) => {
  const { toast } = useToast();

  const handleStatusChange = (task: Task) => {
    const newStatus = task.status === "done" ? "todo" : 
                     task.status === "progress" ? "done" : "progress";
    
    const updatedTask = { ...task, status: newStatus };
    onTaskUpdate(updatedTask);
    
    toast({
      title: "Status atualizado",
      description: `Tarefa "${task.title}" movida para ${newStatus === "done" ? "concluídas" : 
                                                        newStatus === "progress" ? "em andamento" : "a fazer"}`,
    });
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={() => handleStatusChange(task)}
        />
      ))}
    </div>
  );
};

export default TaskList;