import React from "react";
import { Task, EventCategory } from "@/types/task";
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

  const categories: EventCategory[] = ["Civat", "Bahia", "Cisp", "TecnoMKT"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <div key={category} className="bg-white rounded-lg p-4 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-sky-600">{category}</h2>
          <div className="space-y-4">
            {tasks
              .filter((task) => task.category === category)
              .map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onStatusChange={() => handleStatusChange(task)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;