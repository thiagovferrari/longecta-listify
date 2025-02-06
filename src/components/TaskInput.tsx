import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TaskInputProps {
  onAddTask: (title: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim());
      setTitle("");
      toast({
        title: "Tarefa adicionada",
        description: "Nova tarefa criada com sucesso!",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Adicionar nova tarefa..."
        className="flex-1"
      />
      <Button type="submit" className="bg-longecta-primary hover:bg-longecta-secondary">
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default TaskInput;