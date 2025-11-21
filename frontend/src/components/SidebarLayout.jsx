// src/components/SidebarLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";

export default function SidebarLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <main className="flex-1 ml-[90px] px-8 py-6">
        {children}
      </main>
    </div>
  );
}
