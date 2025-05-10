import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "@/store/slices/authSlice";
import Button from "@/components/shared/Button";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(loginStart());

    // Simulate login API call
    setTimeout(() => {
      // For demo purposes only - in a real app you'd connect to a backend
      if (email === "demo@example.com" && password === "password") {
        dispatch(
          loginSuccess({
            id: "1",
            name: "Demo User",
            email: "demo@example.com",
          })
        );

        toast({
          title: "Login successful",
          description: "Welcome back to your task dashboard!",
        });
      } else {
        dispatch(loginFailure("Invalid email or password"));

        toast({
          variant: "destructive",
          title: "Login failed",
          description:
            "Invalid email or password. Try demo@example.com / password",
        });
      }
    }, 1000);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md animate-fade-in ">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
        <p className="text-gray-600">Sign in to access your tasks</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="demo@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="password"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign up
          </button>
        </p>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>Demo credentials:</p>
        <p>Email: demo@example.com</p>
        <p>Password: password</p>
      </div>
    </div>
  );
};

export default LoginForm;
