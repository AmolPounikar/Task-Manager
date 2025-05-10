import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "@/store/store";
import Button from "@/components/shared/Button";
import Navbar from "@/components/layout/Navbar";
import { ArrowRight, Check, Clock, List, Plus } from "lucide-react";

// Animation data constant - would typically be imported from a JSON file
const TASK_ANIMATION_DATA = {
  v: "5.7.8",
  fr: 60,
  ip: 0,
  op: 180,
  w: 400,
  h: 400,
  // This is a placeholder - in a real app, you'd import a real Lottie animation file
};

const Index: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const features = [
    {
      icon: <List className="h-8 w-8 text-purple-600" />,
      title: "Simple Task Management",
      description:
        "Create, update and organize your tasks with an intuitive interface.",
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-600" />,
      title: "Track Progress",
      description:
        "Move tasks between stages to track your progress and stay organized.",
    },
    {
      icon: <Plus className="h-8 w-8 text-purple-600" />,
      title: "Customize Workflow",
      description:
        "Add due dates and priorities to customize your task workflow.",
    },
  ];

  const cta = isAuthenticated ? (
    <Link to="/dashboard">
      <Button className="px-8 py-3 text-lg">
        Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Link>
  ) : (
    <div className="flex flex-col sm:flex-row gap-4">
      <Link to="/auth">
        <Button variant="outline" size="lg">
          Login
        </Button>
      </Link>
      <Link to="/auth?register=true">
        <Button size="lg">
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-100">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-400 via-white to-blue-400 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-12 lg:mb-0">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                <span className="block">Manage tasks</span>
                <span className="block text-primary">the simple way</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl">
                TaskMaster helps you organize and track your tasks with an
                intuitive, beautiful interface. Stay productive without the
                complexity.
              </p>
              <div className="mt-8">{cta}</div>
            </div>
            <div className="animate-float">
              <div className="bg-white rounded-xl shadow-xl p-6 mx-auto max-w-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">My Tasks</h3>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2.5 py-0.5 rounded-full">
                    Today
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 border-l-4 border-purple-500 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        Finish project proposal
                      </span>
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600">Due in 2 hours</p>
                  </div>
                  <div className="p-3 bg-orange-50 border-l-4 border-orange-500 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">Call with design team</span>
                    </div>
                    <p className="text-sm text-gray-600">3:00 PM</p>
                  </div>
                  <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">Update documentation</span>
                    </div>
                    <p className="text-sm text-gray-600">Tomorrow</p>
                  </div>
                </div>
                <button className="mt-6 bg-gray-50 hover:bg-gray-100 text-gray-600 w-full py-2 rounded-md transition-colors flex items-center justify-center">
                  <Plus className="h-4 w-4 mr-1" /> Add New Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Everything you need to stay organized
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Simple yet powerful features to help you manage your tasks and
              projects.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-md transition-all duration-200"
              >
                <div className="inline-flex items-center justify-center p-2 bg-purple-100 rounded-md">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Ready to get started?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-purple-100">
              Join thousands of users who organize their tasks with TaskMaster.
            </p>
            <div className="mt-8">
              <Link to="/auth?register=true">
                <Button
                  variant="destructive"
                  className="bg-white text-primary hover:bg-purple-50 border-white"
                  size="lg"
                >
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <Check className="h-8 w-auto text-white" />
                <span className="ml-2 text-xl font-bold text-white">
                  TaskMaster
                </span>
              </div>
              <p className="mt-2 text-gray-400">
                Simple task management for everyone.
              </p>
            </div>
          </div>

          <div className=" border-t border-gray-800 pt-8 md:flex md:items-center md:justify-between"></div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
