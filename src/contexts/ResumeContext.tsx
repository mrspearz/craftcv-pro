import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { exportToPDFAuto as exportPreviewToPDF, exportToPDFPrint, generatePDFFilename } from '../utils/pdfExport';
import type { 
  ResumeContextType, 
  AppState, 
  PersonalInfo, 
  WorkExperience, 
  Education, 
  Skill, 
  Project, 
  Certification, 
  Language, 
  CustomSection
} from '../types';
import { storage, AutoSave, createDefaultAppState } from '../utils/storage';
import { generateId } from '../utils/helpers';

// Action types
type Action =
  | { type: 'LOAD_STATE'; payload: AppState }
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'ADD_WORK_EXPERIENCE'; payload: Omit<WorkExperience, 'id'> }
  | { type: 'UPDATE_WORK_EXPERIENCE'; payload: { id: string; data: Partial<WorkExperience> } }
  | { type: 'DELETE_WORK_EXPERIENCE'; payload: string }
  | { type: 'REORDER_WORK_EXPERIENCE'; payload: { oldIndex: number; newIndex: number } }
  | { type: 'ADD_EDUCATION'; payload: Omit<Education, 'id'> }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'REORDER_EDUCATION'; payload: { oldIndex: number; newIndex: number } }
  | { type: 'ADD_SKILL'; payload: Omit<Skill, 'id'> }
  | { type: 'UPDATE_SKILL'; payload: { id: string; data: Partial<Skill> } }
  | { type: 'DELETE_SKILL'; payload: string }
  | { type: 'REORDER_SKILLS'; payload: { oldIndex: number; newIndex: number } }
  | { type: 'ADD_PROJECT'; payload: Omit<Project, 'id'> }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; data: Partial<Project> } }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'REORDER_PROJECTS'; payload: { oldIndex: number; newIndex: number } }
  | { type: 'ADD_CERTIFICATION'; payload: Omit<Certification, 'id'> }
  | { type: 'UPDATE_CERTIFICATION'; payload: { id: string; data: Partial<Certification> } }
  | { type: 'DELETE_CERTIFICATION'; payload: string }
  | { type: 'ADD_LANGUAGE'; payload: Omit<Language, 'id'> }
  | { type: 'UPDATE_LANGUAGE'; payload: { id: string; data: Partial<Language> } }
  | { type: 'DELETE_LANGUAGE'; payload: string }
  | { type: 'ADD_CUSTOM_SECTION'; payload: Omit<CustomSection, 'id'> }
  | { type: 'UPDATE_CUSTOM_SECTION'; payload: { id: string; data: Partial<CustomSection> } }
  | { type: 'DELETE_CUSTOM_SECTION'; payload: string }
  | { type: 'REORDER_SECTIONS'; payload: { oldIndex: number; newIndex: number } }
  | { type: 'SELECT_TEMPLATE'; payload: string }
  | { type: 'UPDATE_CUSTOMIZATIONS'; payload: Partial<AppState['customizations']> }
  | { type: 'SET_SHOW_PREVIEW'; payload: boolean }
  | { type: 'SET_EDITING_SECTION'; payload: string | null }
  | { type: 'MARK_SAVED' }
  | { type: 'MARK_DIRTY' };

