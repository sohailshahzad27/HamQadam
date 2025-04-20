import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createUserProfile } from '../../auth/userService';
import { Loader2, Check, AlertCircle, Rocket } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      
      const userCredential = await signup(formData.email, formData.password);
      await createUserProfile(userCredential.user.uid, {
        email: formData.email,
        displayName: formData.email.split('@')[0],
        createdAt: new Date().toISOString()
      });
      
      setSuccess(true);
      setTimeout(() => navigate(''), 1500);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to create account');
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
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://assets.codepen.io/3364143/glass-morphism-background_2.jpg')] bg-cover bg-center opacity-20" />
        
        {/* Floating Bubbles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-secondary/20 backdrop-blur-sm"
            style={{
              width: Math.random() * 30 + 10,
              height: Math.random() * 30 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="w-full max-w-md z-10"
      >
        <Card className="relative overflow-hidden border-border bg-card/80 backdrop-blur-lg">
          {/* Dynamic Gradient Border */}
          <motion.div 
            className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur-md opacity-50"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          <div className="relative z-10">
            <CardHeader>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="text-center"
              >
                <Rocket className="h-8 w-8 mx-auto mb-2 text-primary animate-bounce" />
                <CardTitle className="text-3xl font-bold text-foreground bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Join Us Today
                </CardTitle>
                <CardDescription className="text-muted-foreground/90">
                  Start your journey with us
                </CardDescription>
              </motion.div>
            </CardHeader>
            
            <CardContent>
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 p-3 bg-destructive/10 border border-destructive text-destructive rounded-lg flex items-center"
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span>{error}</span>
                  </motion.div>
                )}
                
                {success && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 p-3 bg-secondary/10 border border-secondary text-secondary rounded-lg flex items-center"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    <span>Account created successfully! Redirecting...</span>
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
                >
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="focus:ring-2 focus:ring-ring bg-background/80"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="focus:ring-2 focus:ring-ring bg-background/80"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="focus:ring-2 focus:ring-ring bg-background/80"
                  />
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
                    className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
                    disabled={loading || success}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : success ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      'Launch Your Journey'
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
                <span className="opacity-80">Already have an account?</span>{' '}
                <Link 
                  to="/login" 
                  className="text-primary font-medium hover:text-primary/80 hover:underline"
                >
                  Log in
                </Link>
              </motion.div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}