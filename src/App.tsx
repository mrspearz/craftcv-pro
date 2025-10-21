import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResumeProvider, useResume } from './contexts/ResumeContext';
import { Layout } from './components/Layout';
import { ResumePreview } from './components/ResumePreview';
import { CollapsibleResumeForm } from './components/CollapsibleResumeForm';
import { StyleCustomizer } from './components/StyleCustomizer';
import { LandingPage } from './components/LandingPage';
import { DevTools } from './components/DevTools';
import type { ColorScheme, FontPair } from './components/StyleCustomizer';
import type { TemplateConfig } from './types';

// Mock templates for now - we'll create real ones soon
const mockTemplates: TemplateConfig[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean and contemporary design perfect for tech professionals',
    preview: '/previews/modern.jpg',
    category: 'modern',
    colors: {
      primary: '#4f46e5',
      secondary: '#4338ca',
      text: '#000000',
      background: '#ffffff',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    layout: {
      columns: 2,
      sidebar: true,
      headerStyle: 'modern',
    },
  },
  {
    id: 'classic',
    name: 'Classic Executive',
    description: 'Traditional and elegant design for executive positions',
    preview: '/previews/classic.jpg',
    category: 'classic',
    colors: {
      primary: '#7c3aed',
      secondary: '#6d28d9',
      text: '#000000',
      background: '#ffffff',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
    },
    layout: {
      columns: 1,
      sidebar: false,
      headerStyle: 'traditional',
    },
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    description: 'Bold and creative design for creative professionals',
    preview: '/previews/creative.jpg',
    category: 'creative',
    colors: {
      primary: '#d946ef',
      secondary: '#a855f7',
      text: '#000000',
      background: '#ffffff',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
    },
    layout: {
      columns: 2,
      sidebar: true,
      headerStyle: 'modern',
    },
  },
  {
    id: 'minimal',
    name: 'Minimal Executive',
    description: 'Ultra-clean minimalist design with maximum white space',
    preview: '/previews/minimal.jpg',
    category: 'minimal',
    colors: {
      primary: '#2d3748',
      secondary: '#718096',
      text: '#000000',
      background: '#ffffff',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    layout: {
      columns: 1,
      sidebar: false,
      headerStyle: 'minimal',
    },
  },
  {
    id: 'executive',
    name: 'Corporate Executive',
    description: 'Sophisticated design for C-level executives and senior managers',
    preview: '/previews/executive.jpg',
    category: 'executive',
    colors: {
      primary: '#1a365d',
      secondary: '#2d3748',
      text: '#000000',
      background: '#ffffff',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
    },
    layout: {
      columns: 1,
      sidebar: false,
      headerStyle: 'traditional',
    },
  },
  {
    id: 'tech',
    name: 'Tech Professional',
    description: 'Modern design optimized for software engineers and tech roles',
    preview: '/previews/tech.jpg',
    category: 'modern',
    colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      text: '#000000',
      background: '#ffffff',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    layout: {
      columns: 1,
      sidebar: false,
      headerStyle: 'modern',
    },
  },
  {
    id: 'finance',
    name: 'Finance Executive',
    description: 'Conservative professional design for banking and finance',
    preview: '/previews/finance.jpg',
    category: 'executive',
    colors: {
      primary: '#374151',
      secondary: '#6b7280',
      text: '#000000',
      background: '#ffffff',
    },
    fonts: {
      heading: 'Times New Roman',
      body: 'Times New Roman',
    },
    layout: {
      columns: 1,
      sidebar: false,
      headerStyle: 'traditional',
    },
  },
  {
    id: 'consulting',
    name: 'Management Consulting',
    description: 'Clean, structured design perfect for consulting professionals',
    preview: '/previews/consulting.jpg',
    category: 'executive',
    colors: {
      primary: '#111827',
      secondary: '#4b5563',
      text: '#000000',
      background: '#ffffff',
    },
    fonts: {
      heading: 'Times New Roman',
      body: 'Times New Roman',
    },
    layout: {
      columns: 1,
      sidebar: false,
      headerStyle: 'traditional',
    },
  },
];

function AppContent() {
  const navigate = useNavigate();
  const { state, actions } = useResume();
  const [currentView, setCurrentView] = useState<'landing' | 'builder'>('landing');
  const [showDevTools, setShowDevTools] = useState(false);
  
  // Check if user is signed in and redirect to builder
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const auth = (window as any).useAuth?.();
        if (auth?.user) {
          setCurrentView('builder');
        }
      } catch (e) {
        // Not in auth context
      }
    };
    checkAuth();
  }, []);

  // Add keyboard shortcut to toggle dev tools
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        setShowDevTools(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Handle navigation from landing page to resume builder
  const handleGetStarted = () => {
    setCurrentView('builder');
  };
  
  // Handle navigation back to landing page (optional)
  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  // Show landing page if current view is landing
  if (currentView === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  const handleTemplateChange = (templateId: string) => {
    actions.selectTemplate(templateId);
  };

  const handleExportPDF = async () => {
    await actions.exportToPDF();
  };

  const handleTogglePreview = () => {
    actions.setShowPreview(!state.ui.showPreview);
  };

  const handleSave = () => {
    actions.saveResume();
  };

  const handleColorChange = (scheme: ColorScheme) => {
    actions.updateCustomizations({ colorScheme: scheme.id });
    // Update template colors dynamically
    const currentTemplate = mockTemplates.find(t => t.id === state.selectedTemplate);
    if (currentTemplate) {
      currentTemplate.colors = {
        primary: scheme.primary,
        secondary: scheme.secondary,
        accent: scheme.accent,
        text: scheme.text,
        background: scheme.background,
      };
    }
  };

  const handleFontChange = (fontPair: FontPair) => {
    actions.updateCustomizations({ fontPair: fontPair.id });
    // Update template fonts dynamically
    const currentTemplate = mockTemplates.find(t => t.id === state.selectedTemplate);
    if (currentTemplate) {
      currentTemplate.fonts = {
        heading: fontPair.heading,
        body: fontPair.body,
      };
    }
  };

  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    actions.updateCustomizations({ fontSize: size });
  };

  return (
    <Layout
      selectedTemplate={state.selectedTemplate}
      templates={mockTemplates}
      onTemplateChange={handleTemplateChange}
      onExportPDF={handleExportPDF}
      showPreview={state.ui.showPreview}
      onTogglePreview={handleTogglePreview}
      onSave={handleSave}
      isDirty={state.ui.isDirty}
      lastSaved={state.ui.lastSaved}
      onBackToLanding={handleBackToLanding}
    >
      {/* Mobile Layout - Stacked */}
      <div className="flex flex-col lg:flex-row h-full">
        {/* Form Panel - Full width on mobile, half on desktop */}
        <div className="flex-1 lg:flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
            {/* Resume Form */}
            <CollapsibleResumeForm
              resumeData={state.resumeData}
              onUpdatePersonalInfo={actions.updatePersonalInfo}
              onAddWorkExperience={actions.addWorkExperience}
              onUpdateWorkExperience={actions.updateWorkExperience}
              onDeleteWorkExperience={actions.deleteWorkExperience}
              onAddEducation={actions.addEducation}
              onUpdateEducation={actions.updateEducation}
              onDeleteEducation={actions.deleteEducation}
              onAddSkill={actions.addSkill}
              onUpdateSkill={actions.updateSkill}
              onDeleteSkill={actions.deleteSkill}
            />

            {/* Style Customizer */}
            <div className="bg-gradient-to-br from-slate-800/60 via-slate-900/50 to-purple-950/40 backdrop-blur-xl rounded-2xl border border-violet-500/20 p-4 sm:p-6 animate-float-gentle">
              <StyleCustomizer
                selectedColor={state.customizations.colorScheme}
                selectedFont={state.customizations.fontPair}
                fontSize={state.customizations.fontSize || 'medium'}
                onColorChange={handleColorChange}
                onFontChange={handleFontChange}
                onFontSizeChange={handleFontSizeChange}
              />
            </div>
          </div>
        </div>

        {/* Preview Panel - Modal on mobile, sidebar on desktop */}
        {state.ui.showPreview && (
          <>
            {/* Mobile Preview Modal */}
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl w-full max-w-2xl h-full max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-lg font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent flex items-center">
                    👁️ Live Preview
                  </h2>
                  <button
                    onClick={handleTogglePreview}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    title="Close Preview"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <ResumePreview
                    resumeData={state.resumeData}
                    selectedTemplate={state.selectedTemplate}
                    templates={mockTemplates}
                    fontSize={state.customizations.fontSize || 'medium'}
                  />
                </div>
              </div>
            </div>
            
            {/* Desktop Preview Sidebar */}
            <div className="hidden lg:block w-1/2 border-l border-violet-500/20 bg-slate-950 overflow-y-auto">
              <div className="sticky top-0 bg-slate-950/90 backdrop-blur-sm border-b border-violet-500/20 px-6 py-4 z-10">
                <h2 className="text-base font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent flex items-center">
                  👁️ Live Preview
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-1">See your changes in real-time</p>
              </div>
              <div className="p-6">
                <ResumePreview
                  resumeData={state.resumeData}
                  selectedTemplate={state.selectedTemplate}
                  templates={mockTemplates}
                  fontSize={state.customizations.fontSize || 'medium'}
                />
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Dev Tools - only shown with Ctrl+Shift+D */}
      <DevTools isVisible={showDevTools} />
    </Layout>
  );
}

function App() {
  return (
    <ResumeProvider>
      <AppContent />
    </ResumeProvider>
  );
}

export default App;
