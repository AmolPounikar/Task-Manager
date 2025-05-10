import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { RootState } from "@/store/store";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check URL parameters to determine if we should show register form
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("register") === "true") {
      setIsLogin(false);
    }

    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [location.search, isAuthenticated, navigate]);

  const handleSwitchToLogin = () => setIsLogin(true);
  const handleSwitchToRegister = () => setIsLogin(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-white to-blue-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="w-full flex justify-center">
            <div
              className="flex items-center justify-center mb-8 text-2xl font-bold"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              <Check className="h-8 w-auto text-primary" />
              <span className="ml-2 text-gray-900">TaskMaster</span>
            </div>
          </div>

          <div className="flex justify-center">
            {isLogin ? (
              <LoginForm onSwitchToRegister={handleSwitchToRegister} />
            ) : (
              <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
