import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { CreditCard, ListChecks, User } from "lucide-react";
import api from "../services/api";

// ⭐ Import local image from assets
import defaultAvatar from "../assets/profile.png";

function Card({ children, className = "" }) {
  return (
    <div
      className={
        "bg-white rounded-xl p-5 shadow-sm border border-gray-100 " + className
      }
    >
      {children}
    </div>
  );
}

export default function Dashboard() {
  // --- Hardcoded content ---
  const habits = [
    { title: "Observing", time: "07:00 - 07:30" },
    { title: "Cooking", time: "09:00 - 10:00" },
    { title: "Self Caring", time: "11:00 - 12:00" },
    { title: "Singing", time: "14:00 - 14:30" },
    { title: "Reading", time: "16:00 - 17:30" },
  ];

  const reminders = [
    { tag: "Work", title: "Gym Session Week 3", location: "Dona Gym", time: "15:00" },
    { tag: "Learning", title: "Advanced Piano Class", location: "Mrs. Angeline house", time: "19:00" },
    { tag: "Inspiration", title: "Product Design Webinar", location: "Online", time: "20:00" },
  ];

  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch profile + tasks
  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      try {
        const [pRes, tRes] = await Promise.all([
          api.get("/profile"),
          api.get("/tasks"),
        ]);

        if (!mounted) return;

        setProfile(pRes.data.user || pRes.data);
        setTasks(tRes.data.tasks || []);
      } catch (err) {
        console.error("Dashboard error", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAll();
    return () => (mounted = false);
  }, []);

  // Stats
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;

    const weekMap = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      weekMap[d.toLocaleDateString(undefined, { weekday: "short" })] = 0;
    }

    tasks.forEach((t) => {
      const d = new Date(t.createdAt || Date.now());
      const key = d.toLocaleDateString(undefined, { weekday: "short" });
      if (weekMap[key] !== undefined) weekMap[key]++;
    });

    const chartData = Object.entries(weekMap).map(([day, tasks]) => ({
      day,
      tasks,
    }));

    const visits = chartData.map((d) => ({
      day: d.day,
      visits: d.tasks * 5 + 12,
    }));

    const totalActivitiesToday = habits.length + reminders.length + total;

    return { total, completed, chartData, visits, totalActivitiesToday };
  }, [tasks]);

  return (
    <>
      {/* HEADER */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Today Activities summary</p>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 hidden sm:block">
            Hi, <span className="font-semibold">{profile?.name}</span>
          </span>

          {/* ⭐ Local image fallback */}
          <img
            src={profile?.avatar || defaultAvatar}
            className="w-10 h-10 rounded-full border object-cover"
            alt="avatar"
          />
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-7 space-y-6">
          {/* Habits Summary */}
          <Card className="bg-gradient-to-b from-indigo-50/70 to-white">
            <div className="flex justify-between items-center gap-6">
              <div>
                <div className="text-xs text-gray-500">Habits Summary</div>

                <div className="text-4xl font-bold text-gray-900 mt-1">
                  {loading ? (
                    <div className="w-40 h-8 bg-gray-200 rounded animate-pulse" />
                  ) : (
                    `${habits.length} habits`
                  )}
                </div>

                <div className="text-sm text-gray-500 mt-2">
                  You have{" "}
                  <span className="text-green-600 font-semibold">
                    {habits.length}
                  </span>{" "}
                  habits today
                </div>
              </div>

              <div className="w-44 h-28">
                {loading ? (
                  <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="day" hide />
                      <YAxis hide />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="tasks"
                        stroke="#3B82F6"
                        strokeWidth={2.5}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </Card>

          {/* Habits List */}
          <Card>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900">Your Habits</h3>
              <span className="text-sm text-gray-500">
                Today · {habits.length} items
              </span>
            </div>

            <ul className="space-y-3">
              {habits.map((h) => (
                <li
                  key={h.title}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center font-semibold text-gray-700">
                      {h.title[0]}
                    </div>

                    <div>
                      <div className="font-medium text-gray-800">{h.title}</div>
                      <div className="text-xs text-gray-500">{h.time}</div>
                    </div>
                  </div>

                  <div className="text-sm font-medium text-gray-600">∘</div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-5 space-y-6">
          {/* Reminder Cards */}
          <div className="grid grid-cols-3 gap-3">
            {reminders.map((r, idx) => (
              <Card
                key={r.title}
                className={
                  idx === 0
                    ? "bg-indigo-50 border border-indigo-100"
                    : idx === 1
                    ? "bg-green-50 border border-green-100"
                    : "bg-yellow-50 border border-yellow-100"
                }
              >
                <div className="text-xs text-gray-600">{r.tag}</div>
                <div className="font-semibold mt-1 text-gray-900">
                  {r.title}
                </div>
                <div className="text-xs text-gray-500">
                  {r.time} · {r.location}
                </div>
              </Card>
            ))}
          </div>

          {/* Habits Count */}
          <Card className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">Habits</div>
              <div className="text-3xl font-bold">{habits.length}</div>
              <div className="text-xs text-gray-500">Today’s total habits</div>
            </div>
            <div className="p-2 rounded-md bg-orange-100">
              <CreditCard />
            </div>
          </Card>

          {/* To-Do Count */}
          <Card className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">To-Do</div>
              <div className="text-3xl font-bold">{stats.total}</div>
              <div className="text-xs text-gray-500">
                {stats.completed} completed
              </div>
            </div>
            <div className="p-2 rounded-md bg-blue-100">
              <ListChecks />
            </div>
          </Card>

          {/* Total Activities */}
          <Card className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">Today’s Activities</div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.totalActivitiesToday}
              </div>
              <div className="text-xs text-gray-500">
                Total activities today
              </div>
            </div>
            <div className="p-2 rounded-md bg-green-100">
              <User />
            </div>
          </Card>

          {/* Weekly Chart */}
          <Card>
            <h3 className="font-semibold text-gray-900 mb-2">
              Tasks Created This Week
            </h3>

            <div style={{ width: "100%", height: 160 }}>
              <ResponsiveContainer>
                <LineChart data={stats.visits}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="visits"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      {/* RECENT TO-DOS */}
      <div className="mt-8">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Recent To-Dos</h3>
            <span className="text-sm text-gray-500">{tasks.length} total</span>
          </div>

          <div className="space-y-3">
            {tasks.slice(0, 6).map((t) => (
              <div
                key={t._id}
                className="bg-gray-50 p-3 rounded-lg flex justify-between"
              >
                <div>
                  <div
                    className={
                      t.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800 font-medium"
                    }
                  >
                    {t.title}
                  </div>

                  <div className="text-xs text-gray-500">
                    {t.description || "—"}
                  </div>
                </div>

                <span className="text-xs text-gray-500">
                  {new Date(t.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}

            {tasks.length === 0 && (
              <div className="text-gray-500 text-sm">No tasks yet.</div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
