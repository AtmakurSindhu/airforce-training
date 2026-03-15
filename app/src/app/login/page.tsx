import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plane, Shield, Lock, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = login({ email, password });
      
      if (result.success && result.user) {
        // Redirect based on role
        switch (result.user.role) {
          case 'trainee':
            navigate('/trainee/dashboard');
            break;
          case 'instructor':
            navigate('/instructor/dashboard');
            break;
          case 'admin':
            navigate('/admin/dashboard');
            break;
          default:
            navigate('/trainee/dashboard');
        }
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { role: 'Trainee', email: 'arjun.singh@iaf.gov.in', password: 'password' },
    { role: 'Instructor', email: 'vikram.rao@iaf.gov.in', password: 'password' },
    { role: 'Admin', email: 'priya.sharma@iaf.gov.in', password: 'password' },
  ];

  return (
    <div className="min-h-screen bg-iaf-navy-dark iaf-grid-pattern flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-iaf-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-iaf-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-iaf-gold/20 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-iaf-gold/30 flex items-center justify-center">
                <Plane className="w-14 h-14 text-iaf-gold" />
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-iaf-success rounded-full animate-pulse" />
          </div>
          
          <div>
            <h1 className="text-5xl font-bold text-iaf-sky mb-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              भारतीय वायु सेना
            </h1>
            <h2 className="text-2xl font-semibold text-iaf-gold iaf-text-glow tracking-wider">
              INDIAN AIR FORCE
            </h2>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-medium text-iaf-sky/90">
              Global Training Intelligence Platform
            </h3>
            <p className="text-sm text-iaf-sky/60 max-w-md">
              Advanced AI-driven training system for aircraft systems, digital twins, 
              and mission simulations. Secure, scalable, and mission-ready.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-iaf-success/10 border border-iaf-success/30 rounded-lg">
              <Shield className="w-5 h-5 text-iaf-success" />
              <span className="text-sm text-iaf-success font-medium">Defense Grade Security</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-iaf-cyan/10 border border-iaf-cyan/30 rounded-lg">
              <Lock className="w-5 h-5 text-iaf-cyan" />
              <span className="text-sm text-iaf-cyan font-medium">Encrypted</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="bg-iaf-navy/90 border-iaf-navy-light/50 backdrop-blur-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center lg:hidden mb-4">
              <div className="w-16 h-16 rounded-full bg-iaf-gold/20 flex items-center justify-center">
                <Plane className="w-8 h-8 text-iaf-gold" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center text-iaf-sky">
              Secure Login
            </CardTitle>
            <CardDescription className="text-center text-iaf-sky/60">
              Enter your credentials to access the training platform
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-iaf-alert/10 border-iaf-alert/50">
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-iaf-sky/80">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@iaf.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-iaf-navy-light/50 border-iaf-navy-light text-iaf-sky placeholder:text-iaf-sky/40 focus:border-iaf-gold focus:ring-iaf-gold/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-iaf-sky/80">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-iaf-navy-light/50 border-iaf-navy-light text-iaf-sky placeholder:text-iaf-sky/40 focus:border-iaf-gold focus:ring-iaf-gold/20 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-iaf-sky/50 hover:text-iaf-sky"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-iaf-navy-light bg-iaf-navy-light text-iaf-gold focus:ring-iaf-gold/20"
                  />
                  <span className="text-sm text-iaf-sky/60">Remember me</span>
                </label>
                <a href="#" className="text-sm text-iaf-gold hover:text-iaf-gold-light">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-iaf-gold hover:bg-iaf-gold-light text-iaf-navy-dark font-semibold"
              >
                {isLoading ? 'Authenticating...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Accounts */}
            <div className="pt-4 border-t border-iaf-navy-light/30">
              <p className="text-xs text-iaf-sky/50 text-center mb-3">Demo Accounts (Password: "password")</p>
              <div className="grid grid-cols-3 gap-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.email}
                    onClick={() => {
                      setEmail(account.email);
                      setPassword(account.password);
                    }}
                    className={cn(
                      'px-2 py-1.5 text-xs rounded border transition-colors',
                      email === account.email
                        ? 'bg-iaf-gold/20 border-iaf-gold text-iaf-gold'
                        : 'bg-iaf-navy-light/30 border-iaf-navy-light/50 text-iaf-sky/60 hover:text-iaf-sky hover:border-iaf-sky/30'
                    )}
                  >
                    {account.role}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="fixed bottom-4 left-0 right-0 text-center">
        <p className="text-xs text-iaf-sky/40">
          © 2024 Indian Air Force. All rights reserved. | Classified System - Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}
