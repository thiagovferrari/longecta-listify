import React from "react";
import { Task } from "@/types/task";
import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onStatusChange: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange }) => {
  const getStatusIcon = () => {
    return task.status === "done" ? (
      <CheckCircle className="h-6 w-6 text-sky-500" />
    ) : (
      <Circle className="h-6 w-6 text-gray-400" />
    );
  };

  const getStatusColor = () => {
    return task.status === "done" ? "bg-sky-100" : "bg-blue-50";
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
      <span
        className={cn(
          "flex-1 text-gray-700",
          task.status === "done" && "line-through"
        )}
      >
        {task.title}
      </span>
    </div>
  );
};

export default TaskItem;