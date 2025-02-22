
import React, { useState } from "react";
import { Task } from "@/types/task";
import { CheckCircle, Circle, Trash2, Pencil, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format, isToday, isTomorrow } from "date-fns";

interface TaskItemProps {
  task: Task;
  onStatusChange: () => void;
  onDelete: () => void;
  onEdit: (updates: Partial<Task>) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange, onDelete, onEdit }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || "");
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate || "");

  const handleEdit = () => {
    onEdit({
      title: editedTitle,
      description: editedDescription,
      dueDate: editedDueDate
    });
    setIsDialogOpen(false);
  };

  const getStatusIcon = () => {
    return task.status === "done" ? (
      <CheckCircle className="h-6 w-6 text-sky-500" />
    ) : (
      <Circle className="h-6 w-6 text-gray-400" />
    );
  };

  const getStatusColor = () => {
    return task.status === "done" ? "bg-sky-100" : "bg-white";
  };

  const getDueDateColor = () => {
    if (!task.dueDate) return "";
    const date = new Date(task.dueDate);
    if (isToday(date)) return "bg-red-500";
    if (isTomorrow(date)) return "bg-yellow-400";
    return "bg-green-500";
  };

  const formatDate = (date: string) => {
    return format(new Date(date), "dd/MM/yyyy");
  };

  return (
    <div
      className={cn(
        "animate-task-appear rounded-lg shadow-lg flex flex-col gap-2 transition-all duration-200 hover:shadow-xl transform hover:-translate-y-0.5 overflow-hidden",
        getStatusColor()
      )}
    >
      {task.dueDate && (
        <div className={cn("h-1 w-full", getDueDateColor())} />
      )}
      
      <div className="p-4 space-y-2">
        <div className="flex items-start gap-4">
          <div className="cursor-pointer mt-1" onClick={onStatusChange}>
            {getStatusIcon()}
          </div>
          
          <div className="flex-1">
            <span
              className={cn(
                "block text-gray-700 font-medium",
                task.status === "done" && "line-through"
              )}
            >
              {task.title}
            </span>
            
            {task.description && (
              <p className="text-sm text-gray-500 mt-1">
                {task.description}
              </p>
            )}
            
            {task.dueDate && (
              <p className="text-xs text-gray-400 mt-1">
                Entrega: {formatDate(task.dueDate)}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-sky-100 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Pencil className="h-4 w-4 text-sky-600" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Editar Tarefa</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Título</label>
                    <Input
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="flex-1"
                      placeholder="Título da tarefa"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Descrição</label>
                    <Input
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="flex-1"
                      placeholder="Descrição da tarefa"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Data de Entrega</label>
                    <Input
                      type="date"
                      value={editedDueDate}
                      onChange={(e) => setEditedDueDate(e.target.value)}
                      className="flex-1"
                    />
                  </div>

                  <Button
                    onClick={handleEdit}
                    className="bg-sky-500 hover:bg-sky-600 text-white flex items-center gap-2 w-full"
                  >
                    <Save className="h-4 w-4" />
                    Salvar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              className="hover:bg-red-100 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
