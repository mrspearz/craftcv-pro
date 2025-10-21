import React from 'react';
import { Shield, Lock, Zap, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Privacy Highlight */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-3 bg-white px-6 py-3 rounded-full shadow-sm border border-green-200">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-900">
              <strong>100% Private:</strong> All processing happens in your browser — your files never leave your device
            </span>
            <Lock className="w-4 h-4 text-green-600" />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-3">
              <Zap className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-xs text-gray-600">
              Built with modern web technologies for instant updates and smooth performance
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-3">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Completely Offline</h3>
            <p className="text-xs text-gray-600">
              Works entirely in your browser. No accounts, no uploads, no data collection
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-3">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Professional Quality</h3>
            <p className="text-xs text-gray-600">
              Premium templates and designs trusted by professionals worldwide
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Brand */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-br from-primary-600 to-primary-700 rounded">
                <span className="text-xs font-bold text-white">RF</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">ResumeForge</span>
              <span className="text-xs text-gray-500">v1.0.0</span>
            </div>

            {/* Privacy Links */}
            <div className="flex items-center space-x-6 text-xs text-gray-600">
              <button className="hover:text-primary-600 transition-colors duration-200">
                How it Works
              </button>
              <button className="hover:text-primary-600 transition-colors duration-200">
                Privacy Policy
              </button>
              <button className="hover:text-primary-600 transition-colors duration-200">
                Open Source
              </button>
            </div>

            {/* Copyright */}
            <div className="text-xs text-gray-500">
              © 2024 ResumeForge. Built with privacy in mind.
            </div>
          </div>
        </div>

        {/* Additional Privacy Note */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            This application uses local storage to save your progress. No personal data is transmitted to external servers.
            <br />
            Your resume data is stored securely in your browser and can be exported as PDF at any time.
          </p>
        </div>
      </div>
    </footer>
  );
};