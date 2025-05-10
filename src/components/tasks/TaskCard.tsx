
import React from 'react';
import { Check, Clock, Edit, Trash } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { moveTask, deleteTask } from '@/store/slices/taskSlice';
import type { Task, TaskStatus } from '@/store/slices/taskSlice';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const dispatch = useDispatch();

  const handleMove = (newStatus: TaskStatus) => {
    dispatch(moveTask({ id: task.id, status: newStatus }));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCardStyles = () => {
    switch (task.status) {
      case 'todo': return 'border-l-4 border-l-purple-400 bg-task-todo';
      case 'in-progress': return 'border-l-4 border-l-orange-400 bg-task-in-progress';
      case 'completed': return 'border-l-4 border-l-green-400 bg-task-completed';
      default: return 'bg-white';
    }
  };

  const actionButtons = () => {
    switch (task.status) {
      case 'todo':
        return (
          <button 
            onClick={() => handleMove('in-progress')}
            className="p-1 hover:bg-purple-100 rounded-full text-purple-700"
            aria-label="Mark as in progress"
            title="Mark as in progress"
          >
            <Clock size={16} />
          </button>
        );
      case 'in-progress':
        return (
          <button 
            onClick={() => handleMove('completed')}
            className="p-1 hover:bg-green-100 rounded-full text-green-700"
            aria-label="Mark as completed"
            title="Mark as completed"
          >
            <Check size={16} />
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={cn(
        "task-card p-4 rounded-md shadow-sm mb-3",
        getCardStyles(),
        "animate-fade-in"
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-800 flex-grow">{task.title}</h3>
        <div className="flex space-x-1 ml-2">
          {actionButtons()}
          <button 
            onClick={() => onEdit(task)}
            className="p-1 hover:bg-blue-100 rounded-full text-blue-700"
            aria-label="Edit task"
            title="Edit task"
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={handleDelete}
            className="p-1 hover:bg-red-100 rounded-full text-red-700"
            aria-label="Delete task"
            title="Delete task"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      
      <div className="flex justify-between items-center mt-2">
        <div>
          {task.dueDate && (
            <span className="flex items-center text-xs text-gray-500">
              <Clock size={12} className="mr-1" /> Due: {formatDate(task.dueDate)}
            </span>
          )}
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor()}`}>
          {task.priority}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
