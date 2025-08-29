import React from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  return (
    <div className="grid">
      <TaskForm onCreated={() => {}} />
      <TaskList />
    </div>
  );
}
