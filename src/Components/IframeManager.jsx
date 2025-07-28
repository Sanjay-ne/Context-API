import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  X, 
  RefreshCw, 
  ExternalLink, 
  Home,
  AlertCircle,
  Loader
} from 'lucide-react';

const IframeManager = () => {
  const [tabs, setTabs] = useState([
    {
      id: 1,
      title: 'Dashboard Analytics',
      url: 'https://www.google.com/search?q=admin+dashboard+analytics&tbm=isch',
      loading: false,
      error: false
    }
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [newUrl, setNewUrl] = useState('');
  const iframeRefs = useRef({});

  const addTab = () => {
    if (!newUrl.trim()) return;
    
    const newTab = {
      id: Date.now(),
      title: getPageTitle(newUrl),
      url: newUrl,
      loading: true,
      error: false
    };
    
    setTabs(prev => [...prev, newTab]);
    setActiveTab(newTab.id);
    setNewUrl('');
  };

  const closeTab = (tabId) => {
    if (tabs.length <= 1) return;
    
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    if (activeTab === tabId) {
      setActiveTab(newTabs[0]?.id);
    }
  };

  const refreshTab = (tabId) => {
    setTabs(prev => prev.map(tab => 
      tab.id === tabId 
        ? { ...tab, loading: true, error: false }
        : tab
    ));
    
    if (iframeRefs.current[tabId]) {
      iframeRefs.current[tabId].src = iframeRefs.current[tabId].src;
    }
  };

  const getPageTitle = (url) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '').split('.')[0];
    } catch {
      return 'New Tab';
    }
  };

  const handleIframeLoad = (tabId) => {
    setTabs(prev => prev.map(tab => 
      tab.id === tabId 
        ? { ...tab, loading: false, error: false }
        : tab
    ));
  };

  const handleIframeError = (tabId) => {
    setTabs(prev => prev.map(tab => 
      tab.id === tabId 
        ? { ...tab, loading: false, error: true }
        : tab
    ));
  };

  const openInNewWindow = (url) => {
    window.open(url, '_blank');
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Tab Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center px-4 py-2">
          {/* Tabs */}
          <div className="flex space-x-1 flex-1 overflow-x-auto">
            {tabs.map(tab => (
              <div
                key={tab.id}
                className={`flex items-center space-x-2 px-3 py-2 rounded-t-lg cursor-pointer min-w-0 ${
                  activeTab === tab.id 
                    ? 'bg-blue-50 border-b-2 border-blue-500 text-blue-700' 
                    : 'hover:bg-gray-50 text-gray-600'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="flex items-center space-x-2 min-w-0">
                  {tab.loading && <Loader size={14} className="animate-spin flex-shrink-0" />}
                  {tab.error && <AlertCircle size={14} className="text-red-500 flex-shrink-0" />}
                  {!tab.loading && !tab.error && <Home size={14} className="flex-shrink-0" />}
                  <span className="truncate text-sm font-medium max-w-32">{tab.title}</span>
                </div>
                {tabs.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.id);
                    }}
                    className="p-1 hover:bg-gray-200 rounded flex-shrink-0"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add Tab */}
          <div className="flex items-center space-x-2 ml-4">
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTab()}
              placeholder="Enter URL to add new tab"
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
            <button
              onClick={addTab}
              disabled={!newUrl.trim()}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        {activeTabData && (
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="font-medium">URL:</span>
              <span className="truncate max-w-96">{activeTabData.url}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => refreshTab(activeTab)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded"
                title="Refresh"
              >
                <RefreshCw size={16} />
              </button>
              <button
                onClick={() => openInNewWindow(activeTabData.url)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded"
                title="Open in new window"
              >
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 relative">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`absolute inset-0 ${activeTab === tab.id ? 'block' : 'hidden'}`}
          >
            {tab.error ? (
              <div className="flex items-center justify-center h-full bg-red-50">
                <div className="text-center">
                  <AlertCircle size={48} className="mx-auto mb-4 text-red-400" />
                  <h3 className="text-lg font-medium text-red-800 mb-2">Failed to load content</h3>
                  <p className="text-sm text-red-600 mb-4">The URL might not allow embedding or there was a network error.</p>
                  <button
                    onClick={() => refreshTab(tab.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : (
              <>
                {tab.loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                    <div className="text-center">
                      <Loader size={32} className="animate-spin mx-auto mb-4 text-blue-500" />
                      <p className="text-gray-600">Loading content...</p>
                    </div>
                  </div>
                )}
                <iframe
                  ref={el => iframeRefs.current[tab.id] = el}
                  src={tab.url}
                  className="w-full h-full border-0"
                  title={tab.title}
                  sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation allow-popups"
                  onLoad={() => handleIframeLoad(tab.id)}
                  onError={() => handleIframeError(tab.id)}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IframeManager;