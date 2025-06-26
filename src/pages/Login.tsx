import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    location.state?.message
  );
  const { user, signIn, signOut } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage(undefined);

    try {
      await signIn(trimmedEmail, trimmedPassword);
      navigate("/ai-tools");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <Navigation />

      <div className="max-w-md mx-auto px-4 py-12">
        <Card className="glass-effect border-green-500/30">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl">
              Welcome Back
            </CardTitle>
            <p className="text-gray-400">
              Sign in to access your AI development tools
            </p>
          </CardHeader>

          <CardContent className="space-y-6">

            {successMessage && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <p className="text-green-400 text-sm">{successMessage}</p>
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                {loading ? "Please wait..." : "🔐 Sign In"}
              </Button>
            </form>

            <div className="text-center">
              <span className="text-gray-400">
                Don't have an account?{" "}
              </span>
              <Link
                to="/register"
                className="text-green-400 hover:text-green-300"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
