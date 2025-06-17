import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import styles from './AITools.module.css';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import {
  Code,
  Bug,
  RefreshCw,
  FileText,
  Languages,
  Brain,
  BookOpen,
  Wrench,
  Globe,
  MessageCircle,
  CheckSquare,
  Bolt,
  Database,
  Filter,
  Server
} from "lucide-react";
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
      icon: MessageCircle,
      description: "Generate answers for your questions",
      color: "violet",
      placeholder: "Ask your question about coding (e.g., 'How to add real-time chatting')",
      systemPrompt: "You are a coding question answer. Answer the question based on the user's description. Include proper answers and follow best practices."
    },
    {
      id: "unitTestGen",
      name: "Unit Test Generator",
      icon: CheckSquare,
      description: "Generate unit tests for your code",
      color: "lime",
      placeholder: "Paste your code to generate unit tests",
      systemPrompt: "You are a unit test generator. Create robust, clean, and maintainable unit tests based on the provided code."
    },
    {
      id: "codeOptimizer",
      name: "Code Optimizer",
      icon: Bolt,
      description: "Optimize code for better performance",
      color: "gold",
      placeholder: "Paste your code to optimize its performance",
      systemPrompt: "You are a code optimizer. Enhance the provided code for maximum performance and minimal resource consumption."
    },
    {
      id: "schemaDesigner",
      name: "Database Schema Designer",
      icon: Database,
      description: "Design database schemas based on project requirements",
      color: "silver",
      placeholder: "Describe your project requirements to design a database schema",
      systemPrompt: "You are a database schema designer. Create optimal database designs that ensure scalability and reliability."
    },
    {
      id: "regexHelper",
      name: "Regex Helper",
      icon: Filter,
      description: "Generate or debug regular expressions",
      color: "magenta",
      placeholder: "Describe your regex needs or paste a regex for debugging",
      systemPrompt: "You are a regex expert. Create, debug, or explain regular expressions based on the user's needs."
    },
    {
      id: "apiHelper",
      name: "API Helper",
      icon: Server,
      description: "Generate or document API endpoints",
      color: "aqua",
      placeholder: "Describe your API or paste existing endpoint details",
      systemPrompt: "You are an API expert. Generate, optimize, or document API endpoints based on the user's description or provided details."
    }
  ];
  const handleToolChange = (toolId: string) => {
    setActiveTool(toolId);
    setPrompt(""); // Clear the input
    setResult(""); // Clear the output
  };

  const currentTool = aiTools.find(tool => tool.id === activeTool) || aiTools[0];

  // Function to format AI output with proper styling
  const formatAIOutput = (text: string) => {
    if (!text) return null;

    const lines = text.split('\n');
    const formattedContent: JSX.Element[] = [];
    let inCodeBlock = false;
    let currentCodeBlock: string[] = [];
    let currentLanguage = '';

    const processCodeBlock = () => {
      if (currentCodeBlock.length > 0) {
        formattedContent.push(
          <div key={`code-${formattedContent.length}`}
            className="group"
            style={{
              margin: '1rem 0',
              borderRadius: '0.75rem',
              overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.1)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              padding: '0.75rem 1rem',
              color: '#e2e8f0',
              fontSize: '0.875rem',
              fontFamily: 'monospace',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
              <span style={{
                textTransform: 'capitalize',
                color: '#94a3b8'
              }}>{currentLanguage || 'code'}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(currentCodeBlock.join('\n'));
                  toast({
                    title: "Code copied to clipboard",
                    description: "You can now paste it anywhere",
                    duration: 2000,
                  });
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  color: '#94a3b8',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                }}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy code
              </Button>
            </div>
            <pre style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              padding: '1rem',
              margin: 0,
              overflow: 'auto',
              color: '#e2e8f0',
              fontSize: '0.875rem',
              lineHeight: '1.6'
            }}>
              <code style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                whiteSpace: 'pre'
              }}>
                {currentCodeBlock.join('\n').split('\n').map((line, i) => {
                  // Add syntax highlighting colors
                  return line
                    .replace(/(\/\*.*?\*\/|\/\/.*)/g, '<span style="color: #94a3b8">$1</span>') // Comments
                    .replace(/(".*?"|'.*?'|`.*?`)/g, '<span style="color: #fbbf24">$1</span>') // Strings
                    .replace(/\b(const|let|var|function|class|if|else|return|import|export|from)\b/g, '<span style="color: #ec4899">$1</span>') // Keywords
                    .replace(/\b(true|false|null|undefined|this)\b/g, '<span style="color: #f472b6">$1</span>') // Special values
                    .replace(/\b(\d+)\b/g, '<span style="color: #22d3ee">$1</span>'); // Numbers
                }).join('\n')}
              </code>
            </pre>
          </div>
        );
        currentCodeBlock = [];
        currentLanguage = '';
      }
    };

    lines.forEach((line, index) => {
      const key = `line-${index}`;

      if (line.startsWith('```')) {
        if (inCodeBlock) {
          processCodeBlock();
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          currentLanguage = line.slice(3).trim();
        }
        return;
      }

      if (inCodeBlock) {
        currentCodeBlock.push(line);
        return;
      }

      // Handle headers
      if (line.match(/^[A-Z][\w\s]+:?$/)) {
        formattedContent.push(
          <h2 key={key} style={{
            color: '#f1f5f9',
            fontSize: '1.5rem',
            fontWeight: 700,
            marginTop: '2rem',
            marginBottom: '1rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            paddingBottom: '0.5rem'
          }}>
            {line.replace(/:$/, '')}
          </h2>
        );
      }
      // Handle sub-headers
      else if (line.match(/^\d+\.\s+.*:$/)) {
        formattedContent.push(
          <h3 key={key} style={{
            color: '#f1f5f9',
            fontSize: '1.25rem',
            fontWeight: 600,
            marginTop: '1.5rem',
            marginBottom: '0.75rem'
          }}>
            {line}
          </h3>
        );
      }
      // Handle bullet points
      else if (line.match(/^\*\s+/)) {
        const bulletText = line.replace(/^\*\s+/, '');
        const parts = bulletText.split(/(\*\*.*?\*\*)/g);
        const formattedBullet = parts.map((part, idx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={idx} style={{ color: '#f1f5f9', fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
          }
          return <span key={idx} style={{ color: '#f1f5f9' }}>{part}</span>;
        });

        formattedContent.push(
          <div key={key}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              margin: '0.5rem 0 0.5rem 1rem',
              color: '#f1f5f9',
              fontSize: '1rem',
              lineHeight: '1.75'
            }}>
            <span style={{
              marginRight: '0.75rem',
              color: '#94a3b8',
              fontSize: '1.25rem',
              lineHeight: '1.25'
            }}>•</span>
            <span style={{ flex: 1 }}>{formattedBullet}</span>
          </div>
        );
      }
      // Handle regular text with bold sections
      else if (line.trim() !== '') {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        const formattedLine = parts.map((part, idx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={idx} style={{
                color: '#f1f5f9',
                fontWeight: 600
              }}>
                {part.slice(2, -2)}
              </strong>
            );
          }
          return <span key={idx} style={{ color: '#f1f5f9' }}>{part}</span>;
        });

        formattedContent.push(
          <p key={key} style={{
            margin: '0.75rem 0',
            color: '#f1f5f9',
            fontSize: '1rem',
            lineHeight: '1.75'
          }}>
            {formattedLine}
          </p>
        );
      }
    });

    processCodeBlock();
    return (      <div className={`ai-output ${styles.scrollableContent}`} style={{
        maxWidth: '100%',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: '1.5rem',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '0.75rem',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 0 15px rgba(0,0,0,0.1)',
        margin: '1rem 0'
      }}>
        {formattedContent}        <div className={styles.scrollToTopContainer}>
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="glass-effect"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              color: '#f1f5f9',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s',
              backdropFilter: 'blur(10px)'
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
            Back to Top
          </Button>
        </div>
      </div>
    );
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

  return (<div className="min-h-screen pt-16" style={{
    msOverflowStyle: 'none',
    scrollbarWidth: 'none'
  }}>
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
                className={`cursor-pointer transition-all duration-300 glass-effect hover:border-${tool.color}-500/50 ${activeTool === tool.id ? `border-${tool.color}-500 bg-${tool.color}-500/10` : ''
                  }`}
                onClick={() => handleToolChange(tool.id)}
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
            {/* Input Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-gray-300 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Input Query
                  </div>
                </label>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="glass-effect border-gray-600 text-gray-400 hover:bg-gray-500/10"
                    onClick={() => setPrompt("")}
                  >
                    Clear
                  </Button>
                </div>
              </div>                <Textarea
                placeholder={currentTool.placeholder}
                className="glass-effect border-gray-600 text-white placeholder-gray-400 font-mono text-sm"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={{
                  lineHeight: '1.5',
                  padding: '1rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  minHeight: '200px',
                  maxHeight: '400px',
                  height: 'auto',
                  resize: 'vertical',
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': {
                    display: 'none'
                  }
                }}
              />
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Use Markdown for formatting. Wrap code in ```language blocks.</span>
                <span>{prompt.length} characters</span>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 shadow-lg transition-all duration-200 hover:shadow-green-500/20"
              onClick={handleGenerate}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing Request...
                </>
              ) : (
                <>
                  <Code className="w-4 h-4 mr-2" />
                  Generate Response
                </>
              )}
            </Button>

            {/* Output Section */}
            {(result || isLoading) && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Generated Output
                    </label>
                    {result && !isLoading && (
                      <span className="text-xs text-gray-500 px-2 py-1 rounded-full bg-gray-800/50">
                        {result.split('\n').length} lines
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {result && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="glass-effect border-blue-500 text-blue-400 hover:bg-blue-500/10 flex items-center gap-2"
                          onClick={handleCopy}
                          disabled={isCopied}
                        >
                          {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          {isCopied ? "Copied!" : "Copy All"}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin text-green-400" />
                        <span className="text-gray-400 text-sm">Processing your request...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-300 text-sm divide-y divide-gray-800">
                      <div className="p-4 bg-gray-800/30">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Code className="w-4 h-4" />
                          <span>Response from {currentTool.name}</span>
                        </div>
                      </div>
                      <div className="p-6 overflow-x-auto">
                        {formatAIOutput(result)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Tips */}
            {!result && !isLoading && (
              <div className="border border-gray-800 rounded-lg p-4 bg-gray-900/30">
                <h4 className="text-gray-300 text-sm font-medium mb-3 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Pro Tips
                </h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Use clear, specific descriptions for better results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>For code examples, specify the language and framework version</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Include relevant context like OS, environment, or dependencies</span>
                  </li>
                </ul>
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
