import React from 'react';
import { Header } from './Header';
import type { TemplateConfig } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  selectedTemplate: string;
  templates: TemplateConfig[];
  onTemplateChange: (templateId: string) => void;
  onExportPDF: () => void;
  showPreview: boolean;
  onTogglePreview: () => void;
  onSave: () => void;
  isDirty: boolean;
  lastSaved: Date | null;
  onBackToLanding?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
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
    <div className="h-screen bg-slate-950 flex flex-col overflow-hidden">
      <Header
        selectedTemplate={selectedTemplate}
        templates={templates}
        onTemplateChange={onTemplateChange}
        onExportPDF={onExportPDF}
        showPreview={showPreview}
        onTogglePreview={onTogglePreview}
        onSave={onSave}
        isDirty={isDirty}
        lastSaved={lastSaved}
        onBackToLanding={onBackToLanding}
      />
      
      <main className="flex-1 flex flex-col min-h-0">
        {children}
      </main>
    </div>
  );
};