
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Event } from "@/types/task";
import { Link } from "react-router-dom";
import { Home, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";

interface AppSidebarProps {
  events: Event[];
  onAddEvent: (name: string) => void;
}

export function AppSidebar({ events, onAddEvent }: AppSidebarProps) {
  const [newEvent, setNewEvent] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddEvent = () => {
    if (newEvent.trim()) {
      onAddEvent(newEvent.trim());
      setNewEvent("");
      setIsDialogOpen(false);
    }
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <span className="text-lg font-semibold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              Longecta Demands
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-sky-600 transition-colors">
                    <Home className="h-4 w-4" />
                    <span>Início</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {events.map((event) => (
                <SidebarMenuItem key={event.id}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={`/event/${event.id}`}
                      className="text-gray-700 hover:text-sky-600 transition-colors"
                    >
                      {event.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full flex items-center gap-2 text-sky-600 hover:text-sky-700 hover:bg-sky-50"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Novo Evento
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Evento</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      value={newEvent}
                      onChange={(e) => setNewEvent(e.target.value)}
                      placeholder="Nome do novo evento..."
                      className="w-full"
                    />
                    <Button 
                      onClick={handleAddEvent}
                      className="w-full bg-gradient-to-r from-sky-500 to-blue-600"
                    >
                      Adicionar
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
