import React, { useState } from 'react';
import { storage } from '../utils/storage';

interface DevToolsProps {
  isVisible: boolean;
}

export const DevTools: React.FC<DevToolsProps> = ({ isVisible }) => {
  const [status, setStatus] = useState<string>('');

  const handleCleanupCorruptedData = () => {
    try {
      const wasCorrupted = storage.cleanupCorruptedData();
      if (wasCorrupted) {
        setStatus('✅ Cleaned up corrupted image data. Please refresh the page.');
      } else {
        setStatus('ℹ️ No corrupted data found.');
      }
    } catch (error) {
      setStatus(`❌ Error during cleanup: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear all saved data? This action cannot be undone.')) {
      try {
        storage.clearAll();
        setStatus('✅ All data cleared. Please refresh the page.');
      } catch (error) {
        setStatus(`❌ Error clearing data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };

  const handleGetStorageInfo = () => {
    try {
      const info = storage.getStorageInfo();
      setStatus(`Storage usage: ${(info.total / 1024).toFixed(2)}KB total`);
    } catch (error) {
      setStatus(`❌ Error getting storage info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg max-w-sm z-50">
      <h3 className="text-sm font-bold mb-3">🛠️ Dev Tools</h3>
      
      <div className="space-y-2">
        <button
          onClick={handleCleanupCorruptedData}
          className="w-full text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded transition-colors"
        >
          Clean Corrupted Data
        </button>
        
        <button
          onClick={handleGetStorageInfo}
          className="w-full text-xs bg-green-600 hover:bg-green-700 px-2 py-1 rounded transition-colors"
        >
          Check Storage Usage
        </button>
        
        <button
          onClick={handleClearAllData}
          className="w-full text-xs bg-red-600 hover:bg-red-700 px-2 py-1 rounded transition-colors"
        >
          Clear All Data
        </button>
      </div>
      
      {status && (
        <div className="mt-3 p-2 bg-gray-800 rounded text-xs">
          {status}
        </div>
      )}
      
      <div className="mt-3 text-xs text-gray-400">
        Press Ctrl+Shift+D to toggle
      </div>
    </div>
  );
};