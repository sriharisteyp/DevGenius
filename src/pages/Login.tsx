
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { Crown, Star, Zap, Save, History, Settings, User, Mail, Lock } from "lucide-react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { user, signIn, signUp, signOut } = useAuth();
  const navigate = useNavigate();

  const premiumFeatures = [
    { icon: Crown, title: "Secure API Keys", description: "Encrypted storage for your AI service API keys" },
    { icon: Star, title: "Generation History", description: "Access your complete AI generation history" },
    { icon: Save, title: "Save & Export", description: "Save your generated code and export projects" },
    { icon: History, title: "Smart Templates", description: "Create and reuse custom prompt templates" },
    { icon: Settings, title: "Advanced Settings", description: "Fine-tune AI parameters for better results" },
    { icon: Zap, title: "Multi-Model Support", description: "Switch between different AI models seamlessly" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await signIn(email, password);
        navigate("/ai-tools");
      } else {
        if (!fullName) {
          setError("Full name is required");
          setLoading(false);
          return;
        }
        await signUp(email, password, fullName);
        navigate("/ai-tools");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    }
    
    setLoading(false);
  };

  if (user) {
    return (
      <div className="min-h-screen pt-16">
        <Navigation />
        
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome back, <span className="gradient-text">{user.user_metadata?.full_name || 'Developer'}!</span>
            </h1>
            <p className="text-xl text-gray-300">
              Your AI development workspace is ready
            </p>
          </div>

          {/* User Info Card */}
          <Card className="glass-effect border-green-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <User className="w-6 h-6" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Crown className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm text-gray-400">Plan</p>
                    <Badge className="bg-green-500/20 text-green-400">Premium</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {premiumFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="glass-effect border-green-500/30 hover:border-green-500/50 transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400 text-xs">
                          Active
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <Card className="glass-effect border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Link to="/ai-tools">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    🚀 Start Coding
                  </Button>
                </Link>
                <Button variant="outline" className="glass-effect border-gray-600 hover:border-green-500 text-white">
                  📝 My Templates
                </Button>
                <Button variant="outline" className="glass-effect border-gray-600 hover:border-green-500 text-white">
                  📊 Usage Stats
                </Button>
                <Button 
                  variant="outline" 
                  onClick={signOut}
                  className="glass-effect border-gray-600 hover:border-red-500 text-white"
                >
                  🚪 Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <Navigation />
      
      <div className="max-w-md mx-auto px-4 py-12">
        <Card className="glass-effect border-green-500/30">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl">
              {isLogin ? "Welcome Back" : "Join DevGenius AI"}
            </CardTitle>
            <p className="text-gray-400">
              {isLogin 
                ? "Sign in to access your AI development tools" 
                : "Create your account to get started"
              }
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Benefits Preview */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
              <h3 className="text-green-400 font-semibold mb-2">✨ What You Get</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Secure API key storage & management</li>
                <li>• Complete generation history</li>
                <li>• Custom templates & presets</li>
                <li>• Advanced AI model access</li>
              </ul>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Full Name</label>
                  <Input 
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="glass-effect border-gray-600 text-white placeholder-gray-400"
                    required
                  />
                </div>
              )}

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Email</label>
                <Input 
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-effect border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Password</label>
                <Input 
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-effect border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>

              <Button 
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 glow-effect"
              >
                {loading ? "Please wait..." : (isLogin ? "🔐 Sign In" : "🚀 Create Account")}
              </Button>
            </form>

            <div className="text-center">
              <span className="text-gray-400">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-green-400 hover:text-green-300"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>

            {!isLogin && (
              <p className="text-xs text-gray-400 text-center">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="text-green-400 hover:text-green-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-green-400 hover:text-green-300">
                  Privacy Policy
                </Link>
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
