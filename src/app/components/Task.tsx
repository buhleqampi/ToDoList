"use client";

import React, { useState, useEffect, useRef } from "react";

interface Task {
  name: string;
  description: string;
  dueDate: string;
//   priority: string;
}

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const nameInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLInputElement>(null);
  const dueDateInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]") as Task[];
    setTasks(storedTasks);
  }, []);

  const saveTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const addTask = () => {
    const nameValue = nameInput.current?.value.trim() ?? "";
    const descriptionValue = descriptionInput.current?.value.trim() ?? "";
    const dueDateValue = dueDateInput.current?.value.trim() ?? "";

    if (nameValue !== "") {
        
      const task: Task = {
          name: nameValue, description: descriptionValue, dueDate: dueDateValue };
      const newTasks = [...tasks, task];
      setTasks(newTasks);
      saveTasksToLocalStorage(newTasks);
      if (nameInput.current) nameInput.current.value = "";
      if (descriptionInput.current) descriptionInput.current.value = "";
      if (dueDateInput.current) dueDateInput.current.value = "";
      if (nameInput.current) nameInput.current.focus();
    } else {
      alert("Please enter a task!");
    }
  };

  const delTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const updateTask = (index: number) => {
    const task = tasks[index];
    const newName = prompt("Enter new title:", task.name);
    const newDescription = prompt("Enter new description:", task.description);
    if (newName !== null && newDescription !== null) {
      const updatedTask = { ...task, title: newName, description: newDescription };
      const newTasks = tasks.map((t, i) => (i === index ? updatedTask : t));
      setTasks(newTasks);
      saveTasksToLocalStorage(newTasks);
    }
  };

  const filteredTasks = tasks.filter(task =>
    (task.name && task.name. toLowerCase().includes(searchTerm.toLowerCase())) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow-md rounded-lg font-patrick-hand backdrop-blur-xs bg-opacity-80">
      <h1 className="text-2xl font-bold text-center mb-5">Todo List</h1>
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full p-2 mb-3 border rounded-sm focus:outline-hidden focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        ref={nameInput}
        className="w-full p-2 mb-3 border rounded-sm focus:outline-hidden focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        placeholder="Description"
        ref={descriptionInput}
        className="w-full p-2 mb-3 border rounded-sm focus:outline-hidden focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="date"
        ref={dueDateInput}
        className="w-full p-2 mb-3 border rounded-sm focus:outline-hidden focus:ring-2 focus:ring-blue-400"
      />
      <div className="flex justify-between">
        <button
          onClick={addTask}
          className="flex-1 p-2 mb-3 bg-gray-500 text-white rounded-sm hover:bg-black mr-1"
        >
          Add Task
        </button>
        <button
          onClick={() => { setTasks([]); saveTasksToLocalStorage([]); }}
          className="flex-1 p-2 mb-3 bg-gray-500 text-white rounded-sm hover:bg-black ml-1"
        >
          Delete All
        </button>
      </div>
      <ul className="list-none p-0 mt-5">
        {filteredTasks.map((task, index) => (
          <li key={index} className="list-group-item">
            <strong>Name:</strong> {task.name}<br />
            <strong>Description:</strong> {task.description}<br />
            <strong>Due Date:</strong> {task.dueDate}<br />
            {/* <strong>Timestamp:</strong> {task.priority}<br /> */}
            <button onClick={() => delTask(index)} className="text-red-500 ml-2">Delete</button>
            <button onClick={() => updateTask(index)} className="text-blue-500 ml-2">Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
