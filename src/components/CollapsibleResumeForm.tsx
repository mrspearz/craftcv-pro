import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, Briefcase, GraduationCap, Zap, Check } from 'lucide-react';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { WorkExperienceForm } from './forms/WorkExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import type { ResumeData } from '../types';

interface CollapsibleResumeFormProps {
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

type SectionId = 'personal' | 'experience' | 'education' | 'skills';

interface Section {
  id: SectionId;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  isComplete: (data: ResumeData) => boolean;
}

export const CollapsibleResumeForm: React.FC<CollapsibleResumeFormProps> = (props) => {
  const {
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
  } = props;

  const [expandedSections, setExpandedSections] = useState<Set<SectionId>>(new Set(['personal']));

  const sections: Section[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: User,
      isComplete: (data) => 
        Boolean(data.personalInfo.firstName && 
               data.personalInfo.lastName && 
               data.personalInfo.email && 
               data.personalInfo.phone && 
               data.personalInfo.title),
    },
    {
      id: 'experience',
      title: 'Work Experience',
      icon: Briefcase,
      isComplete: (data) => data.workExperience.length > 0,
    },
    {
      id: 'education',
      title: 'Education',
      icon: GraduationCap,
      isComplete: (data) => data.education.length > 0,
    },
    {
      id: 'skills',
      title: 'Skills & Expertise',
      icon: Zap,
      isComplete: (data) => data.skills.length > 0,
    },
  ];

  const toggleSection = (sectionId: SectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const renderSectionContent = (sectionId: SectionId) => {
    switch (sectionId) {
      case 'personal':
        return (
          <div className="px-3 sm:px-6 pt-3 pb-5">
            <PersonalInfoForm
              personalInfo={resumeData.personalInfo}
              onUpdate={onUpdatePersonalInfo}
            />
          </div>
        );
      case 'experience':
        return (
          <div className="px-3 sm:px-6 pt-3 pb-5">
            <WorkExperienceForm
              workExperience={resumeData.workExperience}
              onAdd={onAddWorkExperience}
              onUpdate={onUpdateWorkExperience}
              onDelete={onDeleteWorkExperience}
            />
          </div>
        );
      case 'education':
        return (
          <div className="px-3 sm:px-6 pt-3 pb-5">
            <EducationForm
              education={resumeData.education}
              onAdd={onAddEducation}
              onUpdate={onUpdateEducation}
              onDelete={onDeleteEducation}
            />
          </div>
        );
      case 'skills':
        return (
          <div className="px-3 sm:px-6 pt-3 pb-5">
            <SkillsForm
              skills={resumeData.skills}
              onAdd={onAddSkill}
              onUpdate={onUpdateSkill}
              onDelete={onDeleteSkill}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const completedCount = sections.filter(s => s.isComplete(resumeData)).length;
  const completionPercentage = (completedCount / sections.length) * 100;

  return (
    <div className="space-y-4">
      {/* Premium Progress Bar */}
      <div className="bg-gradient-to-br from-slate-800/60 via-slate-900/50 to-purple-950/40 backdrop-blur-xl rounded-2xl border border-violet-500/20 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-violet-200">Resume Progress</span>
          <span className="text-sm text-slate-300">{completedCount}/{sections.length}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Premium Collapsible Sections */}
      <div className="space-y-3">
        {sections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSections.has(section.id);
          const isComplete = section.isComplete(resumeData);

          return (
            <div
              key={section.id}
              className="bg-gradient-to-br from-slate-800/60 via-slate-900/50 to-purple-950/40 backdrop-blur-xl rounded-2xl border border-violet-500/20 hover:border-violet-400/40 transition-all duration-500 overflow-hidden"
            >
              {/* Premium Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between hover:bg-violet-500/5 transition-all duration-300 touch-manipulation"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isComplete 
                      ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white'
                      : 'bg-slate-700 text-slate-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-base font-semibold text-white block">{section.title}</span>
                    {isComplete && (
                      <span className="text-xs text-violet-300 font-medium">Completed</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {isComplete && (
                    <div className="w-6 h-6 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 transition-transform duration-300" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 transition-transform duration-300" />
                  )}
                </div>
              </button>

              {/* Premium Section Content */}
              {isExpanded && (
                <div className="border-t border-violet-500/20">
                  {renderSectionContent(section.id)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Premium Quick Actions */}
      <div className="bg-gradient-to-br from-slate-800/60 via-slate-900/50 to-purple-950/40 backdrop-blur-xl rounded-2xl border border-violet-500/20 p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
          <div className="flex space-x-3 justify-center sm:justify-start">
            <button
              onClick={() => setExpandedSections(new Set(sections.map(s => s.id)))}
              className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-violet-500/20 border border-violet-500/30 hover:border-violet-400/50 rounded-xl transition-all duration-300 touch-manipulation"
            >
              Expand All
            </button>
            <button
              onClick={() => setExpandedSections(new Set())}
              className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-violet-500/20 border border-violet-500/30 hover:border-violet-400/50 rounded-xl transition-all duration-300 touch-manipulation"
            >
              Collapse All
            </button>
          </div>
          <div className="text-sm text-center sm:text-right">
            {completionPercentage === 100 ? (
              <span className="text-violet-300 font-semibold flex items-center justify-center sm:justify-end">
                <Check className="w-4 h-4 mr-1" />
                Resume Complete!
              </span>
            ) : (
              <span className="text-slate-300">Complete all sections for best results</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};