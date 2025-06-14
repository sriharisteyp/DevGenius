import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Copy, Check, Loader2, Code, Bug, RefreshCw, FileText, Languages, Brain, BookOpen, Wrench, Globe, MessageCircleQuestion } from "lucide-react";
import { callGeminiApi } from "@/utils/geminiApi";
import { useToast } from "@/hooks/use-toast";

const AITools = () => {
  const [activeTool, setActiveTool] = useState("codeGen");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const aiTools = [
    {
      id: "codeGen",
      name: "Code Generator",
      icon: Code,
      description: "Generate code from natural language descriptions",
      color: "green",
      placeholder: "Describe the code you want to generate (e.g., 'Create a React login form component')",
      systemPrompt: "You are a code generator. Generate clean, well-commented code based on the user's description. Include proper TypeScript types and follow best practices."
    },
    {
      id: "bugDetector",
      name: "Bug Detector",
      icon: Bug,
      description: "Identify potential bugs and security vulnerabilities",
      color: "red",
      placeholder: "Paste your code here to detect potential bugs and issues",
      systemPrompt: "You are a bug detector. Analyze the provided code and identify potential bugs, security vulnerabilities, performance issues, and suggest fixes."
    },
    {
      id: "refactor",
      name: "Code Refactor",
      icon: RefreshCw,
      description: "Optimize and improve existing code",
      color: "blue",
      placeholder: "Paste the code you want to refactor and optimize",
      systemPrompt: "You are a code refactoring expert. Improve the provided code for better performance, readability, maintainability, and best practices."
    },
    {
      id: "docGen",
      name: "Documentation Generator",
      icon: FileText,
      description: "Generate comprehensive documentation",
      color: "purple",
      placeholder: "Paste your code or describe what you need documentation for",
      systemPrompt: "You are a documentation generator. Create comprehensive, clear documentation including usage examples, parameters, and explanations."
    },
    {
      id: "translator",
      name: "Language Translator",
      icon: Languages,
      description: "Convert code between programming languages",
      color: "orange",
      placeholder: "Paste code and specify target language (e.g., 'Convert this JavaScript to Python')",
      systemPrompt: "You are a programming language translator. Convert code from one programming language to another while maintaining functionality and best practices."
    },
    {
      id: "explainer",
      name: "Code Explainer",
      icon: Brain,
      description: "Get detailed explanations of complex code",
      color: "cyan",
      placeholder: "Paste the code you want explained in detail",
      systemPrompt: "You are a code explainer. Provide detailed, easy-to-understand explanations of code, including what each part does and why."
    },
    {
      id: "learningPath",
      name: "Learning Path",
      icon: BookOpen,
      description: "Get personalized learning recommendations",
      color: "pink",
      placeholder: "Describe your current skill level and what you want to learn",
      systemPrompt: "You are a learning advisor. Create personalized learning paths with resources, steps, and timelines based on the user's goals and current level."
    },
    {
      id: "framework",
      name: "Framework Recommender",
      icon: Wrench,
      description: "Get suggestions for tools and frameworks",
      color: "indigo",
      placeholder: "Describe your project requirements and goals",
      systemPrompt: "You are a framework and tool advisor. Recommend the best frameworks, libraries, and tools based on project requirements and constraints."
    },
    {
      id: "websites",
      name: "Web Resources",
      icon: Globe,
      description: "Find relevant websites and resources",
      color: "teal",
      placeholder: "What kind of resources or websites are you looking for?",
      systemPrompt: "You are a web resource finder. Recommend relevant websites, tutorials, documentation, and online resources based on the user's needs."
    },
    
    {
      id: "question",
      name: "Ask Questions about Coding",
      icon: MessageCircleQuestion,
      description: "Generate answers for your questions",
      color: "violet",
      placeholder: "Ask Your question about Coding (e.g., 'How to add real-time chating')",
      systemPrompt: "You are a code question answer. Answer the question  based on the user's description. Include proper answers and follow best practices."
    }
  ];

  const currentTool = aiTools.find(tool => tool.id === activeTool) || aiTools[0];

  // Function to format AI output with proper styling
  const formatAIOutput = (text: string) => {
    if (!text) return null;
  
    const lines = text.split('\n');
    const formattedContent: JSX.Element[] = [];
  
    lines.forEach((line, index) => {
      const key = `line-${index}`;
  
      if (line.match(/^\*\*.*\*\*:?$/)) {
        const headerText = line.replace(/\*\*/g, '').replace(/:$/, '');
        formattedContent.push(<h3 key={key} style={{ fontWeight: 'bold', fontSize: '1.25rem', margin: '1rem 0' }}>{headerText}</h3>);
      } else if (line.includes('**') && line.trim() !== '') {
        const parts = line.split('**');
        const formattedLine = parts.map((part, partIndex) => partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part);
        formattedContent.push(<p key={key} style={{ margin: '0.5rem 0' }}>{formattedLine}</p>);
      } else if (line.match(/^\s*\*\s+/)) {
        const bulletText = line.replace(/^\s*\*\s+/, '');
        formattedContent.push(
          <div key={key} style={{ display: 'flex', alignItems: 'flex-start', margin: '0.5rem 0' }}>
            <span style={{ marginRight: '0.5rem' }}>•</span>
            <span>{bulletText}</span>
          </div>
        );
      } else if (line.match(/^\s*\d+\.\s+/)) {
        const listText = line.replace(/^\s*\d+\.\s+/, '');
        const number = line.match(/^\s*(\d+)\./)?.[1] || '1';
        formattedContent.push(
          <div key={key} style={{ display: 'flex', alignItems: 'flex-start', margin: '0.5rem 0' }}>
            <span style={{ marginRight: '0.5rem' }}>{number}.</span>
            <span>{listText}</span>
          </div>
        );
      } else if (line.includes('http')) {
        const urlRegex = /(https?:\/\/[^\s\]]+)/g;
        const parts = line.split(urlRegex);
        const formattedLine = parts.map((part, partIndex) => 
          part.match(urlRegex) ? (
            <a key={partIndex} href={part} target="_blank" rel="noopener noreferrer" style={{ color: '#0077cc', textDecoration: 'underline' }}>
              {part}
            </a>
          ) : part
        );
        formattedContent.push(<p key={key} style={{ margin: '0.5rem 0' }}>{formattedLine}</p>);
      } else if (line.trim() !== '') {
        formattedContent.push(<p key={key} style={{ margin: '0.5rem 0' }}>{line}</p>);
      }
    });
  
    return <div>{formattedContent}</div>;
  };
  

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult("");

    try {
      const fullPrompt = `${currentTool.systemPrompt}\n\nUser request: ${prompt}`;
      const response = await callGeminiApi(fullPrompt, "AIzaSyBPWD8VGE4EUqGzsdfP-nLfDV0JNOHdBoM");
      setResult(response);
      toast({
        title: "Success",
        description: `${currentTool.name} completed successfully!`,
      });
    } catch (error) {
      console.error("AI Tool Error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate result",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Result copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI-Powered <span className="gradient-text">Development</span> Tools
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Supercharge your development workflow with 10 powerful AI tools powered by Google Gemini.
          </p>
        </div>

        {/* Tool Selection Grid */}
        <div className="mb-8">
          <h3 className="text-white font-semibold mb-4 text-center">Select an AI Tool</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {aiTools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Card 
                  key={tool.id}
                  className={`cursor-pointer transition-all duration-300 glass-effect hover:border-${tool.color}-500/50 ${
                    activeTool === tool.id ? `border-${tool.color}-500 bg-${tool.color}-500/10` : ''
                  }`}
                  onClick={() => setActiveTool(tool.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`w-10 h-10 rounded-lg bg-${tool.color}-500/20 flex items-center justify-center mx-auto mb-2`}>
                      <IconComponent className={`w-5 h-5 text-${tool.color}-400`} />
                    </div>
                    <h4 className="text-white text-sm font-medium mb-1">{tool.name}</h4>
                    <p className="text-gray-400 text-xs line-clamp-2">{tool.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Main Tool Interface */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass-effect border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-3">
                <currentTool.icon className="w-6 h-6 text-green-400" />
                {currentTool.name}
              </CardTitle>
              <p className="text-gray-400">{currentTool.description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Input */}
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Input:</label>
                <Textarea
                  placeholder={currentTool.placeholder}
                  className="glass-effect border-gray-600 text-white placeholder-gray-400 min-h-[120px]"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              {/* Generate Button */}
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 glow-effect"
                onClick={handleGenerate}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    ✨ Generate with AI
                  </>
                )}
              </Button>

              {/* Output */}
              {(result || isLoading) && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-gray-300 text-sm font-medium">AI Output:</label>
                    {result && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="glass-effect border-blue-500 text-blue-400 hover:bg-blue-500/10"
                        onClick={handleCopy}
                        disabled={isCopied}
                      >
                        {isCopied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {isCopied ? "Copied!" : "Copy"}
                      </Button>
                    )}
                  </div>
                  <div className="bg-black border border-gray-700 rounded-lg p-6 max-h-96 overflow-y-auto">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-green-400" />
                        <span className="ml-2 text-gray-400">AI is working...</span>
                      </div>
                    ) : (
                      <div className="text-gray-300 text-sm">
                        {formatAIOutput(result)}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Additional Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass-effect border-gray-700">
              <CardContent className="p-6">
                <Globe className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="text-white font-semibold mb-3">Development Resources</h3>
                <p className="text-gray-400 mb-4">Access curated lists of development resources, tutorials, and documentation.</p>
                <div className="space-y-2">
                  <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 text-sm">
                    MDN Web Docs
                  </a>
                  <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 text-sm">
                    React Documentation
                  </a>
                  <a href="https://stackoverflow.com" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:text-blue-300 text-sm">
                    Stack Overflow
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-gray-700">
              <CardContent className="p-6">
                <BookOpen className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="text-white font-semibold mb-3">Learning Platforms</h3>
                <p className="text-gray-400 mb-4">Best online platforms for learning programming and development skills.</p>
                <div className="space-y-2">
                  <a href="https://freecodecamp.org" target="_blank" rel="noopener noreferrer" className="block text-purple-400 hover:text-purple-300 text-sm">
                    freeCodeCamp
                  </a>
                  <a href="https://codecademy.com" target="_blank" rel="noopener noreferrer" className="block text-purple-400 hover:text-purple-300 text-sm">
                    Codecademy
                  </a>
                  <a href="https://coursera.org" target="_blank" rel="noopener noreferrer" className="block text-purple-400 hover:text-purple-300 text-sm">
                    Coursera
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-gray-700">
              <CardContent className="p-6">
                <Wrench className="w-8 h-8 text-orange-400 mb-3" />
                <h3 className="text-white font-semibold mb-3">Developer Tools</h3>
                <p className="text-gray-400 mb-4">Essential tools and utilities for modern web development.</p>
                <div className="space-y-2">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="block text-orange-400 hover:text-orange-300 text-sm">
                    GitHub
                  </a>
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="block text-orange-400 hover:text-orange-300 text-sm">
                    Vercel
                  </a>
                  <a href="https://figma.com" target="_blank" rel="noopener noreferrer" className="block text-orange-400 hover:text-orange-300 text-sm">
                    Figma
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AITools;
