
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type TaskStatus = "todo" | "in-progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate?: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
}

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [
    {
      id: "1",
      title: "Complete project setup",
      description: "Install dependencies and configure the project",
      status: "completed",
      priority: "high",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Design user interface",
      description: "Create wireframes and design components",
      status: "in-progress",
      priority: "medium",
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Implement authentication",
      description: "Add login and registration functionality",
      status: "todo",
      priority: "high",
      dueDate: new Date(Date.now() + 172800000).toISOString(),
      createdAt: new Date().toISOString(),
    },
  ],
  isLoading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id" | "createdAt">>) => {
      const newTask = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
    },
    updateTask: (
      state,
      action: PayloadAction<{
        id: string;
        updates: Partial<Omit<Task, "id" | "createdAt">>;
      }>
    ) => {
      const { id, updates } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          ...updates,
        };
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    moveTask: (
      state,
      action: PayloadAction<{ id: string; status: TaskStatus }>
    ) => {
      const { id, status } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex].status = status;
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, moveTask } = taskSlice.actions;

export default taskSlice.reducer;
