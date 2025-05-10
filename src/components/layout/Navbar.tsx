import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Check, LogOut, User } from "lucide-react";
import { logout } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import { useToast } from "@/hooks/use-toast";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const { toast } = useToast();

  const handleLogout = () => {
    dispatch(logout());
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Check className="h-9 w-auto text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                TaskMaster
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-primary text-gray-900 hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="border-primary text-gray-900 hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-primary font-medium">
                  Welcome, {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/auth"
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <User className="h-4 w-4 mr-1" />
                  Login
                </Link>
                <Link
                  to="/auth?register=true"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
