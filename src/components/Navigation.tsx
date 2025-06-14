
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/ai-tools", label: "AI Tools" },
    { path: "/use-cases", label: "Use Cases" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/pricing", label: "Pricing" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-green-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="logo" style={{ height: '50px'}} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-green-400"
                    : "text-gray-300 hover:text-green-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/login">
              <Button variant="outline" size="sm" className="glass-effect border-gray-600 hover:border-green-500 text-white">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-green-400"
                    : "text-gray-300 hover:text-green-400"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Link to="/login">
                <Button variant="outline" size="sm" className="glass-effect border-gray-600 hover:border-green-500 text-white w-full">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