// Reducer function
function resumeReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;

    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          personalInfo: {
            ...state.resumeData.personalInfo,
            ...action.payload,
          },
        },
        ui: { ...state.ui, isDirty: true },
      };

    case 'ADD_WORK_EXPERIENCE':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          workExperience: [
            ...state.resumeData.workExperience,
            { ...action.payload, id: generateId() },
          ],
        },
        ui: { ...state.ui, isDirty: true },
      };

    case 'UPDATE_WORK_EXPERIENCE':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          workExperience: state.resumeData.workExperience.map(item =>
            item.id === action.payload.id 
              ? { ...item, ...action.payload.data }
              : item
          ),
        },
        ui: { ...state.ui, isDirty: true },
      };

    case 'DELETE_WORK_EXPERIENCE':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          workExperience: state.resumeData.workExperience.filter(
            item => item.id !== action.payload
          ),
        },
        ui: { ...state.ui, isDirty: true },
      };

    case 'REORDER_WORK_EXPERIENCE': {
      const { oldIndex, newIndex } = action.payload;
      const items = [...state.resumeData.workExperience];
      const [movedItem] = items.splice(oldIndex, 1);
      items.splice(newIndex, 0, movedItem);
      
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          workExperience: items,
        },
        ui: { ...state.ui, isDirty: true },
      };
    }

    case 'ADD_EDUCATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          education: [
            ...state.resumeData.education,
            { ...action.payload, id: generateId() },
          ],
        },
        ui: { ...state.ui, isDirty: true },
      };

    case 'UPDATE_EDUCATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          education: state.resumeData.education.map(item =>
            item.id === action.payload.id 
              ? { ...item, ...action.payload.data }
              : item
          ),
        },
        ui: { ...state.ui, isDirty: true },
      };

    case 'DELETE_EDUCATION':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          education: state.resumeData.education.filter(
            item => item.id !== action.payload
          ),
        },
        ui: { ...state.ui, isDirty: true },
      };

    case 'REORDER_EDUCATION': {
      const { oldIndex, newIndex } = action.payload;
      const items = [...state.resumeData.education];
      const [movedItem] = items.splice(oldIndex, 1);
      items.splice(newIndex, 0, movedItem);
      
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          education: items,
        },
        ui: { ...state.ui, isDirty: true },
      };
    }

    case 'ADD_SKILL':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          skills: [
            ...state.resumeData.skills,
            { ...action.payload, id: generateId() },
          ],
        },
        ui: { ...state.ui, isDirty: true },
      };

    case 'UPDATE_SKILL':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          skills: state.resumeData.skills.map(item =>
            item.id === action.payload.id 
              ? { ...item, ...action.payload.data }
              : item
          ),
        },
        ui: { ...state.ui, isDirty: true },
      };

    case 'DELETE_SKILL':
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          skills: state.resumeData.skills.filter(
            item => item.id !== action.payload
          ),
        },
        ui: { ...state.ui, isDirty: true },
      };

    case 'REORDER_SKILLS': {
      const { oldIndex, newIndex } = action.payload;
      const items = [...state.resumeData.skills];
      const [movedItem] = items.splice(oldIndex, 1);
      items.splice(newIndex, 0, movedItem);
      
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          skills: items,
        },
        ui: { ...state.ui, isDirty: true },
      };
    }

    // Similar patterns for projects, certifications, languages, and custom sections
    // (Implementation would follow the same pattern as above)

    case 'SELECT_TEMPLATE':
      return {
        ...state,
        selectedTemplate: action.payload,
        ui: { ...state.ui, isDirty: true },
      };

    case 'UPDATE_CUSTOMIZATIONS':
      return {
        ...state,
        customizations: {
          ...state.customizations,
          ...action.payload,
        },
        ui: { ...state.ui, isDirty: true },
      };

    case 'SET_SHOW_PREVIEW':
      return {
        ...state,
        ui: { ...state.ui, showPreview: action.payload },
      };

    case 'SET_EDITING_SECTION':
      return {
        ...state,
        ui: { ...state.ui, editingSection: action.payload },
      };

    case 'MARK_SAVED':
      return {
        ...state,
        ui: { 
          ...state.ui, 
          isDirty: false, 
          lastSaved: new Date() 
        },
      };

    case 'MARK_DIRTY':
      return {
        ...state,
        ui: { ...state.ui, isDirty: true },
      };

    default:
      return state;
  }
}

// Create context
const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Provider component
interface ResumeProviderProps {
  children: React.ReactNode;
}

