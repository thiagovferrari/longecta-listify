
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Event } from "@/types/task";

interface TaskInputProps {
  onAddTask: (title: string, category: string) => void;
  defaultCategory?: string;
  events: Event[];
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask, defaultCategory, events = [] }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>(defaultCategory || "");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && category) {
      onAddTask(title.trim(), category);
      setTitle("");
      const eventName = events.find(e => e.id === category)?.name || category;
      toast({
        title: "Tarefa adicionada",
        description: `Nova tarefa criada para o evento ${eventName}!`,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Select 
        value={category} 
        onValueChange={setCategory}
      >
        <SelectTrigger className="w-[180px] bg-white shadow-inner">
          <SelectValue placeholder="Selecione o evento" />
        </SelectTrigger>
        <SelectContent className="z-50">
          {events.map((event) => (
            <SelectItem key={event.id} value={event.id}>
              {event.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Adicionar nova tarefa..."
        className="flex-1 bg-white shadow-inner"
      />
      <Button 
        type="submit" 
        disabled={!category || !title.trim()}
        className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default TaskInput;
