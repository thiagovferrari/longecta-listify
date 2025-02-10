
import React, { useState } from "react";
import { Task } from "@/types/task";
import { CheckCircle, Circle, Trash2, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TaskItemProps {
  task: Task;
  onStatusChange: () => void;
  onDelete: () => void;
  onEdit: (newTitle: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(editedTitle);
    }
    setIsEditing(!isEditing);
  };

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
        "animate-task-appear p-4 rounded-lg shadow-sm flex items-center gap-4 transition-all duration-200 hover:shadow-md",
        getStatusColor()
      )}
    >
      <div className="cursor-pointer" onClick={onStatusChange}>
        {getStatusIcon()}
      </div>
      
      {isEditing ? (
        <Input
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="flex-1"
          autoFocus
        />
      ) : (
        <span
          className={cn(
            "flex-1 text-gray-700",
            task.status === "done" && "line-through"
          )}
        >
          {task.title}
        </span>
      )}

      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleEdit}
          className="hover:bg-sky-100"
        >
          <Pencil className="h-4 w-4 text-sky-600" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="hover:bg-red-100"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
