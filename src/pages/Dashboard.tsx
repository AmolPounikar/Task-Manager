
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '@/store/store';
import Navbar from '@/components/layout/Navbar';
import TaskColumn from '@/components/tasks/TaskColumn';
import TaskForm from '@/components/tasks/TaskForm';
import Button from '@/components/shared/Button';
import { Plus } from 'lucide-react';
import type { Task } from '@/store/slices/taskSlice';

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setIsFormVisible(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setEditingTask(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Task Dashboard</h1>
          
          <Button 
            onClick={handleCreateTask} 
            className="inline-flex items-center"
          >
            <Plus className="mr-1 h-5 w-5" />
            Add Task
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskColumn 
            title="To Do" 
            tasks={todoTasks} 
            status="todo" 
            onEditTask={handleEditTask} 
          />
          
          <TaskColumn 
            title="In Progress" 
            tasks={inProgressTasks} 
            status="in-progress" 
            onEditTask={handleEditTask} 
          />
          
          <TaskColumn 
            title="Completed" 
            tasks={completedTasks} 
            status="completed" 
            onEditTask={handleEditTask} 
          />
        </div>
      </main>

      <TaskForm 
        task={editingTask} 
        onClose={handleCloseForm} 
        isVisible={isFormVisible} 
      />
    </div>
  );
};

export default Dashboard;
