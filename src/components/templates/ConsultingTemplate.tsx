import React from 'react';
import type { TemplateProps } from '../../types';

export const ConsultingTemplate: React.FC<TemplateProps> = ({ data, config }) => {
  const { personalInfo, workExperience, education, skills, certifications, projects } = data;
  const { colors, fonts } = config;

  return (
    <div 
      className="max-w-4xl mx-auto bg-white shadow-lg min-h-[297mm] w-[210mm] print:shadow-none print:w-full print:h-full"
      style={{ fontFamily: fonts.body }}
    >
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: fonts.heading, color: colors.text }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <p className="text-lg font-medium italic mb-2" style={{ color: colors.primary }}>
              {personalInfo.title}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-2 text-sm" style={{ color: colors.secondary }}>
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.email && personalInfo.phone && <span className="text-gray-400">|</span>}
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.location && (personalInfo.email || personalInfo.phone) && <span className="text-gray-400">|</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </div>

        {/* Professional Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <p className="leading-relaxed text-center italic border-l-4 pl-4" style={{ 
              color: colors.text, 
              borderColor: colors.secondary 
            }}>
              "{personalInfo.summary}"
            </p>
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 border-b-2 pb-1" style={{ 
              color: colors.text, 
              borderColor: colors.text,
              fontFamily: fonts.heading 
            }}>
              PROFESSIONAL EXPERIENCE
            </h2>
            {workExperience.map((exp) => (
              <div key={exp.id} className="mb-6 last:mb-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-lg" style={{ color: colors.text }}>{exp.company}</h3>
                  <span className="font-medium" style={{ color: colors.secondary }}>{exp.location}</span>
                </div>
                <div className="flex justify-between items-baseline mb-3">
                  <p className="font-medium italic" style={{ color: colors.primary }}>{exp.jobTitle}</p>
                  <span className="text-sm" style={{ color: colors.secondary }}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <div className="space-y-2" style={{ color: colors.text }}>
                    {exp.description.split('\n').map((item, i) => (
                      <div key={i} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: colors.secondary }}></span>
                        <span className="leading-relaxed text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 border-b-2 pb-1" style={{ 
              color: colors.text, 
              borderColor: colors.text,
              fontFamily: fonts.heading 
            }}>
              EDUCATION
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold" style={{ color: colors.text }}>{edu.institution}</h3>
                    <p style={{ color: colors.primary }}>{edu.degree}</p>
                    {edu.gpa && <p className="text-sm" style={{ color: colors.secondary }}>GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-right" style={{ color: colors.secondary }}>
                    <p>{edu.location}</p>
                    <p className="text-sm">{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 border-b-2 pb-1" style={{ 
                color: colors.text, 
                borderColor: colors.text,
                fontFamily: fonts.heading 
              }}>
                SKILLS
              </h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center">
                    <div className="w-3 h-3 border-2 mr-3" style={{ borderColor: colors.secondary }}></div>
                    <span style={{ color: colors.text }}>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 border-b-2 pb-1" style={{ 
                color: colors.text, 
                borderColor: colors.text,
                fontFamily: fonts.heading 
              }}>
                CERTIFICATIONS
              </h2>
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-3">
                  <h3 className="font-bold" style={{ color: colors.text }}>{cert.name}</h3>
                  <p className="text-sm" style={{ color: colors.primary }}>{cert.issuer} • {cert.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 border-b-2 pb-1" style={{ 
              color: colors.text, 
              borderColor: colors.text,
              fontFamily: fonts.heading 
            }}>
              KEY PROJECTS
            </h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-bold" style={{ color: colors.text }}>{project.name}</h3>
                  <span className="text-sm" style={{ color: colors.secondary }}>
                    {project.startDate} - {project.current ? 'Present' : project.endDate}
                  </span>
                </div>
                {project.description && (
                  <p className="leading-relaxed mb-2" style={{ color: colors.text }}>{project.description}</p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <p className="text-sm" style={{ color: colors.secondary }}>
                    <span className="font-medium">Key Technologies:</span> {project.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};