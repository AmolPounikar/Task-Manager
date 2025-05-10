
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerStart, registerSuccess, registerFailure } from '@/store/slices/authSlice';
import Button from '@/components/shared/Button';
import { useToast } from '@/hooks/use-toast';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
      });
      return;
    }
    
    dispatch(registerStart());
    
    // Simulate register API call
    setTimeout(() => {
      // For demo purposes only - in a real app you'd connect to a backend
      dispatch(registerSuccess({
        id: '1',
        name,
        email
      }));
      
      toast({
        title: "Registration successful",
        description: "Welcome to your task dashboard!",
      });
    }, 1000);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md animate-fade-in">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
        <p className="text-gray-600">Start managing your tasks today</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
