import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowRight, AlertCircle, Sparkles, X } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  // Clear error message after 5 seconds
  const dismissError = () => setError('');

  // Handle input changes and clear field errors
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (fieldErrors.email) {
      const newErrors = {...fieldErrors};
      delete newErrors.email;
      setFieldErrors(newErrors);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (fieldErrors.password) {
      const newErrors = {...fieldErrors};
      delete newErrors.password;
      setFieldErrors(newErrors);
    }
  };

  // Form validation before submission
  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    // Email validation
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!password) {
      errors.password = 'Password is required';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('');
    } catch (err: any) {
      console.error(err);
      
      // Handle Firebase authentication errors
      if (err.code) {
        switch (err.code) {
          case 'auth/user-not-found':
            setFieldErrors({email: 'No account found with this email'});
            setError('No account exists with this email address.');
            break;
          case 'auth/wrong-password':
            setFieldErrors({password: 'Incorrect password'});
            setError('Incorrect password. Please try again.');
            break;
          case 'auth/invalid-email':
            setFieldErrors({email: 'Invalid email format'});
            setError('Please enter a valid email address.');
            break;
          case 'auth/user-disabled':
            setError('This account has been disabled. Please contact support.');
            break;
          case 'auth/too-many-requests':
            setError('Too many unsuccessful login attempts. Please try again later or reset your password.');
            break;
          case 'auth/network-request-failed':
            setError('Network error. Please check your internet connection and try again.');
            break;
          default:
            setError('Login failed. Please check your credentials and try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://assets.codepen.io/3364143/glass-morphism-background_1.jpg')] bg-cover bg-center opacity-20" />
        
        {/* Floating Particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="w-full max-w-md z-10"
      >
        <Card className="relative overflow-hidden border-border bg-card/80 backdrop-blur-md">
          {/* Glow Effect */}
          <motion.div 
            className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 blur-lg opacity-70"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          
          <CardHeader className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="text-center"
            >
              <Sparkles className="h-8 w-8 mx-auto mb-2 text-primary" />
              <CardTitle className="text-3xl font-bold text-foreground bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-muted-foreground/90">
                Sign in to continue your journey
              </CardDescription>
            </motion.div>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 bg-destructive/10 border border-destructive text-destructive rounded-lg flex items-start"
                >
                  <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="flex-grow">{error}</span>
                  <button 
                    onClick={dismissError}
                    className="flex-shrink-0 text-destructive/70 hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <motion.div
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-1"
              >
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className={`focus:ring-2 focus:ring-ring bg-background/80 ${fieldErrors.email ? 'border-destructive focus:ring-destructive' : ''}`}
                />
                {fieldErrors.email && (
                  <p className="text-xs text-destructive mt-1">{fieldErrors.email}</p>
                )}
              </motion.div>
              
              <motion.div
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-1"
              >
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className={`focus:ring-2 focus:ring-ring bg-background/80 ${fieldErrors.password ? 'border-destructive focus:ring-destructive' : ''}`}
                />
                {fieldErrors.password && (
                  <p className="text-xs text-destructive mt-1">{fieldErrors.password}</p>
                )}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-end"
              >
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary hover:text-primary/80 hover:underline"
                >
                  Forgot password?
                </Link>
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Button 
                  type="submit" 
                  className="w-full group bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <span className="mr-2">Log In</span>
                      <ArrowRight className="h-4 w-4 transition-all group-hover:translate-x-1 group-hover:scale-110" />
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.form>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 text-center text-sm text-muted-foreground"
            >
              <span className="opacity-80">Don't have an account?</span>{' '}
              <Link 
                to="/signup" 
                className="text-primary font-medium hover:text-primary/80 hover:underline"
              >
                Sign up
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}