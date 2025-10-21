// Core Resume Data Types
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  title: string;
  profilePicture?: string;
  dateOfBirth?: string;
  nationality?: string;
  drivingLicense?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate?: string;
  endDate?: string;
  current?: boolean;
  url?: string;
  github?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Basic' | 'Conversational' | 'Proficient' | 'Fluent' | 'Native';
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  issuer?: string;
}

export interface Interest {
  id: string;
  name: string;
  category: string;
}

export interface CustomSection {
  id: string;
  title: string;
  type: 'text' | 'list' | 'achievements';
  content: string | string[];
  order: number;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  references: Reference[];
  achievements: Achievement[];
  interests: Interest[];
  customSections: CustomSection[];
  sectionOrder: string[];
}

// Template and Design Types
export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'modern' | 'classic' | 'creative' | 'minimal' | 'executive';
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
    text: string;
    background: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  layout: {
    columns: 1 | 2;
    sidebar: boolean;
    headerStyle: 'traditional' | 'modern' | 'minimal';
  };
}

export interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent?: string;
  text: string;
  background: string;
}

export interface FontPair {
  id: string;
  name: string;
  heading: string;
  body: string;
  preview: string;
}

// Component Props Types
export interface ResumeFormProps {
  resumeData: ResumeData;
  updateResumeData: (data: Partial<ResumeData>) => void;
}

export interface PreviewProps {
  resumeData: ResumeData;
  template: TemplateConfig;
  className?: string;
}

export interface TemplateProps {
  data: ResumeData;
  config: TemplateConfig;
}

// Form Component Types
export interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel' | 'url' | 'date';
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export interface TextAreaProps extends Omit<FormFieldProps, 'type'> {
  rows?: number;
  maxLength?: number;
}

export interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

// Drag and Drop Types
export interface DragEndEvent {
  active: {
    id: string;
  };
  over: {
    id: string;
  } | null;
}

export interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  handle?: boolean;
}

// PDF Export Types
export interface PDFExportOptions {
  format: 'a4' | 'letter';
  orientation: 'portrait' | 'landscape';
  quality: 'draft' | 'standard' | 'high';
  fileName?: string;
}

// Application State Types
export interface AppState {
  resumeData: ResumeData;
  selectedTemplate: string;
  customizations: {
    colorScheme: string;
    fontPair: string;
    fontSize: 'small' | 'medium' | 'large';
    customColors?: ColorScheme;
    spacing: 'compact' | 'normal' | 'relaxed';
  };
  ui: {
    showPreview: boolean;
    editingSection: string | null;
    isDirty: boolean;
    lastSaved: Date | null;
  };
}

export interface ResumeContextType {
  state: AppState;
  actions: {
    updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
    addWorkExperience: (experience: Omit<WorkExperience, 'id'>) => void;
    updateWorkExperience: (id: string, experience: Partial<WorkExperience>) => void;
    deleteWorkExperience: (id: string) => void;
    reorderWorkExperience: (oldIndex: number, newIndex: number) => void;
    
    addEducation: (education: Omit<Education, 'id'>) => void;
    updateEducation: (id: string, education: Partial<Education>) => void;
    deleteEducation: (id: string) => void;
    reorderEducation: (oldIndex: number, newIndex: number) => void;
    
    addSkill: (skill: Omit<Skill, 'id'>) => void;
    updateSkill: (id: string, skill: Partial<Skill>) => void;
    deleteSkill: (id: string) => void;
    reorderSkills: (oldIndex: number, newIndex: number) => void;
    
    addProject: (project: Omit<Project, 'id'>) => void;
    updateProject: (id: string, project: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    reorderProjects: (oldIndex: number, newIndex: number) => void;
    
    addCertification: (certification: Omit<Certification, 'id'>) => void;
    updateCertification: (id: string, certification: Partial<Certification>) => void;
    deleteCertification: (id: string) => void;
    
    addLanguage: (language: Omit<Language, 'id'>) => void;
    updateLanguage: (id: string, language: Partial<Language>) => void;
    deleteLanguage: (id: string) => void;
    
    addCustomSection: (section: Omit<CustomSection, 'id'>) => void;
    updateCustomSection: (id: string, section: Partial<CustomSection>) => void;
    deleteCustomSection: (id: string) => void;
    reorderSections: (oldIndex: number, newIndex: number) => void;
    
    selectTemplate: (templateId: string) => void;
    updateCustomizations: (customizations: Partial<AppState['customizations']>) => void;
    
    setShowPreview: (show: boolean) => void;
    setEditingSection: (section: string | null) => void;
    saveResume: () => void;
    loadResume: (resumeId?: string) => void;
    exportToPDF: (options?: PDFExportOptions) => Promise<void>;
  };
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Constants and Enums
export const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;
export const LANGUAGE_PROFICIENCY = ['Basic', 'Conversational', 'Proficient', 'Fluent', 'Native'] as const;
export const TEMPLATE_CATEGORIES = ['modern', 'classic', 'creative', 'minimal', 'executive'] as const;
export const PDF_FORMATS = ['a4', 'letter'] as const;
export const PDF_ORIENTATIONS = ['portrait', 'landscape'] as const;
export const SPACING_OPTIONS = ['compact', 'normal', 'relaxed'] as const;

export type SkillLevel = typeof SKILL_LEVELS[number];
export type LanguageProficiency = typeof LANGUAGE_PROFICIENCY[number];
export type TemplateCategory = typeof TEMPLATE_CATEGORIES[number];
export type PDFFormat = typeof PDF_FORMATS[number];
export type PDFOrientation = typeof PDF_ORIENTATIONS[number];
export type SpacingOption = typeof SPACING_OPTIONS[number];