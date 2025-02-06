import React from "react";
import { Task } from "@/types/task";
import { CheckCircle, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onStatusChange: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange }) => {
  const getStatusIcon = () => {
    switch (task.status) {
      case "done":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "progress":
        return <Clock className="h-6 w-6 text-blue-500" />;
      default:
        return <Circle className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (task.status) {
      case "done":
        return "bg-longecta-done";
      case "progress":
        return "bg-longecta-progress";
      default:
        return "bg-longecta-todo";
    }
  };

  return (
    <div
      className={cn(
        "animate-task-appear p-4 rounded-lg shadow-sm flex items-center gap-4 transition-all duration-200 hover:shadow-md cursor-pointer",
        getStatusColor()
      )}
      onClick={onStatusChange}
    >
      {getStatusIcon()}
      <span className={cn(
        "flex-1 text-gray-700",
        task.status === "done" && "line-through"
      )}>
        {task.title}
      </span>
    </div>
  );
};

export default TaskItem;