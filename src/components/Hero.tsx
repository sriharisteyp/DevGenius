import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

interface HeroProps {
  onExploreClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="mb-8 animate-float pt-[75px]">
          <Badge variant="secondary" className="glass-effect px-4 py-2 text-sm font-medium">
            🚀 Now in Beta - Join Early Access
          </Badge>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="gradient-text">DevGenius AI</span>
          <br />
          <span className="text-white">Your Intelligent </span>
          <span className="text-white"> Co-Pilot for</span>
          <br />
          <span className="gradient-text">Smarter Development</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Leverage AI to write better code, debug faster, and learn continuously. 
          Transform your development workflow with intelligent automation.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link to="/ai-tools">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl glow-effect animate-pulse-glow group"
            >
              Start Building with AI
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="glass-effect border-gray-600 hover:border-green-500 text-white px-8 py-4 text-lg font-semibold rounded-xl"
            onClick={onExploreClick}
          >
            Explore AI Tools
          </Button>
        </div>

        {/* Feature Preview */}
        <div className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Code Generation</h3>
              <p className="text-gray-400">Generate boilerplate, functions, and snippets instantly</p>
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🐛</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Bug Detection</h3>
              <p className="text-gray-400">Identify and fix issues before they become problems</p>
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Smart Learning</h3>
              <p className="text-gray-400">Personalized learning paths and code explanations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
