import type { ResumeData, AppState } from '../types';

const STORAGE_KEYS = {
  RESUME_DATA: 'resumeforge_resume_data',
  APP_STATE: 'resumeforge_app_state',
  AUTO_SAVE: 'resumeforge_auto_save',
} as const;

// Default resume data structure with sample data
export const createDefaultResumeData = (): ResumeData => ({
  personalInfo: {
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Innovative software engineer with 5+ years of experience developing scalable web applications and leading cross-functional teams. Passionate about creating user-centric solutions that drive business growth.',
    title: 'Senior Software Engineer',
    profilePicture: '',
    dateOfBirth: '',
    nationality: '',
    drivingLicense: '',
  },
  workExperience: [
    {
      id: 'work-1',
      jobTitle: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: '',
      current: true,
      description: 'Lead development of user-facing features for a SaaS platform serving 100K+ users.',
      achievements: [
        'Led a team of 4 developers to deliver a major product redesign, increasing user engagement by 35%',
        'Implemented automated testing suite, reducing deployment bugs by 60%',
        'Mentored 2 junior developers, helping them advance to mid-level positions'
      ]
    },
    {
      id: 'work-2',
      jobTitle: 'Software Engineer',
      company: 'StartupXYZ',
      location: 'Remote',
      startDate: 'Jun 2020',
      endDate: 'Dec 2021',
      current: false,
      description: 'Developed full-stack web applications using React, Node.js, and PostgreSQL.',
      achievements: [
        'Built and launched 3 major features that increased customer retention by 25%',
        'Optimized database queries, improving application performance by 40%',
        'Collaborated with design team to implement responsive UI components'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: 'Aug 2016',
      endDate: 'May 2020',
      current: false,
      gpa: '3.8/4.0',
      description: 'Relevant coursework: Data Structures, Algorithms, Software Engineering, Database Systems'
    }
  ],
  skills: [
    { id: 'skill-1', name: 'JavaScript', level: 'Expert', category: 'Programming Languages' },
    { id: 'skill-2', name: 'TypeScript', level: 'Advanced', category: 'Programming Languages' },
    { id: 'skill-3', name: 'Python', level: 'Advanced', category: 'Programming Languages' },
    { id: 'skill-4', name: 'React', level: 'Expert', category: 'Frameworks & Libraries' },
    { id: 'skill-5', name: 'Node.js', level: 'Advanced', category: 'Frameworks & Libraries' },
    { id: 'skill-6', name: 'Express.js', level: 'Advanced', category: 'Frameworks & Libraries' },
    { id: 'skill-7', name: 'PostgreSQL', level: 'Advanced', category: 'Databases' },
    { id: 'skill-8', name: 'MongoDB', level: 'Intermediate', category: 'Databases' },
    { id: 'skill-9', name: 'AWS', level: 'Intermediate', category: 'Cloud & DevOps' },
    { id: 'skill-10', name: 'Docker', level: 'Intermediate', category: 'Cloud & DevOps' },
    { id: 'skill-11', name: 'Git', level: 'Expert', category: 'Tools & Technologies' },
    { id: 'skill-12', name: 'Leadership', level: 'Advanced', category: 'Soft Skills' },
    { id: 'skill-13', name: 'Team Collaboration', level: 'Expert', category: 'Soft Skills' }
  ],
  projects: [],
  certifications: [],
  languages: [],
  references: [],
  achievements: [],
  interests: [],
  customSections: [],
  sectionOrder: [
    'personalInfo',
    'workExperience', 
    'education',
    'skills',
    'projects',
    'certifications',
    'languages',
    'customSections'
  ],
});

// Default app state
export const createDefaultAppState = (): AppState => ({
  resumeData: createDefaultResumeData(),
  selectedTemplate: 'modern',
  customizations: {
    colorScheme: 'blue-modern',
    fontPair: 'inter-inter',
    fontSize: 'medium',
    spacing: 'normal',
  },
  ui: {
    showPreview: true,
    editingSection: null,
    isDirty: false,
    lastSaved: null,
  },
});

// Storage operations with error handling
export const storage = {
  // Save resume data to localStorage
  saveResumeData: (data: ResumeData): boolean => {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(STORAGE_KEYS.RESUME_DATA, serialized);
      return true;
    } catch (error) {
      console.error('Failed to save resume data:', error);
      return false;
    }
  },

  // Load resume data from localStorage
  loadResumeData: (): ResumeData => {
    try {
      const serialized = localStorage.getItem(STORAGE_KEYS.RESUME_DATA);
      if (serialized) {
        const parsed = JSON.parse(serialized);
        // Merge with default structure to ensure all fields exist
        return { ...createDefaultResumeData(), ...parsed };
      }
    } catch (error) {
      console.error('Failed to load resume data:', error);
    }
    return createDefaultResumeData();
  },

  // Save full app state
  saveAppState: (state: AppState): boolean => {
    try {
      const stateToSave = {
        ...state,
        ui: {
          ...state.ui,
          lastSaved: new Date(),
          isDirty: false,
        },
      };
      const serialized = JSON.stringify(stateToSave);
      localStorage.setItem(STORAGE_KEYS.APP_STATE, serialized);
      return true;
    } catch (error) {
      console.error('Failed to save app state:', error);
      return false;
    }
  },

  // Load full app state
  loadAppState: (): AppState => {
    try {
      const serialized = localStorage.getItem(STORAGE_KEYS.APP_STATE);
      if (serialized) {
        const parsed = JSON.parse(serialized);
        // Convert lastSaved back to Date object
        if (parsed.ui?.lastSaved) {
          parsed.ui.lastSaved = new Date(parsed.ui.lastSaved);
        }
        // Merge with default structure
        return { ...createDefaultAppState(), ...parsed };
      }
    } catch (error) {
      console.error('Failed to load app state:', error);
    }
    return createDefaultAppState();
  },

  // Enable/disable auto-save
  setAutoSave: (enabled: boolean): void => {
    localStorage.setItem(STORAGE_KEYS.AUTO_SAVE, enabled.toString());
  },

  // Check if auto-save is enabled
  isAutoSaveEnabled: (): boolean => {
    const value = localStorage.getItem(STORAGE_KEYS.AUTO_SAVE);
    return value !== 'false'; // Default to true
  },

  // Clear all stored data
  clearAll: (): boolean => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Failed to clear storage:', error);
      return false;
    }
  },

  // Export data as JSON
  exportData: (): string => {
    const resumeData = storage.loadResumeData();
    const appState = storage.loadAppState();
    
    return JSON.stringify({
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      resumeData,
      preferences: {
        selectedTemplate: appState.selectedTemplate,
        customizations: appState.customizations,
      },
    }, null, 2);
  },

  // Import data from JSON
  importData: (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      
      if (data.resumeData) {
        storage.saveResumeData(data.resumeData);
      }
      
      if (data.preferences) {
        const currentState = storage.loadAppState();
        const newState: AppState = {
          ...currentState,
          selectedTemplate: data.preferences.selectedTemplate || '',
          customizations: {
            ...currentState.customizations,
            ...data.preferences.customizations,
          },
          ui: {
            ...currentState.ui,
            isDirty: true,
          },
        };
        storage.saveAppState(newState);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  },

  // Get storage usage info
  getStorageInfo: () => {
    try {
      let totalSize = 0;
      const usage: Record<string, number> = {};
      
      Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
        const item = localStorage.getItem(storageKey);
        const size = item ? new Blob([item]).size : 0;
        usage[key] = size;
        totalSize += size;
      });

      return {
        total: totalSize,
        usage,
        available: getAvailableStorage(),
      };
    } catch (error) {
      console.error('Failed to get storage info:', error);
      return {
        total: 0,
        usage: {},
        available: 0,
      };
    }
  },

  // Utility to clean up corrupted image data
  cleanupCorruptedData: (): boolean => {
    try {
      const serialized = localStorage.getItem(STORAGE_KEYS.APP_STATE);
      if (!serialized) return false;

      const parsedData = JSON.parse(serialized);
      let hasCorruption = false;

      // Check for corrupted profile picture
      if (parsedData.resumeData?.personalInfo?.profilePicture) {
        const profilePic = parsedData.resumeData.personalInfo.profilePicture;
        if (typeof profilePic === 'string' && profilePic.startsWith('data:image/')) {
          try {
            const base64Data = profilePic.split(',')[1];
            if (!base64Data || base64Data.length === 0) {
              throw new Error('Invalid base64');
            }
            // Test decode
            atob(base64Data);
          } catch (error) {
            console.warn('Removing corrupted profile picture data');
            parsedData.resumeData.personalInfo.profilePicture = '';
            hasCorruption = true;
          }
        }
      }

      if (hasCorruption) {
        localStorage.setItem(STORAGE_KEYS.APP_STATE, JSON.stringify(parsedData));
        console.log('Cleaned up corrupted data from localStorage');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error cleaning up corrupted data:', error);
      return false;
    }
  },
};

