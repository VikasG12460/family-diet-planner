import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Mail, Lock, LogIn } from 'lucide-react';
import { storage } from '../../utils/storage';

interface LoginProps {
  onLogin: (user: any) => void;
  onSwitchToSignup: () => void;
}

export function Login({ onLogin, onSwitchToSignup }: LoginProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { email, password } = formData;

    // 1. Basic Validation
    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    // 2. Check if user exists
    const user = storage.getUserByEmail(email);
    
    if (!user) {
      setError('No account found with this email address');
      setLoading(false);
      return;
    }

    // 3. Check password
    if (user.password !== password) {
      setError('Incorrect password');
      setLoading(false);
      return;
    }

    // 4. Successful Login
    const sessionUser = { id: user.id, name: user.name, email: user.email };
    
    setTimeout(() => {
      setLoading(false);
      onLogin(sessionUser);
    }, 500); // Simulate network delay
  };

  return (
    <Card className="w-full max-w-md shadow-lg border-emerald-100">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-emerald-700">Welcome Back</CardTitle>
        <CardDescription>Sign in to access your family diet plan</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error Message Display */}
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
              <span className="font-bold">!</span>
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="pl-10"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
            {!loading && <LogIn className="ml-2 h-4 w-4" />}
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-emerald-600 font-medium hover:underline"
            >
              Sign up
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}