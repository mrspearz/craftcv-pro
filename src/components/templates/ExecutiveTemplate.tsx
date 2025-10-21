import React from 'react';
import { Mail, Phone, MapPin, Calendar, Award, Briefcase } from 'lucide-react';
import type { TemplateProps } from '../../types';

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data, config }) => {
  const { personalInfo, workExperience, education, skills } = data;
  const { colors, fonts } = config;
  
  // Debug: Force colors to be solid black for testing
  const debugColors = {
    ...colors,
    text: '#000000',
    primary: colors.primary,
    secondary: colors.secondary
  };

  return (
    <div 
      className="bg-white min-h-[297mm] w-[210mm] mx-auto shadow-xl print:shadow-none print:w-full print:h-full"
      style={{ fontFamily: fonts.body }}
    >
      {/* Executive Header with Letterhead Style */}
      <div className="px-8 pt-12 pb-8">
        {/* Corporate Header */}
        <div className="text-center border-b-2 pb-8 mb-8" style={{ borderColor: colors.primary }}>
          <h1 
            className="text-5xl font-bold mb-3 tracking-tight"
            style={{ 
              fontFamily: fonts.heading,
              color: colors.primary 
            }}
          >
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <h2 
            className="text-xl font-medium mb-6 tracking-wide"
            style={{ color: debugColors.text }}
          >
            {personalInfo.title}
          </h2>
          
          {/* Executive Contact Bar */}
          <div className="bg-white border border-gray-200 px-6 py-4 rounded-lg">
            <div className="grid grid-cols-2 gap-6 text-sm" style={{ color: debugColors.text }}>
              <div className="space-y-2">
                {personalInfo.email && (
                  <div className="flex items-center justify-center md:justify-start">
                    <Mail className="w-4 h-4 mr-3" style={{ color: colors.primary }} />
                    <span>{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center justify-center md:justify-start">
                    <Phone className="w-4 h-4 mr-3" style={{ color: colors.primary }} />
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                {personalInfo.location && (
                  <div className="flex items-center justify-center md:justify-end">
                    <MapPin className="w-4 h-4 mr-3" style={{ color: colors.primary }} />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        {personalInfo.summary && (
          <div className="mb-10">
            <h3 
              className="text-xl font-bold mb-4 flex items-center"
              style={{ 
                color: colors.primary,
                fontFamily: fonts.heading 
              }}
            >
              <Briefcase className="w-5 h-5 mr-3" />
              Executive Summary
            </h3>
            <div className="bg-white border border-gray-200 p-6 rounded-lg border-l-4" style={{ borderLeftColor: colors.primary }}>
              <p className="text-base leading-relaxed" style={{ color: debugColors.text }}>
                {personalInfo.summary}
              </p>
            </div>
          </div>
        )}

        {/* Professional Experience */}
        {workExperience.length > 0 && (
          <div className="mb-10">
            <h3 
              className="text-xl font-bold mb-6 flex items-center"
              style={{ 
                color: colors.primary,
                fontFamily: fonts.heading 
              }}
            >
              <Award className="w-5 h-5 mr-3" />
              Executive Experience
            </h3>
            
            <div className="space-y-8">
              {workExperience.map((job, index) => (
                <div key={job.id} className="relative">
                  {/* Executive Job Card */}
                  <div className="bg-white border-2 border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold mb-1" style={{ color: colors.text }}>
                          {job.jobTitle}
                        </h4>
                        <p className="text-lg font-semibold" style={{ color: colors.primary }}>
                          {job.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <div 
                          className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white"
                          style={{ backgroundColor: colors.primary }}
                        >
                          <Calendar className="w-4 h-4 inline mr-2" />
                          {job.startDate} — {job.current ? 'Present' : job.endDate}
                        </div>
                        {job.location && (
                          <div className="text-sm mt-1" style={{ color: colors.secondary }}>
                            {job.location}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {job.description && (
                      <p className="mb-4 leading-relaxed" style={{ color: colors.text }}>
                        {job.description}
                      </p>
                    )}
                    
                    {job.achievements && job.achievements.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-3" style={{ color: colors.text }}>
                          Key Achievements & Impact:
                        </h5>
                        <div className="grid grid-cols-1 gap-2">
                          {job.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-start">
                              <div 
                                className="w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0"
                                style={{ backgroundColor: colors.secondary }}
                              ></div>
                              <span className="leading-relaxed text-sm" style={{ color: colors.text }}>
                                {achievement}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Connection line between positions */}
                  {index < workExperience.length - 1 && (
                    <div className="flex justify-center my-4">
                      <div 
                        className="w-1 h-6"
                        style={{ backgroundColor: colors.secondary + '40' }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-10">
          {/* Education & Qualifications */}
          {education.length > 0 && (
            <div className="mb-8">
              <h3 
                className="text-lg font-bold mb-6 pb-2 border-b"
                style={{ 
                  color: colors.primary,
                  borderColor: colors.primary,
                  fontFamily: fonts.heading 
                }}
              >
                Education & Qualifications
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white border border-gray-200 p-4 rounded-lg">
                    <h4 className="font-bold text-base mb-1" style={{ color: debugColors.text }}>
                      {edu.degree}
                    </h4>
                    <p className="font-medium mb-2" style={{ color: debugColors.primary }}>
                      {edu.institution}
                    </p>
                    <div className="text-sm flex justify-between items-center" style={{ color: debugColors.secondary }}>
                      <span>{edu.startDate} — {edu.current ? 'Present' : edu.endDate}</span>
                      {edu.gpa && <span className="font-medium">GPA: {edu.gpa}</span>}
                    </div>
                    {edu.location && (
                      <div className="text-sm mt-1" style={{ color: debugColors.secondary }}>
                        {edu.location}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Competencies */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h3 
                className="text-lg font-bold mb-6 pb-2 border-b"
                style={{ 
                  color: colors.primary,
                  borderColor: colors.primary,
                  fontFamily: fonts.heading 
                }}
              >
                Core Competencies
              </h3>
              <div className="space-y-6">
                {Object.entries(
                  skills.reduce((acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = [];
                    acc[skill.category].push(skill);
                    return acc;
                  }, {} as Record<string, typeof skills>)
                ).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h4 
                      className="font-bold text-sm mb-3 uppercase tracking-wide"
                      style={{ color: colors.secondary }}
                    >
                      {category}
                    </h4>
                    <div className="space-y-2">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="bg-white border border-gray-200 p-3 rounded">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm" style={{ color: colors.text }}>
                              {skill.name}
                            </span>
                            <span 
                              className="text-xs px-3 py-1 rounded-full text-white font-medium"
                              style={{ backgroundColor: colors.primary }}
                            >
                              {skill.level}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Executive Branding */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: colors.primary }}>
          <div className="text-center">
            <p className="text-sm font-medium" style={{ color: colors.secondary }}>
              {personalInfo.firstName} {personalInfo.lastName} • {personalInfo.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};