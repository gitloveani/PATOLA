
import { Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-border px-4 md:px-10 py-3 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-4 text-foreground hover:opacity-80 transition-opacity">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 className="text-foreground text-lg font-bold leading-tight tracking-[-0.015em]">J K PATOLA</h2>
      </Link>
      
      <div className="flex flex-1 justify-end gap-4 md:gap-8">
        <nav className="hidden md:flex items-center gap-6 lg:gap-9">
          <Link 
            to="/" 
            className={`text-sm font-medium leading-normal transition-colors hover:text-primary ${
              isActive('/') ? 'text-primary' : 'text-foreground'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/gallery" 
            className={`text-sm font-medium leading-normal transition-colors hover:text-primary ${
              isActive('/gallery') ? 'text-primary' : 'text-foreground'
            }`}
          >
            Gallery
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium leading-normal transition-colors hover:text-primary ${
              isActive('/about') ? 'text-primary' : 'text-foreground'
            }`}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`text-sm font-medium leading-normal transition-colors hover:text-primary ${
              isActive('/contact') ? 'text-primary' : 'text-foreground'
            }`}
          >
            Contact Us
          </Link>
        </nav>
        
        <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-secondary text-foreground gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-accent transition-colors">
          <Search size={20} />
        </button>
      </div>
    </header>
  );
};

export default Navigation;