// Helper function to estimate available localStorage space
function getAvailableStorage(): number {
  try {
    const testKey = 'test_storage_limit';
    let data = '0';
    let totalSize = 0;
    
    // Try to write increasingly large data until we hit the limit
    while (totalSize < 10 * 1024 * 1024) { // Cap at 10MB test
      try {
        localStorage.setItem(testKey, data);
        totalSize = data.length;
        data += data; // Double the size
      } catch {
        localStorage.removeItem(testKey);
        return totalSize;
      }
    }
    
    localStorage.removeItem(testKey);
    return totalSize;
  } catch {
    return 0;
  }
}

// Auto-save functionality
export class AutoSave {
  private static instance: AutoSave;
  private saveCallback: (() => void) | null = null;
  private timeoutId: number | null = null;
  private readonly SAVE_DELAY = 2000; // 2 seconds

  static getInstance(): AutoSave {
    if (!AutoSave.instance) {
      AutoSave.instance = new AutoSave();
    }
    return AutoSave.instance;
  }

  setSaveCallback(callback: () => void): void {
    this.saveCallback = callback;
  }

  trigger(): void {
    if (!storage.isAutoSaveEnabled() || !this.saveCallback) {
      return;
    }

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = window.setTimeout(() => {
      if (this.saveCallback) {
        this.saveCallback();
      }
    }, this.SAVE_DELAY);
  }

  cancel(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}