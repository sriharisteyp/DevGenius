
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AIToolsShowcase = () => {
  const [activeDemo, setActiveDemo] = useState("codeGen");

  const tools = [
    {
      id: "codeGen",
      name: "Code Generator",
      description: "Generate code from natural language",
      example: "Create a React component for user authentication",
      output: `import React, { useState } from 'react';
import { Button } from './ui/button';

const AuthComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    // Authentication logic here
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="auth-container">
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password"
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default AuthComponent;`,
      color: "green"
    },
    {
      id: "bugDetector",
      name: "Bug Detector",
      description: "Identify potential issues in your code",
      example: "function calculateTotal(items) { return items.reduce((sum, item) => sum + item.price, 0); }",
      output: `🐛 Potential Issues Found:

1. NULL/UNDEFINED CHECK MISSING
   - Line 1: 'items' parameter should be validated
   - Suggestion: Add null check before using .reduce()

2. TYPE SAFETY
   - Line 1: 'item.price' might be undefined
   - Suggestion: Add default value or validation

✅ IMPROVED CODE:
function calculateTotal(items = []) {
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, item) => {
    const price = Number(item?.price) || 0;
    return sum + price;
  }, 0);
}`,
      color: "red"
    },
    {
      id: "refactor",
      name: "Code Refactor",
      description: "Optimize and improve existing code",
      example: "Legacy jQuery code optimization",
      output: `🔄 REFACTORING SUGGESTIONS:

BEFORE (jQuery):
$('#myButton').click(function() {
  $('#myDiv').show();
  $('#myDiv').addClass('active');
});

AFTER (Modern JavaScript):
const button = document.getElementById('myButton');
const div = document.getElementById('myDiv');

button?.addEventListener('click', () => {
  div?.classList.add('active', 'show');
});

✨ IMPROVEMENTS:
• Removed jQuery dependency
• Better performance with native DOM API
• Added null safety checks
• Combined class operations`,
      color: "blue"
    }
  ];

  const currentTool = tools.find(tool => tool.id === activeDemo);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            AI Tools in <span className="gradient-text">Action</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the power of AI-driven development tools. See how they can transform your coding workflow.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tool Selection */}
          <div className="space-y-4">
            {tools.map((tool) => (
              <Card 
                key={tool.id}
                className={`cursor-pointer transition-all duration-300 glass-effect hover:border-${tool.color}-500/50 ${
                  activeDemo === tool.id ? `border-${tool.color}-500 bg-${tool.color}-500/10` : ''
                }`}
                onClick={() => setActiveDemo(tool.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">{tool.name}</CardTitle>
                    <Badge variant="secondary" className={`bg-${tool.color}-500/20 text-${tool.color}-400`}>
                      AI
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm">{tool.description}</p>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Demo Interface */}
          <div className="lg:col-span-2">
            <Card className="glass-effect border-green-500/30 h-full">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                  {currentTool?.name} Demo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Input */}
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">Input:</label>
                  <div className="bg-slate-900 border border-gray-700 rounded-lg p-4">
                    <code className="text-green-400 text-sm">{currentTool?.example}</code>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="flex justify-center">
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg glow-effect"
                  >
                    ✨ Generated with AI
                  </Button>
                </div>

                {/* Output */}
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">AI Output:</label>
                  <div className="bg-slate-900 border border-gray-700 rounded-lg p-4 max-h-80 overflow-y-auto">
                    <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                      {currentTool?.output}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIToolsShowcase;
