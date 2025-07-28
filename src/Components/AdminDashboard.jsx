import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  BarChart3, 
  Settings, 
  FileText, 
  Globe, 
  Database,
  Shield,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [iframeUrls, setIframeUrls] = useState({
    dashboard: 'https://www.google.com/search?q=admin+dashboard+analytics&tbm=isch',
    users: 'https://jsonplaceholder.typicode.com/users',
    analytics: 'https://www.google.com/search?q=analytics+dashboard&tbm=isch',
    content: 'https://jsonplaceholder.typicode.com/posts',
    settings: 'https://www.google.com/search?q=admin+settings&tbm=isch',
    monitoring: 'https://httpstat.us/',
    database: 'https://www.google.com/search?q=database+admin&tbm=isch',
    security: 'https://www.google.com/search?q=security+dashboard&tbm=isch'
  });

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'content', label: 'Content Management', icon: FileText },
    { id: 'monitoring', label: 'System Monitoring', icon: Globe },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleUrlChange = (itemId, newUrl) => {
    setIframeUrls(prev => ({
      ...prev,
      [itemId]: newUrl
    }));
  };

  const openInNewTab = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`font-bold text-xl text-gray-800 ${!sidebarOpen && 'hidden'}`}>
            Admin Panel
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left hover:bg-blue-50 transition-colors ${
                  activeItem === item.id ? 'bg-blue-100 border-r-4 border-blue-500 text-blue-700' : 'text-gray-600'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span className={`ml-3 ${!sidebarOpen && 'hidden'}`}>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 capitalize">
                {sidebarItems.find(item => item.id === activeItem)?.label || 'Dashboard'}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Manage and monitor your application
              </p>
            </div>
            
            {/* URL Input */}
            <div className="flex items-center space-x-3">
              <input
                type="url"
                value={iframeUrls[activeItem] || ''}
                onChange={(e) => handleUrlChange(activeItem, e.target.value)}
                placeholder="Enter URL for iframe content"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
              />
              <button
                onClick={() => openInNewTab(iframeUrls[activeItem])}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Open in new tab"
              >
                <ExternalLink size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area with iframe */}
        <main className="flex-1 p-6 overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm h-full border">
            {iframeUrls[activeItem] ? (
              <iframe
                src={iframeUrls[activeItem]}
                className="w-full h-full rounded-lg"
                title={`${activeItem} content`}
                sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation"
                loading="lazy"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Globe size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium">No URL specified</p>
                  <p className="text-sm">Enter a URL in the header to load content</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;