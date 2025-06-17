import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await signUp(formData.username, formData.email, formData.password);
      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
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
              Create Your Account
            </CardTitle>
            <p className="text-gray-400">
              Join DevGenius AI and start your AI development journey
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Benefits Preview */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
              <h3 className="text-green-400 font-semibold mb-2">✨ What You'll Get</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Secure API key storage & management</li>
                <li>• Complete generation history</li>
                <li>• Custom templates & presets</li>
                <li>• Advanced AI model access</li>
              </ul>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Username</label>
                <Input
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  className="glass-effect border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Email</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="glass-effect border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Password</label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className="glass-effect border-gray-600 text-white placeholder-gray-400"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">Must be at least 6 characters long</p>
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Confirm Password</label>
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="glass-effect border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 glow-effect"
              >
                {loading ? "Creating account..." : "🚀 Create Account"}
              </Button>
            </form>

            <div className="space-y-4">
              <div className="text-center">
                <span className="text-gray-400">
                  Already have an account?{" "}
                </span>
                <Link
                  to="/login"
                  className="text-green-400 hover:text-green-300"
                >
                  Sign in
                </Link>
              </div>

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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
