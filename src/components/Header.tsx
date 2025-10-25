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
          {/* Logo only */}
          <div className="flex items-center">
            <Logo size="sm" variant="default" animate={false} showText={false} />
          </div>

          {/* Center Controls - Template selector hidden on mobile */}
          <div className="hidden sm:flex items-center space-x-2 lg:space-x-4 flex-1 justify-center max-w-xs">
            {/* Template Selector */}
            <div className="relative w-full">
              <select
                value={selectedTemplate}
                onChange={(e) => onTemplateChange(e.target.value)}
                className="w-full px-3 lg:px-4 py-2 pr-8 bg-slate-800 border-2 border-violet-500/30 hover:border-violet-400/50 rounded-lg text-sm font-medium text-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-400 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer appearance-none"
              >
                <option value="">📄 Template</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Back to Dashboard - Always visible */}
            {onBackToLanding && (
              <button
                onClick={onBackToLanding}
                className="flex items-center gap-1.5 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors"
                title="Back to Dashboard"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
            )}
            
            {/* Mobile Download Button */}
            <button
              onClick={onExportPDF}
              className="sm:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg transition-all"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF</span>
            </button>
            
            {/* Desktop Only Actions */}
            <div className="hidden sm:flex items-center gap-2 lg:gap-3">
              {/* Account Menu */}
              <AccountMenu />
              
              {/* Preview Toggle */}
              <button
                onClick={onTogglePreview}
                className="flex items-center space-x-2 px-3 lg:px-4 py-2 lg:py-2.5 text-slate-300 hover:text-violet-400 hover:bg-violet-500/10 rounded-xl border-2 border-violet-500/30 hover:border-violet-400/50 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm"
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

              {/* Save Button */}
              <button
                onClick={onSave}
                disabled={!isDirty}
                className={`flex items-center space-x-2 px-3 lg:px-5 py-2 lg:py-2.5 text-sm font-semibold border-2 rounded-xl transition-all duration-200 shadow-sm ${
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
                className="flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-2.5 text-sm font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-500/30 hover:shadow-2xl transform hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 active:scale-100 animate-glow"
                title="Download as PDF"
              >
                <Download className="w-4 h-4" />
                <span>PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
