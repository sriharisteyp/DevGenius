
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900/50 border-t border-gray-800 ">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="logo" style={{ height: '45px'}} />
            </div>
            <p className="text-gray-400 text-sm">
              Empowering developers with AI-driven tools for smarter, faster coding.
            </p>{/* 
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div> */}
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-white font-semibold mb-4">AI Tools</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/ai-tools" className="text-gray-400 hover:text-green-400 transition-colors">Code Generator</Link></li>
              <li><Link to="/ai-tools" className="text-gray-400 hover:text-green-400 transition-colors">Code Refactorer</Link></li>
              <li><Link to="/ai-tools" className="text-gray-400 hover:text-green-400 transition-colors">Bug Detector</Link></li>
              <li><Link to="/ai-tools" className="text-gray-400 hover:text-green-400 transition-colors">Documentation Generator</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/use-cases" className="text-gray-400 hover:text-green-400 transition-colors">Use Cases</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-gray-400 hover:text-green-400 transition-colors">Contact</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-green-400 transition-colors">Pricing</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-green-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-green-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2025 DevGenius AI. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
