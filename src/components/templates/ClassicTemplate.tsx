import React from 'react';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';
import type { TemplateProps } from '../../types';

export const ClassicTemplate: React.FC<TemplateProps> = ({ data, config }) => {
  const { personalInfo, workExperience, education, skills } = data;
  const { colors, fonts } = config;

  return (
    <div 
      className="bg-white min-h-[297mm] w-[210mm] mx-auto shadow-xl print:shadow-none print:w-full print:h-full"
      style={{ fontFamily: fonts.body }}
    >
      {/* Header Section - Traditional style with line dividers */}
      <div className="px-8 pt-10 pb-8 border-b-2" style={{ borderColor: colors.primary }}>
        <div className="text-center">
          <h1 
            className="text-5xl font-bold mb-3"
            style={{ 
              fontFamily: fonts.heading,
              color: colors.primary 
            }}
          >
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <h2 className="text-xl font-medium mb-6" style={{ color: colors.secondary }}>
            {personalInfo.title}
          </h2>
          
          {/* Contact Info - Centered horizontal layout */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm" style={{ color: colors.text }}>
            {personalInfo.email && (
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" style={{ color: colors.primary }} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" style={{ color: colors.primary }} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <div className="mb-8 text-center">
            <h3 
              className="text-xl font-bold mb-4 uppercase tracking-wider"
              style={{ 
                color: colors.primary,
                fontFamily: fonts.heading 
              }}
            >
              Executive Summary
            </h3>
            <div className="max-w-4xl mx-auto">
              <p className="leading-relaxed text-lg italic" style={{ color: colors.text }}>
                "{personalInfo.summary}"
              </p>
            </div>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div className="mb-8">
            <h3 
              className="text-xl font-bold mb-6 text-center uppercase tracking-wider pb-2 border-b"
              style={{ 
                color: colors.primary,
                borderColor: colors.primary,
                fontFamily: fonts.heading 
              }}
            >
              Professional Experience
            </h3>
            <div className="space-y-8">
              {workExperience.map((job, index) => (
                <div key={job.id} className="relative">
                  {/* Timeline dot for visual continuity */}
                  <div className="absolute left-0 top-0 flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full border-2 bg-white"
                      style={{ borderColor: colors.primary }}
                    ></div>
                  </div>
                  
                  <div className="ml-8">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900" style={{ color: colors.text }}>
                          {job.jobTitle}
                        </h4>
                        <p className="text-lg font-medium" style={{ color: colors.primary }}>
                          {job.company}
                        </p>
                      </div>
                      <div className="text-right text-sm" style={{ color: colors.secondary }}>
                        <div className="flex items-center justify-end mb-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span className="font-medium">{job.startDate} - {job.current ? 'Present' : job.endDate}</span>
                        </div>
                        {job.location && <div className="font-medium">{job.location}</div>}
                      </div>
                    </div>
                    {job.description && (
                      <p className="mb-3 leading-relaxed" style={{ color: colors.text }}>
                        {job.description}
                      </p>
                    )}
                    {job.achievements && job.achievements.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-2" style={{ color: colors.text }}>
                          Key Achievements:
                        </h5>
                        <ul className="space-y-1">
                          {job.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start">
                              <span 
                                className="inline-block w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                style={{ backgroundColor: colors.primary }}
                              ></span>
                              <span className="leading-relaxed" style={{ color: colors.text }}>
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Separator line between jobs */}
                    {index < workExperience.length - 1 && (
                      <div 
                        className="absolute left-1 top-12 w-px bg-gray-300 h-full"
                        style={{ backgroundColor: colors.secondary + '40' }}
                      ></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-12">
          {/* Education */}
          {education.length > 0 && (
            <div className="mb-8">
              <h3 
                className="text-xl font-bold mb-6 text-center uppercase tracking-wider pb-2 border-b"
                style={{ 
                  color: colors.primary,
                  borderColor: colors.primary,
                  fontFamily: fonts.heading 
                }}
              >
                Education
              </h3>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="text-center">
                    <h4 className="text-lg font-bold text-gray-900 mb-1" style={{ color: colors.text }}>
                      {edu.degree}
                    </h4>
                    <p className="text-base font-medium mb-2" style={{ color: colors.primary }}>
                      {edu.institution}
                    </p>
                    <div className="text-sm" style={{ color: colors.secondary }}>
                      <div className="flex items-center justify-center mb-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</span>
                      </div>
                      {edu.location && <div>{edu.location}</div>}
                      {edu.gpa && <div className="mt-1 font-medium">GPA: {edu.gpa}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h3 
                className="text-xl font-bold mb-6 text-center uppercase tracking-wider pb-2 border-b"
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
                      className="font-bold text-base mb-3 text-center uppercase tracking-wide"
                      style={{ color: colors.primary }}
                    >
                      {category}
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="text-center">
                          <div className="flex justify-between items-center px-3 py-2 rounded-lg bg-gray-50">
                            <span className="font-medium" style={{ color: colors.text }}>
                              {skill.name}
                            </span>
                            <span 
                              className="text-xs font-bold px-2 py-1 rounded-full text-white"
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
      </div>

      {/* Bottom border for classic finish */}
      <div className="px-8 pb-8">
        <div className="border-b-2" style={{ borderColor: colors.primary }}></div>
      </div>
    </div>
  );
};