export const ResumeProvider: React.FC<ResumeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, createDefaultAppState());
  const autoSave = AutoSave.getInstance();

  // Load initial state from localStorage
  useEffect(() => {
    // First, clean up any corrupted data
    const wasCorrupted = storage.cleanupCorruptedData();
    if (wasCorrupted) {
      console.log('Automatically cleaned up corrupted image data');
    }
    
    const savedState = storage.loadAppState();
    dispatch({ type: 'LOAD_STATE', payload: savedState });
  }, []);

  // Set up auto-save
  useEffect(() => {
    const handleSave = () => {
      if (state.ui.isDirty) {
        storage.saveAppState(state);
        dispatch({ type: 'MARK_SAVED' });
      }
    };

    autoSave.setSaveCallback(handleSave);
    
    return () => {
      autoSave.cancel();
    };
  }, [state, autoSave]);

  // Trigger auto-save when state changes
  useEffect(() => {
    if (state.ui.isDirty) {
      autoSave.trigger();
    }
  }, [state.ui.isDirty, autoSave]);

  // Action creators
  const actions: ResumeContextType['actions'] = {
    updatePersonalInfo: (info) => {
      dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: info });
    },

    addWorkExperience: (experience) => {
      dispatch({ type: 'ADD_WORK_EXPERIENCE', payload: experience });
    },

    updateWorkExperience: (id, experience) => {
      dispatch({ type: 'UPDATE_WORK_EXPERIENCE', payload: { id, data: experience } });
    },

    deleteWorkExperience: (id) => {
      dispatch({ type: 'DELETE_WORK_EXPERIENCE', payload: id });
    },

    reorderWorkExperience: (oldIndex, newIndex) => {
      dispatch({ type: 'REORDER_WORK_EXPERIENCE', payload: { oldIndex, newIndex } });
    },

    addEducation: (education) => {
      dispatch({ type: 'ADD_EDUCATION', payload: education });
    },

    updateEducation: (id, education) => {
      dispatch({ type: 'UPDATE_EDUCATION', payload: { id, data: education } });
    },

    deleteEducation: (id) => {
      dispatch({ type: 'DELETE_EDUCATION', payload: id });
    },

    reorderEducation: (oldIndex, newIndex) => {
      dispatch({ type: 'REORDER_EDUCATION', payload: { oldIndex, newIndex } });
    },

    addSkill: (skill) => {
      dispatch({ type: 'ADD_SKILL', payload: skill });
    },

    updateSkill: (id, skill) => {
      dispatch({ type: 'UPDATE_SKILL', payload: { id, data: skill } });
    },

    deleteSkill: (id) => {
      dispatch({ type: 'DELETE_SKILL', payload: id });
    },

    reorderSkills: (oldIndex, newIndex) => {
      dispatch({ type: 'REORDER_SKILLS', payload: { oldIndex, newIndex } });
    },

    // Stub implementations for other actions (would be similar to above)
    addProject: (_project) => {
      console.log('addProject not yet implemented');
    },
    updateProject: (_id, _project) => {
      console.log('updateProject not yet implemented');
    },
    deleteProject: (_id) => {
      console.log('deleteProject not yet implemented');
    },
    reorderProjects: (_oldIndex, _newIndex) => {
      console.log('reorderProjects not yet implemented');
    },

    addCertification: (_certification) => {
      console.log('addCertification not yet implemented');
    },
    updateCertification: (_id, _certification) => {
      console.log('updateCertification not yet implemented');
    },
    deleteCertification: (_id) => {
      console.log('deleteCertification not yet implemented');
    },

    addLanguage: (_language) => {
      console.log('addLanguage not yet implemented');
    },
    updateLanguage: (_id, _language) => {
      console.log('updateLanguage not yet implemented');
    },
    deleteLanguage: (_id) => {
      console.log('deleteLanguage not yet implemented');
    },

    addCustomSection: (_section) => {
      console.log('addCustomSection not yet implemented');
    },
    updateCustomSection: (_id, _section) => {
      console.log('updateCustomSection not yet implemented');
    },
    deleteCustomSection: (_id) => {
      console.log('deleteCustomSection not yet implemented');
    },
    reorderSections: (_oldIndex, _newIndex) => {
      console.log('reorderSections not yet implemented');
    },

    selectTemplate: (templateId) => {
      dispatch({ type: 'SELECT_TEMPLATE', payload: templateId });
    },

    updateCustomizations: (customizations) => {
      dispatch({ type: 'UPDATE_CUSTOMIZATIONS', payload: customizations });
    },

    setShowPreview: (show) => {
      dispatch({ type: 'SET_SHOW_PREVIEW', payload: show });
    },

    setEditingSection: (section) => {
      dispatch({ type: 'SET_EDITING_SECTION', payload: section });
    },

    saveResume: () => {
      storage.saveAppState(state);
      dispatch({ type: 'MARK_SAVED' });
    },

    loadResume: (_resumeId) => {
      const savedState = storage.loadAppState();
      dispatch({ type: 'LOAD_STATE', payload: savedState });
    },

    exportToPDF: async () => {
      try {
        console.log('Starting PDF export...');

        // Find the resume preview container
        const container = document.getElementById('resume-preview-container');
        if (!container) {
          alert('Please make sure the preview panel is visible before downloading PDF.');
          console.error('Resume preview container not found');
          return;
        }
        
        // The actual resume node (first child inside the zoomed container)
        const element = container.firstElementChild as HTMLElement | null;
        if (!element) {
          alert('Resume template not found. Please select a template first.');
          console.error('Resume template element not found');
          return;
        }

        const filename = generatePDFFilename(
          state.resumeData.personalInfo.firstName || 'Resume',
          state.resumeData.personalInfo.lastName || 'CV'
        );

        try {
          await exportPreviewToPDF(element, { filename, quality: 2 });
          console.log('PDF export (auto) completed successfully');
        } catch (e) {
          console.warn('Auto export failed, falling back to print engine...', e);
          await exportToPDFPrint(element, {});
          console.log('PDF export (print fallback) completed');
        }
      } catch (error) {
        console.error('Error in exportToPDF action:', error);
        alert(`Failed to export PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  };

  return (
    <ResumeContext.Provider value={{ state, actions }}>
      {children}
    </ResumeContext.Provider>
  );
};

// Custom hook to use the context
export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};