
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
  events?: EventCategory[];
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask, defaultCategory, events = [] }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<EventCategory>(defaultCategory || (events[0] || ""));
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && category) {
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
      {!defaultCategory && events.length > 0 && (
        <Select value={category} onValueChange={(value) => setCategory(value as EventCategory)}>
          <SelectTrigger className="w-[180px] bg-white shadow-inner">
            <SelectValue placeholder="Selecione o evento" />
          </SelectTrigger>
          <SelectContent>
            {events.map((event) => (
              <SelectItem key={event} value={event}>
                {event}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Adicionar nova tarefa..."
        className="flex-1 bg-white shadow-inner"
      />
      <Button 
        type="submit" 
        className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default TaskInput;
