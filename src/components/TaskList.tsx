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
    const newStatus: Task["status"] = task.status === "done" ? "todo" : "done";
    
    const updatedTask = { ...task, status: newStatus };
    onTaskUpdate(updatedTask);
    
    toast({
      title: "Status atualizado",
      description: `Tarefa "${task.title}" ${newStatus === "done" ? "concluída" : "movida para a fazer"}`,
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