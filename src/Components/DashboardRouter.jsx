import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, Monitor } from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import IframeManager from './IframeManager';

const DashboardRouter = () => {
  return (
    <Router>
      <div className="h-screen flex flex-col">
        {/* Top Navigation */}
        <nav className="bg-gray-900 text-white shadow-lg">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Admin Control Center</h1>
              <div className="flex space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`
                  }
                >
                  <LayoutDashboard size={20} />
                  <span>Admin Dashboard</span>
                </NavLink>
                <NavLink
                  to="/iframe-manager"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`
                  }
                >
                  <Monitor size={20} />
                  <span>Iframe Manager</span>
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/iframe-manager" element={<IframeManager />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default DashboardRouter;