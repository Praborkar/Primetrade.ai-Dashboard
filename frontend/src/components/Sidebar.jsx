// src/components/Sidebar.jsx
import React from "react";
import {
  LayoutDashboard,
  ListChecks,
  User,
  LogOut
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    { name: "Overview", icon: <LayoutDashboard size={22} />, to: "/app/dashboard" },
    { name: "Tasks", icon: <ListChecks size={22} />, to: "/app/tasks" },
    { name: "Profile", icon: <User size={22} />, to: "/app/profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside
      className="fixed left-6 top-6 bottom-6 w-24 rounded-3xl 
                 bg-gradient-to-b from-[#f0f7ff] via-[#f4f6fb] to-[#eef1f7]
                 text-[#1a1a1a] flex flex-col items-center justify-between
                 shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-4 z-30"
    >
      {/* Top Logo Box */}
      <div className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-md 
                      shadow-sm flex items-center justify-center border border-white/40">
        <div className="w-7 h-7 rounded-lg 
                        bg-gradient-to-br from-blue-400 to-purple-400 shadow-md" />
      </div>

      {/* Navigation Icons */}
      <nav className="flex flex-col items-center gap-10 mt-10">
        {items.map((it) => {
          const active = location.pathname === it.to;

          return (
            <Link
              key={it.to}
              to={it.to}
              title={it.name}
              className={`transition 
                ${active ? "opacity-100 scale-110" : "opacity-60 hover:opacity-100"}
              `}
            >
              {React.cloneElement(it.icon, { color: "#1a1a1a" })}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-md 
                   flex items-center justify-center border border-white/40
                   hover:bg-white/90 transition shadow-sm"
        title="Logout"
      >
        <LogOut size={22} color="#1a1a1a" />
      </button>
    </aside>
  );
}
