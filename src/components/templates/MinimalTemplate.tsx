import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { TemplateProps } from '../../types';

export const MinimalTemplate: React.FC<TemplateProps> = ({ data, config }) => {
  const { personalInfo, workExperience, education, skills } = data;
  const { colors, fonts } = config;

  return (
    <div 
      className="bg-white min-h-[297mm] w-[210mm] mx-auto shadow-xl print:shadow-none print:w-full print:h-full"
      style={{ fontFamily: fonts.body }}
    >
      {/* Minimal Header */}
      <div className="px-12 pt-16 pb-12">
        <div className="text-center mb-12">
          <h1 
            className="text-6xl font-light mb-4 tracking-tight"
            style={{ 
              fontFamily: fonts.heading,
              color: colors.text 
            }}
          >
            {personalInfo.firstName}
          </h1>
          <h1 
            className="text-6xl font-bold mb-6 tracking-tight"
            style={{ 
              fontFamily: fonts.heading,
              color: colors.primary 
            }}
          >
            {personalInfo.lastName}
          </h1>
          <h2 
            className="text-lg font-normal tracking-wider uppercase mb-8"
            style={{ color: colors.secondary }}
          >
            {personalInfo.title}
          </h2>
          
          {/* Minimal Contact Info */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm" style={{ color: colors.text }}>
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
        
        {/* Thin Divider */}
        <div className="w-24 h-px mx-auto mb-12" style={{ backgroundColor: colors.primary }}></div>
        
        {/* Professional Summary */}
        {personalInfo.summary && (
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-lg leading-relaxed font-light" style={{ color: colors.text }}>
              {personalInfo.summary}
            </p>
          </div>
        )}
      </div>

      <div className="px-12 pb-12">
        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div className="mb-16">
            <h3 
              className="text-2xl font-light text-center mb-12 tracking-widest uppercase"
              style={{ 
                color: colors.primary,
                fontFamily: fonts.heading 
              }}
            >
              Experience
            </h3>
            <div className="space-y-12 max-w-4xl mx-auto">
              {workExperience.map((job) => (
                <div key={job.id} className="text-center">
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>
                      {job.jobTitle}
                    </h4>
                    <p className="text-lg font-light mb-2" style={{ color: colors.primary }}>
                      {job.company}
                    </p>
                    <div className="flex justify-center items-center text-sm font-light" style={{ color: colors.secondary }}>
                      <span>{job.startDate} — {job.current ? 'Present' : job.endDate}</span>
                      {job.location && (
                        <>
                          <span className="mx-3">•</span>
                          <span>{job.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {job.description && (
                    <p className="text-base leading-relaxed font-light max-w-2xl mx-auto mb-4" style={{ color: colors.text }}>
                      {job.description}
                    </p>
                  )}
                  
                  {job.achievements && job.achievements.length > 0 && (
                    <div className="max-w-2xl mx-auto">
                      <ul className="space-y-2 text-sm leading-relaxed font-light" style={{ color: colors.text }}>
                        {job.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start justify-center">
                            <span className="text-center">
                              — {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-20 max-w-4xl mx-auto">
          {/* Education */}
          {education.length > 0 && (
            <div>
              <h3 
                className="text-xl font-light text-center mb-8 tracking-widest uppercase"
                style={{ 
                  color: colors.primary,
                  fontFamily: fonts.heading 
                }}
              >
                Education
              </h3>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="text-center">
                    <h4 className="text-lg font-medium mb-1" style={{ color: colors.text }}>
                      {edu.degree}
                    </h4>
                    <p className="font-light mb-1" style={{ color: colors.primary }}>
                      {edu.institution}
                    </p>
                    <div className="text-sm font-light" style={{ color: colors.secondary }}>
                      <span>{edu.startDate} — {edu.current ? 'Present' : edu.endDate}</span>
                      {edu.gpa && (
                        <>
                          <br />
                          <span>GPA: {edu.gpa}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h3 
                className="text-xl font-light text-center mb-8 tracking-widest uppercase"
                style={{ 
                  color: colors.primary,
                  fontFamily: fonts.heading 
                }}
              >
                Skills
              </h3>
              <div className="space-y-6">
                {Object.entries(
                  skills.reduce((acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = [];
                    acc[skill.category].push(skill);
                    return acc;
                  }, {} as Record<string, typeof skills>)
                ).map(([category, categorySkills]) => (
                  <div key={category} className="text-center">
                    <h4 
                      className="font-medium text-sm mb-3 uppercase tracking-wide"
                      style={{ color: colors.secondary }}
                    >
                      {category}
                    </h4>
                    <div className="space-y-2">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="flex justify-between items-center">
                          <span className="text-sm font-light" style={{ color: colors.text }}>
                            {skill.name}
                          </span>
                          <div className="flex items-center ml-4">
                            {[...Array(4)].map((_, i) => (
                              <div
                                key={i}
                                className="w-2 h-2 mx-1 rounded-full"
                                style={{
                                  backgroundColor: i < (
                                    skill.level === 'Expert' ? 4 :
                                    skill.level === 'Advanced' ? 3 :
                                    skill.level === 'Intermediate' ? 2 : 1
                                  ) ? colors.primary : colors.secondary + '30'
                                }}
                              ></div>
                            ))}
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
    </div>
  );
};