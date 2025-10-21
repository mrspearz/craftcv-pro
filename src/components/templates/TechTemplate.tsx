import React from 'react';
import type { TemplateProps } from '../../types';

export const TechTemplate: React.FC<TemplateProps> = ({ data, config }) => {
  const { personalInfo, workExperience, education, skills, certifications, projects } = data;
  const { colors, fonts } = config;

  return (
    <div 
      className="max-w-4xl mx-auto bg-white shadow-lg min-h-[297mm] w-[210mm] print:shadow-none print:w-full print:h-full"
      style={{ fontFamily: fonts.body }}
    >
      <div className="p-8">
        {/* Header */}
        <div className="border-b-2 pb-6 mb-6" style={{ borderColor: colors.primary }}>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: fonts.heading, color: colors.text }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <p className="text-xl font-medium" style={{ color: colors.primary }}>
              {personalInfo.title}
            </p>
          )}
          <div className="flex flex-wrap gap-4 mt-3 text-sm font-medium" style={{ color: colors.primary }}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </div>

        {/* Professional Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3" style={{ color: colors.primary, fontFamily: fonts.heading }}>
              Professional Summary
            </h2>
            <p className="leading-relaxed" style={{ color: colors.text }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* Technical Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3" style={{ color: colors.primary, fontFamily: fonts.heading }}>
              Technical Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {skills.map((skill) => (
                <div key={skill.id} className="px-3 py-1 rounded text-sm font-medium" style={{ 
                  backgroundColor: colors.primary + '10', 
                  color: colors.primary 
                }}>
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3" style={{ color: colors.primary, fontFamily: fonts.heading }}>
              Professional Experience
            </h2>
            {workExperience.map((exp) => (
              <div key={exp.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold" style={{ color: colors.text }}>{exp.jobTitle}</h3>
                    <p className="font-medium" style={{ color: colors.primary }}>{exp.company}</p>
                  </div>
                  <div className="text-right text-sm" style={{ color: colors.secondary }}>
                    <p>{exp.location}</p>
                    <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                </div>
                {exp.description && (
                  <div className="space-y-1" style={{ color: colors.text }}>
                    {exp.description.split('\n').map((item, i) => (
                      <p key={i} className="text-sm leading-relaxed">• {item}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3" style={{ color: colors.primary, fontFamily: fonts.heading }}>
              Key Projects
            </h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold" style={{ color: colors.text }}>{project.name}</h3>
                  <span className="text-sm" style={{ color: colors.secondary }}>
                    {project.startDate} - {project.current ? 'Present' : project.endDate}
                  </span>
                </div>
                {project.description && (
                  <p className="mb-2 leading-relaxed" style={{ color: colors.text }}>{project.description}</p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-1 rounded text-xs" style={{ 
                        backgroundColor: colors.secondary + '20', 
                        color: colors.secondary 
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3" style={{ color: colors.primary, fontFamily: fonts.heading }}>
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold" style={{ color: colors.text }}>{edu.degree}</h3>
                    <p style={{ color: colors.primary }}>{edu.institution}</p>
                    {edu.gpa && <p className="text-sm" style={{ color: colors.secondary }}>GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-right text-sm" style={{ color: colors.secondary }}>
                    <p>{edu.location}</p>
                    <p>{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3" style={{ color: colors.primary, fontFamily: fonts.heading }}>
              Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="border-l-4 pl-3" style={{ borderColor: colors.primary }}>
                  <h3 className="font-bold" style={{ color: colors.text }}>{cert.name}</h3>
                  <p className="text-sm" style={{ color: colors.primary }}>{cert.issuer}</p>
                  <p className="text-sm" style={{ color: colors.secondary }}>{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};