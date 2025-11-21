import React from "react";

export default function TaskPage() {
  const habits = [
    { title: "Observing", time: "07:00 - 07:30" },
    { title: "Cooking", time: "09:00 - 10:00" },
    { title: "Self Caring", time: "11:00 - 12:00" },
    { title: "Singing", time: "14:00 - 14:30" },
    { title: "Reading", time: "16:00 - 17:30" },
  ];

  const reminders = [
    {
      tag: "Work",
      title: "Gym Session Week 3",
      desc: "Day for biceps, legs, and back.",
      location: "Dona Gym",
      time: "15:00",
    },
    {
      tag: "Learning",
      title: "Advanced Piano Class",
      desc: "Practicing melody with Mrs. Angeline.",
      location: "Mrs. Angeline house",
      time: "19:00",
    },
    {
      tag: "Inspiration",
      title: "Product Design Webinar",
      desc: "Tokopedia Product Design Webinar.",
      location: "Online",
      time: "20:00",
    },
  ];

  const [todo, setTodo] = React.useState([
    {
      status: "To Do",
      title: "UX Researching - Phase 2",
      desc: "Conduct user interview with 3 participants.",
    },
    {
      status: "In Progress",
      title: "Daily Team Meeting",
      desc: "Meeting with team and stakeholders.",
    },
    {
      status: "Completed",
      title: "Meeting with Client",
      desc: "Meeting for understanding their brief.",
    },
  ]);

  // Modal State
  const [showModal, setShowModal] = React.useState(false);
  const [newTask, setNewTask] = React.useState({ title: "", desc: "", status: "To Do" });

  const handleAddTask = () => {
    if (!newTask.title) return;
    setTodo([...todo, { ...newTask }]);
    setNewTask({ title: "", desc: "", status: "To Do" });
    setShowModal(false);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 text-gray-800">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Today Activities</h1>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm shadow hover:bg-blue-700 transition-all"
        >
          + New Activity
        </button>
      </div>

      {/* Habits */}
      <h2 className="text-lg font-semibold mb-3">Your Habits</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {habits.map((h, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 shadow hover:shadow-md transition-all">
            <div className="w-full h-20 bg-blue-100 rounded-xl mb-3"></div>
            <p className="font-semibold text-sm">{h.title}</p>
            <p className="text-xs text-gray-500">{h.time}</p>
          </div>
        ))}
      </div>

      {/* Reminders */}
      <h2 className="text-lg font-semibold mb-3">Reminders</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {reminders.map((r, index) => (
          <div key={index} className="bg-white rounded-2xl p-5 shadow border">
            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-lg">{r.tag}</span>
            <h3 className="mt-2 font-semibold">{r.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{r.desc}</p>
            <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
              <span>{r.location}</span>
              <span className="font-medium">{r.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* To Do List */}
      <h2 className="text-lg font-semibold mb-3">To Do List</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {todo.map((t, index) => (
          <div key={index} className="bg-white rounded-2xl p-5 shadow border">
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-lg">{t.status}</span>
            <h3 className="mt-2 font-semibold">{t.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{t.desc}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

            <label className="text-sm">Task Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded-xl mt-1 mb-3"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />

            <label className="text-sm">Description</label>
            <textarea
              className="w-full p-2 border rounded-xl mt-1 mb-3"
              value={newTask.desc}
              onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })}
            />

            <label className="text-sm">Status</label>
            <select
              className="w-full p-2 border rounded-xl mt-1 mb-3"
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <div className="flex justify-end gap-3 mt-4">
              <button className="px-4 py-2 bg-gray-200 rounded-xl" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-xl" onClick={handleAddTask}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
