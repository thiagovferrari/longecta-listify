
import { Home, Globe, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { EventCategory } from "@/types/task";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [events, setEvents] = useState<EventCategory[]>(["Civat", "Bahia", "Cisp", "TecnoMKT"]);
  const [newEvent, setNewEvent] = useState("");
  const { toast } = useToast();

  const handleAddEvent = () => {
    if (newEvent.trim() && !events.includes(newEvent.trim())) {
      setEvents([...events, newEvent.trim()]);
      setNewEvent("");
      toast({
        title: "Evento adicionado",
        description: `O evento ${newEvent} foi adicionado com sucesso!`,
      });
    }
  };

  return (
    <nav className="bg-sky-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 hover:text-sky-200 transition-colors">
              <Home className="h-5 w-5" />
              <span>Início</span>
            </Link>
            {events.map((event) => (
              <Link
                key={event}
                to={`/event/${event}`}
                className="hover:text-sky-200 transition-colors"
              >
                {event}
              </Link>
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="hover:text-sky-200 transition-colors flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Novo Evento</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Evento</DialogTitle>
                </DialogHeader>
                <div className="flex gap-2">
                  <Input
                    value={newEvent}
                    onChange={(e) => setNewEvent(e.target.value)}
                    placeholder="Nome do novo evento..."
                  />
                  <Button onClick={handleAddEvent}>
                    Adicionar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <a 
              href="https://www.longecta.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-sky-200 transition-colors"
            >
              <Globe className="h-5 w-5" />
              <span>Longecta Site</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
