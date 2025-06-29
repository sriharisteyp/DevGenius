import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); // User state to track login status
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Simulated login state (replace with real authentication logic)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user info from storage
    setUser(null); // Reset user state
    window.location.reload(); // Reload the website after logout
  };

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
        <div className="flex items-center h-16">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="logo" style={{ height: "50px" }} />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-8">
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
            </div>
          </div>

          {/* Auth/User Section - Right */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            {user ? (
              <>
                <span className="text-sm text-white">Welcome, {user.username}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="glass-effect border-gray-600 hover:border-green-500 text-white"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" state={{ isLogin: true }}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass-effect border-gray-600 hover:border-green-500 text-white"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" state={{ isLogin: false }}>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white ml-auto"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
{isOpen && (
  <div
    className="md:hidden py-4 space-y-2 bg-[#232C3D] bg-opacity-100"
     // Optional: adds a blur effect
  >
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
    <div className="px-4 pt-2 space-y-2">
      {user ? (
        <>
          <span className="block text-sm text-white">
            Welcome, {user.username}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="glass-effect border-gray-600 hover:border-green-500 text-white w-full"
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            state={{ isLogin: true }}
            onClick={() => setIsOpen(false)}
          >
            <Button
              variant="outline"
              size="sm"
              className="glass-effect border-gray-600 hover:border-green-500 text-white w-full mb-[10px]"
            >
              Sign In
            </Button>
          </Link>
          <Link
            to="/register"
            state={{ isLogin: false }}
            onClick={() => setIsOpen(false)}
          >
            <Button
              variant="default"
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white w-full"
            >
              Sign Up
            </Button>
          </Link>
        </>
      )}
    </div>
  </div>
)}

      </div>
    </nav>
  );
};

export default Navigation;
