import { Home, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-sky-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 hover:text-sky-200 transition-colors">
              <Home className="h-5 w-5" />
              <span>Início</span>
            </Link>
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