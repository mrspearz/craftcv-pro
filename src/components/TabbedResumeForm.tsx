import React, { useState } from 'react';
import { User, Briefcase, GraduationCap, Zap, CheckCircle } from 'lucide-react';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { WorkExperienceForm } from './forms/WorkExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import type { ResumeData } from '../types';

interface TabbedResumeFormProps {
  resumeData: ResumeData;
  onUpdatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  onAddWorkExperience: (experience: Omit<ResumeData['workExperience'][0], 'id'>) => void;
  onUpdateWorkExperience: (id: string, experience: Partial<ResumeData['workExperience'][0]>) => void;
  onDeleteWorkExperience: (id: string) => void;
  onAddEducation: (education: Omit<ResumeData['education'][0], 'id'>) => void;
  onUpdateEducation: (id: string, education: Partial<ResumeData['education'][0]>) => void;
  onDeleteEducation: (id: string) => void;
  onAddSkill: (skill: Omit<ResumeData['skills'][0], 'id'>) => void;
  onUpdateSkill: (id: string, skill: Partial<ResumeData['skills'][0]>) => void;
  onDeleteSkill: (id: string) => void;
}

type TabId = 'personal' | 'experience' | 'education' | 'skills';

interface Tab {
  id: TabId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType<any>;
  isComplete: (data: ResumeData) => boolean;
}

export const TabbedResumeForm: React.FC<TabbedResumeFormProps> = ({
  resumeData,
  onUpdatePersonalInfo,
  onAddWorkExperience,
  onUpdateWorkExperience,
  onDeleteWorkExperience,
  onAddEducation,
  onUpdateEducation,
  onDeleteEducation,
  onAddSkill,
  onUpdateSkill,
  onDeleteSkill,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>('personal');

  const tabs: Tab[] = [
    {
      id: 'personal',
      name: 'Personal',
      icon: User,
      component: PersonalInfoForm,
      isComplete: (data) => 
        Boolean(data.personalInfo.firstName && 
               data.personalInfo.lastName && 
               data.personalInfo.email && 
               data.personalInfo.phone && 
               data.personalInfo.title && 
               data.personalInfo.summary),
    },
    {
      id: 'experience',
      name: 'Experience',
      icon: Briefcase,
      component: WorkExperienceForm,
      isComplete: (data) => data.workExperience.length > 0,
    },
    {
      id: 'education',
      name: 'Education',
      icon: GraduationCap,
      component: EducationForm,
      isComplete: (data) => data.education.length > 0,
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: Zap,
      component: SkillsForm,
      isComplete: (data) => data.skills.length > 0,
    },
  ];

  const getTabProps = (tabId: TabId) => {
    switch (tabId) {
      case 'personal':
        return {
          personalInfo: resumeData.personalInfo,
          onUpdate: onUpdatePersonalInfo,
        };
      case 'experience':
        return {
          workExperience: resumeData.workExperience,
          onAdd: onAddWorkExperience,
          onUpdate: onUpdateWorkExperience,
          onDelete: onDeleteWorkExperience,
        };
      case 'education':
        return {
          education: resumeData.education,
          onAdd: onAddEducation,
          onUpdate: onUpdateEducation,
          onDelete: onDeleteEducation,
        };
      case 'skills':
        return {
          skills: resumeData.skills,
          onAdd: onAddSkill,
          onUpdate: onUpdateSkill,
          onDelete: onDeleteSkill,
        };
      default:
        return {};
    }
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab)!;
  const ActiveComponent = activeTabData.component;
  const componentProps = getTabProps(activeTab);

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
        <nav className="grid grid-cols-2 sm:grid-cols-4 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isComplete = tab.isComplete(resumeData);
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 relative
                  ${isActive 
                    ? 'bg-primary-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:block">{tab.name}</span>
                {isComplete && (
                  <CheckCircle className={`w-3 h-3 ${isActive ? 'text-green-200' : 'text-green-500'}`} />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Compact Progress Indicator */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-700">Progress</span>
          <span className="text-xs text-gray-500">
            {tabs.filter(tab => tab.isComplete(resumeData)).length}/{tabs.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-primary-600 h-1.5 rounded-full transition-all duration-300"
            style={{ 
              width: `${(tabs.filter(tab => tab.isComplete(resumeData)).length / tabs.length) * 100}%` 
            }}
          ></div>
        </div>
      </div>

      {/* Active Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6">
          <ActiveComponent {...componentProps} />
        </div>
      </div>

      {/* Compact Navigation Buttons */}
      <div className="flex justify-between items-center bg-white rounded-lg shadow-sm border border-gray-200 p-3">
        <button
          onClick={() => {
            const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
            if (currentIndex > 0) {
              setActiveTab(tabs[currentIndex - 1].id);
            }
          }}
          disabled={activeTab === 'personal'}
          className="btn-secondary text-sm py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-3 h-3 rounded-full transition-colors ${
                tab.id === activeTab 
                  ? 'bg-primary-600' 
                  : tab.isComplete(resumeData)
                    ? 'bg-green-500'
                    : 'bg-gray-300'
              }`}
              title={tab.name}
            />
          ))}
        </div>

        <button
          onClick={() => {
            const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
            if (currentIndex < tabs.length - 1) {
              setActiveTab(tabs[currentIndex + 1].id);
            }
          }}
          disabled={activeTab === 'skills'}
          className="btn-primary text-sm py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};