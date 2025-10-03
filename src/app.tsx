import React from "react";
import TodosList from "./features/todosList.tsx";

function App() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <TodosList />
      </div>
    </div>
  );
}

export default App;
