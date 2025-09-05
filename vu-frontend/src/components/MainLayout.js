import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <style>
        {`
          .layout {
            display: flex;
            height: 100vh;
            overflow: hidden;
          }

          .sidebar {
            width: 250px;
            background: #1e1e2f;
            color: white;
            transition: width 0.3s ease;
            padding: 20px;
          }

          .sidebar.collapsed {
            width: 60px;
          }

          .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }

          .topbar {
            height: 60px;
            background: #f4f4f4;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            border-bottom: 1px solid #ddd;
          }

          .content-area {
            padding: 20px;
            overflow-y: auto;
            flex: 1;
            background: #f9f9f9;
          }

          .burger-btn {
            font-size: 22px;
            background: none;
            border: none;
            cursor: pointer;
          }

          .logout-btn {
            background: none;
            border: none;
            cursor: pointer;
          }

          nav a {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
            color: white;
            text-decoration: none;
          }

          nav a:hover {
            color: #00aaff;
          }

          .toggle-btn {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            margin-bottom: 20px;
            cursor: pointer;
          }
        `}
      </style>

      <div className="layout">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="main-content">
          <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <div className="content-area">{children}</div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
