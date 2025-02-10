
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EventCategory } from "@/types/task";

interface TaskInputProps {
  onAddTask: (title: string, category: EventCategory) => void;
  defaultCategory?: EventCategory;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask, defaultCategory }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<EventCategory>(defaultCategory || "Civat");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim(), category);
      setTitle("");
      toast({
        title: "Tarefa adicionada",
        description: `Nova tarefa criada para o evento ${category}!`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      {!defaultCategory && (
        <Select value={category} onValueChange={(value) => setCategory(value as EventCategory)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o evento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Civat">Civat</SelectItem>
            <SelectItem value="Bahia">Bahia</SelectItem>
            <SelectItem value="Cisp">Cisp</SelectItem>
            <SelectItem value="TecnoMKT">TecnoMKT</SelectItem>
          </SelectContent>
        </Select>
      )}
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Adicionar nova tarefa..."
        className="flex-1"
      />
      <Button type="submit" className="bg-sky-500 hover:bg-sky-600">
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default TaskInput;
