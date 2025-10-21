import React from 'react';
import { Eye, EyeOff, Download, Save, ArrowLeft } from 'lucide-react';
import { Logo } from './Logo';
import { AccountMenu } from './AccountMenu';
import type { TemplateConfig } from '../types';

interface HeaderProps {
  selectedTemplate: string;
  templates: TemplateConfig[];
  onTemplateChange: (templateId: string) => void;
  onExportPDF: () => void;
  showPreview: boolean;
  onTogglePreview: () => void;
  onSave: () => void;
  isDirty: boolean;
  lastSaved?: Date | null;
  onBackToLanding?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedTemplate,
  templates,
  onTemplateChange,
  onExportPDF,
  showPreview,
  onTogglePreview,
  onSave,
  isDirty,
  lastSaved,
  onBackToLanding,
}) => {
  return (
    <header className="border-b border-violet-500/20 flex-shrink-0 shadow-lg">
      <div className="px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo and Brand with Back Button */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {onBackToLanding && (
              <button
                onClick={onBackToLanding}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 text-slate-300 hover:text-violet-400 hover:bg-violet-500/10 rounded-xl transition-all duration-200 font-medium text-sm group"
                title="Back to Home"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
                <span className="hidden sm:inline">Home</span>
              </button>
            )}
            
            <Logo size="sm" variant="default" animate={false} className="sm:size-md" />
          </div>

          {/* Center Controls - Hide template selector on very small screens */}
          <div className="hidden sm:flex items-center space-x-2 lg:space-x-4">
            {/* Template Selector */}
            <div className="relative">
              <select
                value={selectedTemplate}
                onChange={(e) => onTemplateChange(e.target.value)}
                className="px-3 lg:px-4 py-2 lg:py-2.5 pr-8 lg:pr-10 bg-slate-800 border-2 border-violet-500/30 hover:border-violet-400/50 rounded-xl text-xs lg:text-sm font-medium text-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-400 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer appearance-none"
              >
                <option value="">📄 Template</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 lg:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-3 lg:w-4 h-3 lg:h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Account Menu */}
            <AccountMenu />
            {/* Preview Toggle - Always visible */}
            <button
              onClick={onTogglePreview}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 lg:px-4 py-2 lg:py-2.5 text-slate-300 hover:text-violet-400 hover:bg-violet-500/10 rounded-xl border-2 border-violet-500/30 hover:border-violet-400/50 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-xs sm:text-sm"
              title={showPreview ? 'Hide Preview' : 'Show Preview'}
            >
              {showPreview ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  <span className="hidden lg:inline">Hide</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span className="hidden lg:inline">Preview</span>
                </>
              )}
            </button>

            {/* Save Button - Compact on mobile */}
            <button
              onClick={onSave}
              disabled={!isDirty}
              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 lg:px-5 py-2 lg:py-2.5 text-xs sm:text-sm font-semibold border-2 rounded-xl transition-all duration-200 shadow-sm ${
                isDirty
                  ? 'bg-slate-800 border-violet-500/30 hover:border-violet-400/50 text-slate-200 hover:text-violet-400 hover:bg-violet-500/10 hover:shadow-md'
                  : 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
              }`}
              title={isDirty ? 'Save Changes' : lastSaved ? `Last saved: ${lastSaved.toLocaleTimeString()}` : 'No Changes to Save'}
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
              {isDirty && (
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              )}
              {!isDirty && (
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              )}
            </button>

            {/* Download Button */}
            <button
              onClick={onExportPDF}
              className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 lg:px-6 py-2 lg:py-2.5 text-xs sm:text-sm font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-500/30 hover:shadow-2xl transform hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 active:scale-100 animate-glow"
              title="Download as PDF"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">PDF</span>
              <span className="sm:hidden">↓</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
