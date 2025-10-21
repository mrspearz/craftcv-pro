import React from 'react';
import { ModernTemplate, ClassicTemplate, CreativeTemplate, MinimalTemplate, ExecutiveTemplate, TechTemplate, FinanceTemplate, ConsultingTemplate } from './templates';
import type { ResumeData, TemplateConfig } from '../types';

interface ResumePreviewProps {
  resumeData: ResumeData;
  selectedTemplate: string;
  templates: TemplateConfig[];
  fontSize?: 'small' | 'medium' | 'large';
}

const templateComponents = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
  tech: TechTemplate,
  finance: FinanceTemplate,
  consulting: ConsultingTemplate,
};

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resumeData,
  selectedTemplate,
  templates,
  fontSize = 'medium',
}) => {
  // Find the selected template config
  const templateConfig = templates.find(t => t.id === selectedTemplate);
  
  if (!selectedTemplate || !templateConfig) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-12 shadow-sm">
        <div className="text-center py-12 text-gray-500">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-700 mb-2">No Template Selected</p>
          <p className="text-sm text-gray-500">
            Please select a template from the dropdown above to see your resume preview.
          </p>
        </div>
      </div>
    );
  }
  
  // Get the template component
  const TemplateComponent = templateComponents[templateConfig.id as keyof typeof templateComponents];
  
  if (!TemplateComponent) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-12 shadow-sm">
        <div className="text-center py-12 text-red-500">
          <p className="text-lg font-medium mb-2">Template Not Available</p>
          <p className="text-sm">
            The selected template "{templateConfig.name}" is not yet implemented.
          </p>
        </div>
      </div>
    );
  }
  
  // Calculate zoom based on font size
  const zoomLevel = fontSize === 'small' ? '0.65' : fontSize === 'large' ? '0.75' : '0.7';
  
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div 
        id="resume-preview-container" 
        className="w-full overflow-auto flex justify-center" 
        style={{ zoom: zoomLevel }}
      >
        <TemplateComponent data={resumeData} config={templateConfig} />
      </div>
    </div>
  );
};