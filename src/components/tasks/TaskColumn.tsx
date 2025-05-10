
import React from 'react';
import TaskCard from './TaskCard';
import type { Task } from '@/store/slices/taskSlice';
import { cn } from '@/lib/utils';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: 'todo' | 'in-progress' | 'completed';
  onEditTask: (task: Task) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ 
  title, 
  tasks, 
  status, 
  onEditTask 
}) => {
  const getColumnColor = () => {
    switch (status) {
      case 'todo': return 'bg-purple-50 border-purple-200';
      case 'in-progress': return 'bg-orange-50 border-orange-200';
      case 'completed': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getHeaderColor = () => {
    switch (status) {
      case 'todo': return 'text-purple-800 border-purple-300 bg-purple-100';
      case 'in-progress': return 'text-orange-800 border-orange-300 bg-orange-100';
      case 'completed': return 'text-green-800 border-green-300 bg-green-100';
      default: return 'text-gray-800 border-gray-300';
    }
  };

  return (
    <div 
      className={cn(
        "rounded-lg border p-4 h-full flex flex-col",
        getColumnColor()
      )}
    >
      <div className={`flex items-center justify-between mb-4 rounded-md px-3 py-2 ${getHeaderColor()}`}>
        <h2 className="font-medium">{title}</h2>
        <span className="bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
          {tasks.length}
        </span>
      </div>
      
      <div className="flex-grow overflow-y-auto space-y-2">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500 italic">
            No tasks
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onEdit={onEditTask} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
