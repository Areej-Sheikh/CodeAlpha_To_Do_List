import { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Task 1", completed: false },
    { id: 2, text: "Task 2", completed: true },
    { id: 3, text: "Task 3", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="border-t-2 w-screen h-screen bg-zinc-800 flex items-center flex-col">
      <div className="mt-[7%] w-[25%] h-[20%] border rounded-3xl flex justify-around items-center">
        <div className="text-yellow-100">
          <h1 className="text-3xl font-bold">LETS TODO</h1>
          <p>Keeps doing things</p>
        </div>
        <div className="text-4xl font-extrabold flex justify-center items-center w-[120px] h-[120px] rounded-full bg-orange-600">
          {completedTasks}/{tasks.length}
        </div>
      </div>
      <form
        className="w-[25%] flex justify-between px-5 my-[2%]"
        onSubmit={handleAddTask}
      >
        <input
          placeholder="write your next task..."
          className="px-5 py-3 text-yellow-100 outline-none w-[85%] rounded-xl bg-zinc-700"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="outline-none text-4xl font-extrabold flex justify-center items-center w-[50px] h-[50px] rounded-full bg-orange-600"
          type="submit"
        >
          <i className="ri-add-fill"></i>
        </button>
      </form>
      <ul className="list-none w-[25%]">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="mb-5 flex justify-between items-center border rounded-xl p-5"
          >
            <div
              className="flex items-center"
              onClick={() => handleToggleComplete(task.id)}
            >
              <div
                className={`mr-4 rounded-full w-[30px] h-[30px] border ${
                  task.completed ? "bg-green-400" : "border-orange-600"
                }`}
              ></div>
              <h1
                className={`text-2xl font-extrabold text-yellow-100 ${
                  task.completed ? "line-through" : ""
                }`}
              >
                {task.text}
              </h1>
            </div>
            <div className="flex gap-3 text-2xl text-yellow-100">
              <i
                className="ri-delete-bin-3-line cursor-pointer"
                onClick={() => handleDeleteTask(task.id)}
              ></i>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
