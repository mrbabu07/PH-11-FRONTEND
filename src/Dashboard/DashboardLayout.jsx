import React, { useState } from "react";
import { Outlet } from "react-router";
import Aside from "../Components/Aside";
import { Menu, X } from "lucide-react";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-gray-900 text-white flex items-center px-4 z-50">
        <button onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>
        <h1 className="ml-4 font-semibold">Dashboard</h1>
      </div>

      {/* Overlay (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Aside */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-72 z-50
          transform transition-transform duration-300
          bg-gray-900
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Close button (mobile) */}
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={() => setOpen(false)}>
            <X size={24} className="text-white" />
          </button>
        </div>

        <Aside />
      </aside>

      {/* Main Content */}
      <main className="pt-16 lg:pt-0 lg:ml-72 p-5 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
